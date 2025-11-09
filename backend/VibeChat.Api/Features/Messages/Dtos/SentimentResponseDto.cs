namespace VibeChat.Api.Features.Messages.Dtos
{
    public class SentimentResponseDto
    {
        public string Sentiment { get; set; } = "nötr";   
        public double SentimentScore { get; set; }   
        public SentimentScoresDto? Scores { get; set; } 
    }

}
