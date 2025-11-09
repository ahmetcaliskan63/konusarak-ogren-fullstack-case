using System.Text.RegularExpressions;
using VibeChat.Api.Features.Messages.Dtos;

namespace VibeChat.Api.Services.Implementations
{
    public class SentimentService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _config;

        public SentimentService(HttpClient httpClient, IConfiguration config)
        {
            _httpClient = httpClient;
            _config = config;
        }

        public async Task<SentimentResponseDto> AnalyzeSentimentAsync(string text)
        {
            var url = _config["AIService:BaseUrl"];

            var response = await _httpClient.PostAsJsonAsync(url, new { data = new[] { text } });

            if (!response.IsSuccessStatusCode)
                return new SentimentResponseDto { Sentiment = "nötr", SentimentScore = 0 };

            var result = await response.Content.ReadFromJsonAsync<GradioResponse>();

            if (result?.Data == null || result.Data.Length == 0)
                return new SentimentResponseDto { Sentiment = "nötr", SentimentScore = 0 };

            return Parse(result.Data[0]);
        }

        private SentimentResponseDto Parse(string raw)
        {
            string sentiment =
                raw.Contains("pozitif", StringComparison.OrdinalIgnoreCase) ? "pozitif" :
                raw.Contains("negatif", StringComparison.OrdinalIgnoreCase) ? "negatif" :
                "nötr";

            double score = 0;

            var m = Regex.Match(raw, @"(\d+\.?\d*)%");
            if (m.Success && double.TryParse(m.Groups[1].Value, out var p))
                score = p / 100.0;

            return new SentimentResponseDto
            {
                Sentiment = sentiment,
                SentimentScore = score,
                Scores = null
            };
        }

        private class GradioResponse
        {
            public string[]? Data { get; set; }
        }
    }
}
