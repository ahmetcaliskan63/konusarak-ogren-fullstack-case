using Microsoft.EntityFrameworkCore;
using VibeChat.Api.Features.Messages.Domain;
using VibeChat.Api.Features.Users.Domain;

namespace VibeChat.Api.Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
           : base(options) { }

        public DbSet<User> Users => Set<User>();
        public DbSet<Message> Messages => Set<Message>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new UserConfiguration());
            modelBuilder.ApplyConfiguration(new MessageConfiguration());
            base.OnModelCreating(modelBuilder);
        }
    }
}
