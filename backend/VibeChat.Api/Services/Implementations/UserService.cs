using Microsoft.EntityFrameworkCore;
using VibeChat.Api.Features.Users.Domain;
using VibeChat.Api.Features.Users.Dtos;
using VibeChat.Api.Infrastructure.Data;

namespace VibeChat.Api.Services.Implementations
{
    public class UserService
    {
        private readonly ApplicationDbContext _context;

        public UserService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<UserDto> CreateUserAsync(CreateUserDto dto)
        {
            var username = dto.Username.Trim();

            if (await _context.Users.AnyAsync(u => u.Username == username))
                throw new InvalidOperationException("Bu kullanıcı adı zaten kullanılıyor");

            var user = new User { Username = username };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new UserDto
            {
                Id = user.Id,
                Username = user.Username,
                CreatedAt = user.CreatedAt
            };
        }

        public async Task<List<UserDto>> GetUsersAsync()
        {
            return await _context.Users
                .Select(u => new UserDto
                {
                    Id = u.Id,
                    Username = u.Username,
                    CreatedAt = u.CreatedAt
                })
                .ToListAsync();
        }

        public async Task<UserDto?> GetUserByIdAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
                return null;

            return new UserDto
            {
                Id = user.Id,
                Username = user.Username,
                CreatedAt = user.CreatedAt
            };
        }
    }
}
