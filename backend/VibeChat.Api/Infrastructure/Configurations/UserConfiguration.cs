using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VibeChat.Api.Features.Users.Domain;

namespace VibeChat.Api.Infrastructure.Configurations
{
    public class UserConfiguration :IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> b)
        {
            b.ToTable("Users");

            b.HasKey(x => x.Id);

            b.Property(x => x.Username)
                .IsRequired()
                .HasMaxLength(50);

            b.HasIndex(x => x.Username).IsUnique();

            b.Property(x => x.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP");
        }
    }
}
