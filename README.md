# VibeChat - AI-Powered Sentiment Chat

> **FullStack + AI Stajyer Projesi**  
> Kullanıcıların mesajlaşarak sohbet edebildiği, yazışmaların AI tarafından gerçek zamanlı duygu analizi yapılarak gösterildiği modern web + mobil uygulama.

---

## 🌐 Canlı Demo Linkleri

- **🌍 Web Uygulaması**: [https://vibechat-web.vercel.app](https://vibechat-web.vercel.app)
- **🚀 Backend API**: [https://vibechat-api.onrender.com](https://vibechat-api.onrender.com)
- **📖 API Dokümantasyonu**: [https://vibechat-api.onrender.com/swagger](https://vibechat-api.onrender.com/swagger)
- **🤖 AI Servisi**: [https://ahmetcan3281-sentiment-analyzer.hf.space](https://ahmetcan3281-sentiment-analyzer.hf.space)
- **📱 Mobile APK**: *(Geliştirme aşamasında)*

---

## 📋 Proje Özeti

VibeChat, kullanıcıların gerçek zamanlı olarak mesajlaşabildiği ve her mesajın **Türkçe duygu analizi** (pozitif/nötr/negatif) ile değerlendirildiği bir chat uygulamasıdır. Proje, modern full-stack geliştirme pratiklerini ve AI entegrasyonunu göstermek amacıyla geliştirilmiştir.

### 🎯 MVP Özellikleri

✅ **React Web Uygulaması**: Modern, responsive chat arayüzü  
✅ **React Native CLI Mobil Uygulama**: Native mobile deneyim  
✅ **.NET Core 6 REST API**: Güvenli ve ölçeklenebilir backend  
✅ **Python AI Servisi**: Hugging Face BERT tabanlı duygu analizi  
✅ **Gerçek Zamanlı Analiz**: Her mesaj otomatik olarak analiz edilir  
✅ **Ücretsiz Hosting**: Tüm servisler ücretsiz platformlarda deploy edilmiştir

---

## 🛠️ Teknoloji Stack

### Frontend
- **Web**: React 18 + Vite + Tailwind CSS
- **Mobile**: React Native CLI + React Navigation
- **State Management**: Context API + Custom Hooks
- **HTTP Client**: Axios
- **Storage**: LocalStorage (Web) / AsyncStorage (Mobile)

### Backend
- **.NET 6** Web API
- **Entity Framework Core 6** - ORM
- **SQLite** - Veritabanı
- **Swagger/OpenAPI** - API Dokümantasyonu
- **Docker** - Containerization

### AI Servisi
- **Python 3.10**
- **Hugging Face Transformers** - Model çalıştırma
- **Gradio** - API endpoint oluşturma
- **Model**: `savasy/bert-base-turkish-sentiment-cased`

### Deployment & DevOps
- **Frontend**: Vercel
- **Backend**: Render (Docker)
- **AI Service**: Hugging Face Spaces
- **Version Control**: Git + GitHub

---

## 📁 Proje Yapısı ve Dosya Açıklamaları

```
VibeChat/
│
├── backend/
│   └── VibeChat.Api/
│       ├── Features/                    # Feature-based architecture
│       │   ├── Users/
│       │   │   ├── Domain/
│       │   │   │   └── User.cs         # Kullanıcı entity modeli
│       │   │   ├── Dtos/
│       │   │   │   ├── CreateUserDto.cs
│       │   │   │   └── UserDto.cs      # Data transfer objects
│       │   │   └── UsersController.cs   # Kullanıcı API endpoint'leri
│       │   │
│       │   └── Messages/
│       │       ├── Domain/
│       │       │   └── Message.cs       # Mesaj entity modeli
│       │       ├── Dtos/
│       │       │   ├── CreateMessageDto.cs
│       │       │   ├── MessageDto.cs
│       │       │   └── SentimentResponseDto.cs
│       │       └── MessagesController.cs # Mesaj API endpoint'leri
│       │
│       ├── Infrastructure/
│       │   ├── Data/
│       │   │   └── ApplicationDbContext.cs  # EF Core DbContext
│       │   └── Configurations/
│       │       ├── UserConfiguration.cs     # User entity config
│       │       └── MessageConfiguration.cs  # Message entity config
│       │
│       ├── Services/
│       │   ├── Abstractions/
│       │   │   ├── IUserService.cs
│       │   │   ├── IMessageService.cs
│       │   │   └── ISentimentService.cs
│       │   └── Implementations/
│       │       ├── UserService.cs       # İş mantığı katmanı
│       │       ├── MessageService.cs    # Mesaj ve AI entegrasyonu
│       │       └── SentimentService.cs  # AI servis iletişimi
│       │
│       ├── Program.cs                   # Uygulama başlangıç noktası
│       ├── Dockerfile                   # Docker container tanımı
│       ├── appsettings.json            # Development ayarları
│       ├── appsettings.Production.json # Production ayarları
│       └── VibeChat.Api.csproj         # .NET proje dosyası
│
├── frontend/
│   ├── VibeChat.Web/                   # React web uygulaması
│   │   ├── src/
│   │   │   ├── api/
│   │   │   │   └── chatApi.js          # Backend API client
│   │   │   ├── components/
│   │   │   │   ├── Chat/
│   │   │   │   │   ├── ChatBubble.jsx  # Mesaj balonu komponenti
│   │   │   │   │   ├── ChatInput.jsx   # Mesaj input komponenti
│   │   │   │   │   └── MessageList.jsx # Mesaj listesi komponenti
│   │   │   │   └── Common/
│   │   │   │       ├── Button.jsx      # Reusable buton
│   │   │   │       ├── Input.jsx       # Reusable input
│   │   │   │       └── Toast.jsx       # Bildirim komponenti
│   │   │   ├── context/
│   │   │   │   ├── ChatContext.jsx     # Global chat state
│   │   │   │   └── NotificationContext.jsx # Toast yönetimi
│   │   │   ├── hooks/
│   │   │   │   ├── useChat.js          # Chat custom hook
│   │   │   │   └── useNotification.js  # Notification hook
│   │   │   ├── pages/
│   │   │   │   ├── LoginPage.jsx       # Giriş sayfası
│   │   │   │   └── ChatPage.jsx        # Chat sayfası
│   │   │   ├── styles/
│   │   │   │   ├── colors.js           # Renk paleti
│   │   │   │   └── spacing.js          # Spacing değerleri
│   │   │   ├── utils/
│   │   │   │   └── sentiment.js        # Sentiment yardımcı fonksiyonlar
│   │   │   ├── App.jsx                 # Root component
│   │   │   └── main.jsx                # Entry point
│   │   ├── package.json
│   │   ├── vite.config.js
│   │   └── tailwind.config.js
│   │
│   └── VibeChat.Mobile/                # React Native uygulaması
│       ├── src/
│       │   ├── api/
│       │   │   └── chatApi.js          # Backend API client
│       │   ├── components/
│       │   │   ├── Chat/               # Chat komponenleri
│       │   │   └── Common/             # Ortak komponentler
│       │   ├── context/
│       │   │   ├── ChatContext.js      # Global state management
│       │   │   └── NotificationContext.js
│       │   ├── hooks/
│       │   │   ├── useChat.js
│       │   │   └── useNotification.js
│       │   ├── navigation/
│       │   │   └── AppNavigator.js     # Stack navigation
│       │   ├── screens/
│       │   │   ├── LoginScreen.js
│       │   │   └── ChatScreen.js
│       │   └── styles/
│       │       ├── colors.js
│       │       └── spacing.js
│       ├── android/                    # Android native kod
│       ├── ios/                        # iOS native kod
│       ├── App.tsx                     # Root component
│       ├── index.js                    # Entry point
│       └── package.json
│
├── ai-service/
│   ├── app.py                          # Gradio API uygulaması
│   └── requirements.txt                # Python bağımlılıkları
│
└── README.md                           # Bu dosya
```

---

## 🏗️ Backend Mimarisi (Detaylı)

### Katmanlı Mimari Yaklaşımı

Backend, **Clean Architecture** prensiplerine uygun şekilde geliştirilmiştir:

#### 1. **Domain Layer** (Entity Models)
```csharp
// User.cs - Kullanıcı entity'si
public class User
{
    public int Id { get; set; }
    public string Username { get; set; }
    public DateTime CreatedAt { get; set; }
    public ICollection<Message> Messages { get; set; }
}

// Message.cs - Mesaj entity'si  
public class Message
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string Content { get; set; }
    public string? Sentiment { get; set; }
    public decimal? SentimentScore { get; set; }
    public DateTime CreatedAt { get; set; }
    public User User { get; set; }
}
```

#### 2. **Infrastructure Layer** (Database)
- **Entity Framework Core** ile **Code-First** yaklaşım
- **SQLite** - hafif, dosya tabanlı veritabanı
- **Fluent API** ile entity konfigürasyonu
- **Automatic migrations** - `EnsureCreated()` ile otomatik tablo oluşturma

```csharp
// ApplicationDbContext.cs
public class ApplicationDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Message> Messages { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}
```

#### 3. **Service Layer** (Business Logic)

**a) UserService**
- Kullanıcı oluşturma
- Username uniqueness kontrolü
- Kullanıcı listeleme

**b) MessageService** 
- Mesaj oluşturma
- AI servisine sentiment analizi isteği
- Mesaj + sentiment verisi kaydetme
- Hata yönetimi (AI servisi başarısız olsa bile mesaj kaydedilir)

**c) SentimentService**
- HttpClient ile AI servisine asenkron istek
- Gradio API protokolü ile iletişim (event_id bazlı)
- JSON response parsing
- Timeout ve hata yönetimi

```csharp
// MessageService.cs - Kritik iş mantığı
public async Task<MessageDto> CreateMessageAsync(CreateMessageDto dto)
{
    // 1. Kullanıcı doğrulama
    var user = await _context.Users
        .FirstOrDefaultAsync(u => u.Id == dto.UserId);
    
    if (user == null)
        throw new InvalidOperationException("Kullanıcı bulunamadı");

    // 2. Message entity oluştur
    var message = new Message
    {
        UserId = dto.UserId,
        Content = dto.Content,
        CreatedAt = DateTime.UtcNow
    };

    // 3. AI servisinden sentiment analizi al
    try
    {
        var sentimentResult = await _sentimentService
            .AnalyzeSentimentAsync(dto.Content);
        
        message.Sentiment = sentimentResult.Sentiment;
        message.SentimentScore = sentimentResult.SentimentScore;
    }
    catch (Exception)
    {
        // AI servisi başarısız olsa bile mesajı kaydet
        message.Sentiment = null;
        message.SentimentScore = null;
    }

    // 4. Veritabanına kaydet
    _context.Messages.Add(message);
    await _context.SaveChangesAsync();

    return MapToDto(message);
}
```

#### 4. **API Layer** (Controllers)

RESTful API standartlarına uygun endpoint'ler:

**UsersController**
- `POST /api/Users` - Kullanıcı oluştur
- `GET /api/Users` - Tüm kullanıcıları listele

**MessagesController**
- `POST /api/Messages` - Mesaj gönder (otomatik sentiment analizi)
- `GET /api/Messages` - Mesajları listele (pagination desteği)

#### 5. **Cross-Cutting Concerns**

**CORS Politikası**
```csharp
services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});
```

**Swagger/OpenAPI**
- Otomatik API dokümantasyonu
- Interactive API testi
- Production'da da aktif

---

## 🤖 AI Entegrasyonu Detayları

### Hugging Face Model

**Model**: `savasy/bert-base-turkish-sentiment-cased`
- **Türkçe** sentiment analizi için optimize edilmiş BERT modeli
- **3 sınıf**: Pozitif, Nötr, Negatif
- **Accuracy**: ~92% (benchmark)

### Gradio API Protokolü

```python
# app.py - AI servisi
import gradio as gr
from transformers import pipeline

# Model yükleme
sentiment_analyzer = pipeline(
    "sentiment-analysis",
    model="savasy/bert-base-turkish-sentiment-cased"
)

def analyze_sentiment(text):
    result = sentiment_analyzer(text)[0]
    
    # Türkçe label mapping
    label_map = {
        "positive": "pozitif",
        "neutral": "nötr", 
        "negative": "negatif"
    }
    
    return {
        "sentiment": label_map.get(result['label'].lower(), "nötr"),
        "sentimentScore": round(result['score'], 4),
        "scores": {...}
    }

# Gradio API oluştur
demo = gr.Interface(
    fn=analyze_sentiment,
    inputs="text",
    outputs="json",
    api_name="predict"
)

demo.launch()
```

### Backend ↔ AI İletişimi

```csharp
// SentimentService.cs
public async Task<SentimentResponseDto> AnalyzeSentimentAsync(string text)
{
    // 1. Event ID al
    var eventResponse = await _httpClient.PostAsJsonAsync(
        "/gradio_api/call/predict",
        new { data = new[] { text } }
    );
    
    var eventData = await eventResponse.Content
        .ReadFromJsonAsync<EventIdResponse>();
    
    // 2. Sonucu bekle (polling)
    var resultResponse = await _httpClient.GetAsync(
        $"/gradio_api/call/predict/{eventData.EventId}"
    );
    
    // 3. JSON parse ve döndür
    return ParseSentimentResult(resultResponse);
}
```

---

## 🚀 Kurulum ve Çalıştırma

### Önkoşullar
- Node.js 18+
- .NET 6 SDK
- Python 3.10+
- Android Studio (mobil için)

### Backend (Local)
```bash
cd backend/VibeChat.Api
dotnet restore
dotnet run
# API: http://localhost:5000
# Swagger: http://localhost:5000/swagger
```

### Web Frontend (Local)
```bash
cd frontend/VibeChat.Web
npm install
npm run dev
# http://localhost:5173
```

### Mobile Frontend (Local)
```bash
cd frontend/VibeChat.Mobile
npm install

# Android
npx react-native run-android

# iOS (Mac only)
npx react-native run-ios
```

### AI Service (Local)
```bash
cd ai-service
pip install -r requirements.txt
python app.py
# http://localhost:7860
```

---

## 🌐 Deployment Süreci

### 1. Backend → Render

**Dockerfile** ile containerization:
```dockerfile
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY *.csproj ./
RUN dotnet restore
COPY . ./
RUN dotnet publish -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_URLS=http://0.0.0.0:${PORT:-5000}
ENTRYPOINT ["dotnet", "VibeChat.Api.dll"]
```

**Render Ayarları**:
- Runtime: Docker
- Root Directory: `backend/VibeChat.Api`
- Environment: `ASPNETCORE_ENVIRONMENT=Production`
- Free tier: 512MB RAM, auto-sleep after 15 min

### 2. Frontend → Vercel

**Otomatik deployment**:
- GitHub integration ile push-to-deploy
- Framework: Vite (otomatik algılanır)
- Root Directory: `frontend/VibeChat.Web`
- Build Command: `npm run build`
- Output: `dist/`

### 3. AI Service → Hugging Face Spaces

**Gradio app** doğrudan HF Spaces'te çalışır:
- Python runtime
- Otomatik HTTPS endpoint
- GPU acceleration (optional)

---

## 📊 API Dokümantasyonu

### Endpoint Listesi

#### **POST** `/api/Users`
Yeni kullanıcı oluştur

**Request:**
```json
{
  "username": "johndoe"
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "username": "johndoe",
  "createdAt": "2025-11-11T12:00:00Z"
}
```

---

#### **GET** `/api/Users`
Tüm kullanıcıları listele

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "username": "johndoe",
    "createdAt": "2025-11-11T12:00:00Z"
  }
]
```

---

#### **POST** `/api/Messages`
Mesaj gönder (otomatik sentiment analizi)

**Request:**
```json
{
  "userId": 1,
  "content": "Bu harika bir gün!"
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "userId": 1,
  "username": "johndoe",
  "content": "Bu harika bir gün!",
  "sentiment": "pozitif",
  "sentimentScore": 0.9876,
  "createdAt": "2025-11-11T12:30:00Z"
}
```

---

#### **GET** `/api/Messages?limit=50&afterId=0`
Mesajları listele

**Query Params:**
- `limit` (optional): Döndürülecek mesaj sayısı (default: 100)
- `afterId` (optional): Bu ID'den sonraki mesajları getir (pagination)

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "userId": 1,
    "username": "johndoe",
    "content": "Bu harika bir gün!",
    "sentiment": "pozitif",
    "sentimentScore": 0.9876,
    "createdAt": "2025-11-11T12:30:00Z"
  }
]
```

---

## 🎨 Frontend Özellikleri

### Web (React + Tailwind)
- 🎨 Modern, dark-mode tasarım
- 📱 Fully responsive (mobile-first)
- 🔔 Toast notification sistemi
- ⚡ Optimistic UI updates
- 🎭 Sentiment badge'leri (emoji + renk)
- 🔄 Real-time message updates

### Mobile (React Native)
- 📱 Native iOS + Android desteği
- 🎨 Platform-specific design patterns
- 🔔 Native toast notifications
- 📦 AsyncStorage ile offline cache
- ⚡ Fast Refresh development

---

## 🧪 Kod Hakimiyeti Kanıtı

### Elle Yazılan Kritik Kod Bölümleri

#### 1. **MessageService.cs** - AI Entegrasyon Mantığı
- Mesaj oluşturma iş akışı
- Try-catch ile resilient AI integration
- Transaction yönetimi

#### 2. **SentimentService.cs** - Gradio API İletişimi  
- HttpClient yapılandırması
- Event-based polling mekanizması
- JSON serialization/deserialization

#### 3. **chatApi.js** - Frontend API Client
- Axios interceptor'ları
- Error handling ve mapping
- Timeout yönetimi

#### 4. **useChat.js** - Custom React Hook
- State management mantığı
- Side effect handling
- Pagination logic

### AI Destekli Bölümler

- ✨ Tailwind CSS styling
- ✨ Toast component başlangıç şablonu
- ✨ Bazı DTO class'ları (sonradan modifiye edildi)
- ✨ README taslak yapısı

### Modifiye Edilen/İyileştirilen AI Kodu

- 🔧 CORS politikası (güvenlik için daraltıldı)
- 🔧 Error handling (custom exception types eklendi)
- 🔧 Sentiment mapping (Türkçe label'lar eklendi)
- 🔧 Database configuration (production path düzeltmesi)

---

## ✨ Özellikler ve İyileştirmeler

### ✅ Tamamlanan Özellikler
- Kullanıcı kaydı ve kimlik doğrulama
- Gerçek zamanlı mesajlaşma
- AI destekli sentiment analizi
- Web + Mobile cross-platform desteği
- Professional toast notification sistemi
- Responsive design
- API dokümantasyonu (Swagger)
- Production deployment

### 🚀 Potansiyel İyileştirmeler
- WebSocket ile gerçek zamanlı çift yönlü iletişim
- JWT authentication
- Message reactions ve threads
- User profiles ve avatars
- PostgreSQL migration (production için)
- Redis caching
- Rate limiting
- CI/CD pipeline (GitHub Actions)

---

## 📚 Öğrenilen Teknolojiler

### Backend
- ✅ .NET 6 Web API geliştirme
- ✅ Entity Framework Core (Code-First)
- ✅ Dependency Injection
- ✅ Async/Await pattern
- ✅ RESTful API design
- ✅ Docker containerization

### Frontend  
- ✅ React 18 (Hooks, Context API)
- ✅ React Native CLI
- ✅ Tailwind CSS
- ✅ Vite build tool
- ✅ Axios HTTP client
- ✅ React Navigation

### AI & ML
- ✅ Hugging Face Transformers
- ✅ BERT model inference
- ✅ Gradio API framework
- ✅ Sentiment analysis concepts

### DevOps
- ✅ Render deployment
- ✅ Vercel deployment  
- ✅ Hugging Face Spaces
- ✅ Docker multi-stage builds
- ✅ Environment configuration

---

## 📝 Lisans

Bu proje, FullStack + AI Stajyer programı kapsamında eğitim amaçlı geliştirilmiştir.

---

## 👨‍💻 Geliştirici

**Ahmet Çalışkan**

- GitHub: [@ahmetcaliskan63](https://github.com/ahmetcaliskan63)
- LinkedIn: [Ahmet Çalışkan](https://linkedin.com/in/ahmetcaliskan)

---

## 🙏 Teşekkürler

- Hugging Face - AI model hosting
- Render - Backend hosting
- Vercel - Frontend hosting
- savasy - Türkçe BERT sentiment model

---

**⭐ Projeyi beğendiyseniz yıldız vermeyi unutmayın!**
