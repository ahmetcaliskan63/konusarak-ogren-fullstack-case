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

        public MessageService(ApplicationDbContext db, ISentimentService sentiment)
        {
            _db = db;
            _sentiment = sentiment;
        }

        public async Task<MessageDto> CreateMessageAsync(CreateMessageDto dto)
        {
            var user = await _db.Users.FindAsync(dto.UserId);
            if (user == null) throw new ArgumentException("Kullanıcı bulunamadı");

            var msg = new Message { UserId = dto.UserId, Content = dto.Content };
            _db.Messages.Add(msg);
            await _db.SaveChangesAsync();

            var s = await _sentiment.AnalyzeSentimentAsync(dto.Content);
            msg.Sentiment = s.Sentiment;
            msg.SentimentScore = s.SentimentScore;
            await _db.SaveChangesAsync();

            return new MessageDto
            {
                Id = msg.Id,
                UserId = msg.UserId,
                Username = user.Username,
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
                    Username = m.User.Username,
                    Content = m.Content,
                    Sentiment = m.Sentiment,
                    SentimentScore = m.SentimentScore,
                    CreatedAt = m.CreatedAt
                })
                .ToListAsync();
        }
    }
}
