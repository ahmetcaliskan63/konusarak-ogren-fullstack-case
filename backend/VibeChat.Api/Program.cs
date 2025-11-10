using Microsoft.EntityFrameworkCore;
using VibeChat.Api.Infrastructure.Data;
using VibeChat.Api.Services.Abstractions;
using VibeChat.Api.Services.Implementations;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? "Data Source=vibechat.db";
builder.Services.AddDbContext<ApplicationDbContext>(opts => opts.UseSqlite(connectionString));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy
            .SetIsOriginAllowed(origin =>
            {
                if (string.IsNullOrWhiteSpace(origin)) return false;
                
                if (!Uri.TryCreate(origin, UriKind.Absolute, out var uri))
                    return false;
                
                var host = uri.Host;
                return host.EndsWith("vercel.app") || host.Equals("localhost");
            })
            .WithMethods("GET", "POST")
            .WithHeaders("Content-Type", "Authorization")
            .AllowCredentials();
    });
});

builder.Services.AddHttpClient<ISentimentService, SentimentService>(c =>
{
    c.Timeout = TimeSpan.FromSeconds(10);
});

builder.Services.AddScoped<IMessageService, MessageService>();
builder.Services.AddScoped<IUserService, UserService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");
app.UseHttpsRedirection();
app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    db.Database.EnsureCreated();
}

var port = Environment.GetEnvironmentVariable("PORT");
if (!string.IsNullOrEmpty(port))
{
    app.Urls.Add($"http://0.0.0.0:{port}");
}

app.Run();
