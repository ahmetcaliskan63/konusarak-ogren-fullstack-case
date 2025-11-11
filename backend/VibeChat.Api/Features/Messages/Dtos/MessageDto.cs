namespace VibeChat.Api.Features.Messages.Dtos
{
    public class MessageDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public string? Sentiment { get; set; }
        public double? SentimentScore { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
