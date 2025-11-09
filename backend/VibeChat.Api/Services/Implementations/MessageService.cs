using Microsoft.EntityFrameworkCore;
using VibeChat.Api.Features.Messages.Domain;
using VibeChat.Api.Features.Messages.Dtos;
using VibeChat.Api.Infrastructure.Data;
using VibeChat.Api.Services.Abstractions;

namespace VibeChat.Api.Services.Implementations
{
    public class MessageService
    {
        private readonly ApplicationDbContext _context;
        private readonly ISentimentService _sentimentService;

        public MessageService(ApplicationDbContext context, ISentimentService sentimentService)
        {
            _context = context;
            _sentimentService = sentimentService;
        }

        public async Task<MessageDto> CreateMessageAsync(CreateMessageDto dto)
        {
            var user = await _context.Users.FindAsync(dto.UserId);

            if (user == null)
                throw new ArgumentException("Kullanıcı bulunamadı");

            var message = new Message
            {
                UserId = dto.UserId,
                Content = dto.Content
            };

            _context.Messages.Add(message);
            await _context.SaveChangesAsync();

            var sentiment = await _sentimentService.AnalyzeSentimentAsync(dto.Content);

            message.Sentiment = sentiment.Sentiment;
            message.SentimentScore = sentiment.SentimentScore;

            await _context.SaveChangesAsync();

            return new MessageDto
            {
                Id = message.Id,
                UserId = message.UserId,
                Username = user.Username,
                Content = message.Content,
                Sentiment = message.Sentiment,
                SentimentScore = message.SentimentScore,
                CreatedAt = message.CreatedAt
            };
        }

        public async Task<List<MessageDto>> GetMessagesAsync()
        {
            return await _context.Messages
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
