using Microsoft.EntityFrameworkCore;
using VibeChat.Api.Features.Messages.Domain;
using VibeChat.Api.Features.Messages.Dtos;
using VibeChat.Api.Infrastructure.Data;
using VibeChat.Api.Services.Abstractions;

namespace VibeChat.Api.Services.Implementations
{
    public class MessageService : IMessageService
    {
        
        private readonly ApplicationDbContext _db;
        private readonly ISentimentService _sentiment;
        private readonly ILogger<MessageService> _logger;

        public MessageService(ApplicationDbContext db, ISentimentService sentiment, ILogger<MessageService> logger)
        {
            _db = db;
            _sentiment = sentiment;
            _logger = logger;
        }

        public async Task<MessageDto> CreateMessageAsync(CreateMessageDto dto)
        {
            // Verify user exists with optimized query (only fetch username)
            var username = await _db.Users
                .Where(u => u.Id == dto.UserId)
                .Select(u => u.Username)
                .FirstOrDefaultAsync();

            if (username == null)
                throw new InvalidOperationException($"Kullanıcı bulunamadı: {dto.UserId}");

            // Create message entity
            var msg = new Message 
            { 
                UserId = dto.UserId, 
                Content = dto.Content,
                CreatedAt = DateTime.UtcNow
            };

            try
            {
                // Analyze sentiment before saving
                var sentimentResult = await _sentiment.AnalyzeSentimentAsync(dto.Content);
                msg.Sentiment = sentimentResult.Sentiment;
                msg.SentimentScore = sentimentResult.SentimentScore;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Sentiment analysis failed for message. Saving with default values.");
                // Continue with default null values if sentiment analysis fails
                msg.Sentiment = "nötr";
                msg.SentimentScore = 0;
            }

            // Single database save
            _db.Messages.Add(msg);
            await _db.SaveChangesAsync();

            return new MessageDto
            {
                Id = msg.Id,
                UserId = msg.UserId,
                Username = username,
                Content = msg.Content,
                Sentiment = msg.Sentiment,
                SentimentScore = msg.SentimentScore,
                CreatedAt = msg.CreatedAt
            };
        }

        public async Task<List<MessageDto>> GetMessagesAsync()
        {
            return await _db.Messages
                .Include(m => m.User)
                .OrderBy(m => m.CreatedAt)
                .Select(m => new MessageDto
                {
                    Id = m.Id,
                    UserId = m.UserId,
                    Username = m.User != null ? m.User.Username : "Unknown",
                    Content = m.Content,
                    Sentiment = m.Sentiment,
                    SentimentScore = m.SentimentScore,
                    CreatedAt = m.CreatedAt
                })
                .ToListAsync();
        }
    }
}
