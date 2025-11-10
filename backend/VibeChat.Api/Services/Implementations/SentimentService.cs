using System.Linq;
using System.Text.RegularExpressions;
using VibeChat.Api.Features.Messages.Dtos;

using VibeChat.Api.Services.Abstractions;

namespace VibeChat.Api.Services.Implementations
{
    public class SentimentService : ISentimentService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _config;
        private readonly ILogger<SentimentService> _logger;

        public SentimentService(HttpClient httpClient, IConfiguration config, ILogger<SentimentService> logger)
        {
            _httpClient = httpClient;
            _config = config;
            _logger = logger;
        }

        public async Task<SentimentResponseDto> AnalyzeSentimentAsync(string text)
        {
            try
            {
                var baseUrl = _config["AIService:BaseUrl"] ?? "https://ahmetcan3281-sentiment-analyzer.hf.space";
                var possibleEndpoints = new[]
                {
                    $"{baseUrl}/gradio_api/run/predict",
                    $"{baseUrl}/run/predict",
                    $"{baseUrl}/gradio_api/call/predict",
                    $"{baseUrl}/call/predict",
                };
                
                HttpResponseMessage? res = null;
                string? apiUrl = null;
                
                foreach (var endpoint in possibleEndpoints)
                {
                    try
                    {
                        apiUrl = endpoint;
                        var body = new { data = new[] { text } };
                        res = await _httpClient.PostAsJsonAsync(apiUrl, body);
                        
                        if (res.IsSuccessStatusCode)
                        {
                            _logger.LogInformation("Connected to AI Service: {Url}", apiUrl);
                            break;
                        }
                        
                        res.Dispose();
                        res = null;
                    }
                    catch
                    {
                        res?.Dispose();
                        res = null;
                    }
                }
                
                if (res == null || !res.IsSuccessStatusCode)
                {
                    _logger.LogError("Failed to connect to AI Service");
                    return new SentimentResponseDto { Sentiment = "nötr", SentimentScore = 0.0 };
                }

                var responseContent = await res.Content.ReadAsStringAsync();
                var jsonOptions = new System.Text.Json.JsonSerializerOptions { PropertyNameCaseInsensitive = true };

                var eventCheck = System.Text.Json.JsonSerializer.Deserialize<GradioEventResponse>(responseContent, jsonOptions);
                if (eventCheck?.EventId != null)
                {
                    var pollUrl = $"{apiUrl}/{eventCheck.EventId}";
                    var pollResult = await PollGradioEventAsync(pollUrl);
                    
                    if (pollResult != null)
                        return pollResult;
                        
                    _logger.LogWarning("Polling failed");
                    return new SentimentResponseDto { Sentiment = "nötr", SentimentScore = 0.0 };
                }

                try
                {
                    var directResult = System.Text.Json.JsonSerializer.Deserialize<SentimentResponseDto>(responseContent, jsonOptions);
                    if (directResult != null && !string.IsNullOrEmpty(directResult.Sentiment))
                        return directResult;
                }
                catch { }
                
                var gradio = System.Text.Json.JsonSerializer.Deserialize<GradioResponse>(responseContent, jsonOptions);
                if (gradio?.Data is { Length: > 0 })
                {
                    var content = gradio.Data[0];
                    
                    try
                    {
                        var jsonResult = System.Text.Json.JsonSerializer.Deserialize<SentimentResponseDto>(content, jsonOptions);
                        if (jsonResult != null && !string.IsNullOrEmpty(jsonResult.Sentiment))
                            return jsonResult;
                    }
                    catch
                    {
                        return Parse(content);
                    }
                }

                _logger.LogWarning("Unable to parse AI response");
                return new SentimentResponseDto { Sentiment = "nötr", SentimentScore = 0.0 };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error analyzing sentiment");
                return new SentimentResponseDto { Sentiment = "nötr", SentimentScore = 0.0 };
            }
        }

        private SentimentResponseDto Parse(string markdown)
        {
            if (string.IsNullOrWhiteSpace(markdown))
                return new SentimentResponseDto { Sentiment = "nötr", SentimentScore = 0.0 };

            var sentiment = "nötr";
            var score = 0.0;
            var upper = markdown.ToUpperInvariant();
            
            var positiveKeywords = new[] { "POZITIF", "POZİTİF", "POSITIVE" };
            var negativeKeywords = new[] { "NEGATIF", "NEGATİF", "NEGATIVE" };
            var neutralKeywords = new[] { "NOTR", "NÖTR", "NEUTRAL" };
            
            if (positiveKeywords.Any(k => upper.Contains(k)))
                sentiment = "pozitif";
            else if (negativeKeywords.Any(k => upper.Contains(k)))
                sentiment = "negatif";
            else if (neutralKeywords.Any(k => upper.Contains(k)))
                sentiment = "nötr";

            var scorePatterns = new[]
            {
                @"GÜVEN\s+SKORU[:\s]+(\d+\.?\d*)\s*%",
                @"(\d+\.?\d*)\s*%",
                @"0\.\d+",
            };

            foreach (var pattern in scorePatterns)
            {
                var match = Regex.Match(markdown, pattern, RegexOptions.IgnoreCase);
                if (match.Success)
                {
                    var valueStr = match.Groups.Count > 1 ? match.Groups[1].Value : match.Value;
                    if (double.TryParse(valueStr, System.Globalization.NumberStyles.Any,
                        System.Globalization.CultureInfo.InvariantCulture, out var parsedValue))
                    {
                        score = pattern.Contains("%") || parsedValue > 1.0 ? parsedValue / 100.0 : parsedValue;
                        break;
                    }
                }
            }

            if (sentiment != "nötr" && score == 0.0)
                score = 0.5;

            return new SentimentResponseDto { Sentiment = sentiment, SentimentScore = score };
        }

        private async Task<SentimentResponseDto?> PollGradioEventAsync(string pollUrl)
        {
            try
            {
                var response = await _httpClient.GetAsync(pollUrl, HttpCompletionOption.ResponseHeadersRead);
                if (!response.IsSuccessStatusCode)
                    return null;

                using var stream = await response.Content.ReadAsStreamAsync();
                using var reader = new StreamReader(stream);
                
                string? line;
                int eventCount = 0;
                SentimentResponseDto? result = null;
                var jsonOptions = new System.Text.Json.JsonSerializerOptions { PropertyNameCaseInsensitive = true };
                
                while ((line = await reader.ReadLineAsync()) != null && eventCount < 50)
                {
                    eventCount++;
                    
                    if (line.StartsWith("data: "))
                    {
                        var jsonData = line.Substring(6);
                        
                        try
                        {
                            if (jsonData.TrimStart().StartsWith("["))
                            {
                                var directArray = System.Text.Json.JsonSerializer.Deserialize<SentimentResponseDto[]>(jsonData, jsonOptions);
                                if (directArray is { Length: > 0 } && !string.IsNullOrEmpty(directArray[0].Sentiment))
                                    result = directArray[0];
                            }
                            else
                            {
                                var eventData = System.Text.Json.JsonSerializer.Deserialize<GradioResponse>(jsonData, jsonOptions);
                                if (eventData?.Data is { Length: > 0 })
                                {
                                    var resultJson = eventData.Data[0];
                                    try
                                    {
                                        var sentimentResult = System.Text.Json.JsonSerializer.Deserialize<SentimentResponseDto>(resultJson, jsonOptions);
                                        if (sentimentResult != null && !string.IsNullOrEmpty(sentimentResult.Sentiment))
                                            result = sentimentResult;
                                    }
                                    catch
                                    {
                                        result = Parse(resultJson);
                                    }
                                }
                            }
                        }
                        catch { }
                    }
                    
                    if (line.StartsWith("event: complete") && result != null)
                        break;
                }
                
                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during event polling");
                return null;
            }
        }

        private sealed class GradioResponse { public string[]? Data { get; set; } }
        private sealed class GradioEventResponse 
        { 
            [System.Text.Json.Serialization.JsonPropertyName("event_id")]
            public string? EventId { get; set; } 
        }
    }
}
