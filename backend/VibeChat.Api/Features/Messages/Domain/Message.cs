using VibeChat.Api.Features.Users.Domain;

namespace VibeChat.Api.Features.Messages.Domain
{
    public class Message
    {
        public int Id { get; set; } 
        public int UserId { get; set; }     
        public string Content { get; set; } = string.Empty;     

        
        public string? Sentiment { get; set; }  
        public double? SentimentScore { get; set; }     
        public DateTime CreatedAt { get; set; }     

        public User User { get; set; } = null!;
    }

}

