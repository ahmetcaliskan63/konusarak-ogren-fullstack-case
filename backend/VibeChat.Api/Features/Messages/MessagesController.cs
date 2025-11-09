using Microsoft.AspNetCore.Mvc;
using VibeChat.Api.Features.Messages.Dtos;
using VibeChat.Api.Services.Abstractions;

namespace VibeChat.Api.Features.Messages
{
    [ApiController]
    [Route("api/[controller]")]
    public class MessagesController : ControllerBase
    {
        private readonly IMessageService _messageService;
        private readonly ILogger<MessagesController> _logger;

        public MessagesController(IMessageService messageService, ILogger<MessagesController> logger)
        {
            _messageService = messageService;
            _logger = logger;
        }

        [HttpPost]
        public async Task<ActionResult<MessageDto>> CreateMessage([FromBody] CreateMessageDto dto)
        {
            try
            {
                var msg = await _messageService.CreateMessageAsync(dto);
                return Created(nameof(GetMessages), msg);
            }
            catch (System.ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet]
        public async Task<ActionResult<List<MessageDto>>> GetMessages()
            => Ok(await _messageService.GetMessagesAsync());
    }
}
