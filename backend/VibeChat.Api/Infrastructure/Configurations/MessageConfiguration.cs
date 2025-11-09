using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VibeChat.Api.Features.Messages.Domain;

namespace VibeChat.Api.Infrastructure.Configurations
{
    public class MessageConfiguration : IEntityTypeConfiguration<Message>
    {
        public void Configure(EntityTypeBuilder<Message> b)
        {
            b.ToTable("Messages");

            b.HasKey(x => x.Id);

            b.Property(x => x.Content)
                .IsRequired()
                .HasMaxLength(1000);

            b.Property(x => x.Sentiment).HasMaxLength(16);
            b.Property(x => x.SentimentScore);

            b.Property(x => x.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            b.HasOne(x => x.User)
                .WithMany(u => u.Messages)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
