using VibeChat.Api.Features.Messages.Dtos;

namespace VibeChat.Api.Services.Abstractions
{
    public interface ISentimentService
    {
        Task<SentimentResponseDto> AnalyzeSentimentAsync(string text);
    }
}
