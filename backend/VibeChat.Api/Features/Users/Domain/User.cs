namespace VibeChat.Api.Features.Users.Domain
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }

        public ICollection<VibeChat.Api.Features.Messages.Domain.Message> Messages { get; set; }
            = new List<VibeChat.Api.Features.Messages.Domain.Message>();
    }
}
