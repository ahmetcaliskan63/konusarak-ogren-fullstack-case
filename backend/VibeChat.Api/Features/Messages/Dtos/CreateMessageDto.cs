using System.ComponentModel.DataAnnotations;

namespace VibeChat.Api.Features.Messages.Dtos
{
    public class CreateMessageDto
    {
        [Required(ErrorMessage = "UserId zorunludur.")]
        public int UserId { get; set; }

        [Required(ErrorMessage = "Mesaj içeriği zorunludur.")]
        [MaxLength(500, ErrorMessage = "Mesaj en fazla 500 karakter olabilir.")]
        public string Content { get; set; } = string.Empty;
    }
}
