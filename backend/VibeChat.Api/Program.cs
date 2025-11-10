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
                try
                {
                    var host = new Uri(origin).Host;
                    return host.EndsWith("vercel.app") || host.Equals("localhost");
                }
                catch { return false; }
            })
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

builder.Services.AddHttpClient<ISentimentService, SentimentService>(c =>
{
    c.Timeout = TimeSpan.FromSeconds(30);
});

builder.Services.AddScoped<IMessageService, MessageService>();
builder.Services.AddScoped<IUserService, UserService>();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

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
