using VibeChat.Api.Features.Messages.Dtos;

namespace VibeChat.Api.Services.Abstractions
{
    public interface IMessageService
    {
        Task<MessageDto> CreateMessageAsync(CreateMessageDto dto);
        Task<List<MessageDto>> GetMessagesAsync();
    }
}
