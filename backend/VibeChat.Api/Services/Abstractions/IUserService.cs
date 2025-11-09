using VibeChat.Api.Features.Users.Dtos;

namespace VibeChat.Api.Services.Abstractions
{
    public interface IUserService
    {
        Task<UserDto> CreateUserAsync(CreateUserDto dto);
        Task<List<UserDto>> GetUsersAsync();
        Task<UserDto?> GetUserByIdAsync(int id);
    }
}
