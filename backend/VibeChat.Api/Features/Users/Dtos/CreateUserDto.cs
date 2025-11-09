using System.ComponentModel.DataAnnotations;

namespace VibeChat.Api.Features.Users.Dtos
{
    public class CreateUserDto
    {
        [Required(ErrorMessage = "Kullanıcı adı zorunludur.")]
        [StringLength(50, MinimumLength = 3,
            ErrorMessage = "Kullanıcı adı 3-50 karakter arasında olmalıdır.")]
        [RegularExpression(@"^[a-zA-Z0-9_.-]+$",
            ErrorMessage = "Kullanıcı adı yalnızca harf, rakam, nokta, tire ve alt çizgi içerebilir.")]
        public string Username { get; set; } = string.Empty;
    }
}
