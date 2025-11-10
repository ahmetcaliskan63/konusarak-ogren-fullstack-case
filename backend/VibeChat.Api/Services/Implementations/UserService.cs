using Microsoft.EntityFrameworkCore;
using VibeChat.Api.Features.Users.Domain;
using VibeChat.Api.Features.Users.Dtos;
using VibeChat.Api.Infrastructure.Data;
using VibeChat.Api.Services.Abstractions;

namespace VibeChat.Api.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _db;
        private readonly ILogger<UserService> _logger;

        public UserService(ApplicationDbContext db, ILogger<UserService> logger)
        {
            _db = db;
            _logger = logger;
        }

        public async Task<UserDto> CreateUserAsync(CreateUserDto dto)
        {
            var name = dto.Username.Trim();
            if (await _db.Users.AnyAsync(u => u.Username == name))
                throw new InvalidOperationException("Bu kullanıcı adı zaten kullanılıyor");

            var user = new User { Username = name };
            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            return new UserDto { Id = user.Id, Username = user.Username, CreatedAt = user.CreatedAt };
        }

        public async Task<List<UserDto>> GetUsersAsync()
        {
            return await _db.Users
                .Select(u => new UserDto { Id = u.Id, Username = u.Username, CreatedAt = u.CreatedAt })
                .ToListAsync();
        }

        public async Task<UserDto?> GetUserByIdAsync(int id)
        {
            var u = await _db.Users.FindAsync(id);
            return u == null ? null : new UserDto { Id = u.Id, Username = u.Username, CreatedAt = u.CreatedAt };
        }
    }
}
