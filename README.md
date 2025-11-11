# VibeChat – AI-Powered Sentiment Chat

## ⚡ TL;DR

Real-time chat uygulaması ile her mesaj **Türkçe duygu analizi** (pozitif/nötr/negatif) yapılarak görüntülenir. Full-stack + AI case projesi.

**Stack:** React Web + React Native Mobile + .NET 6 API + Python AI (Hugging Face BERT)  
**Deploy:** Vercel + Render + Hugging Face Spaces  
**Süre:** 10 dakikada local'de çalıştırabilirsiniz

---

## 🌐 Canlı Linkler

| Platform | URL | Notlar |
|----------|-----|--------|
| **Web App** | [vibechat-web.vercel.app](https://vibechat-web.vercel.app) | Vercel deployment |
| **Backend API** | [vibechat-api.onrender.com](https://vibechat-api.onrender.com) | Render free tier (ilk istek ~50sn) |
| **API Docs** | [vibechat-api.onrender.com/swagger](https://vibechat-api.onrender.com/swagger) | Swagger UI (interactive) |
| **AI Service** | [ahmetcan3281-sentiment-analyzer.hf.space](https://ahmetcan3281-sentiment-analyzer.hf.space) | Hugging Face Spaces |
| **Mobile APK** | [VibeChat-v1.0-fixed.apk](./VibeChat-v1.0-fixed.apk) | Android release (56 MB) |

> ⚠️ **Render Free Tier:** Uygulama 15 dakika inaktif kalırsa uyur. İlk istek biraz uzun sürebilir.

---

## 🚀 Hızlı Başlangıç

### Backend (.NET 6)
```bash
cd backend/VibeChat.Api
dotnet restore && dotnet run
# http://localhost:5000 | Swagger: /swagger
```

### Web (React + Vite)
```bash
cd frontend/VibeChat.Web
npm install && npm run dev
# http://localhost:5173
```

### Mobile (React Native CLI)
```bash
cd frontend/VibeChat.Mobile
npm install
npx react-native run-android  # Android
npx react-native run-ios       # iOS (Mac only)
```

### AI Service (Python)
```bash
cd ai-service
pip install -r requirements.txt && python app.py
# http://localhost:7860
```

---

## 🔧 Ortam Değişkenleri

### Backend (`appsettings.json`)
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=vibechat.db"
  },
  "AIService": {
    "BaseUrl": "https://ahmetcan3281-sentiment-analyzer.hf.space"
  }
}
```

### Frontend (Web & Mobile)
`src/api/chatApi.js` içinde:
```javascript
const API_BASE_URL = 'https://vibechat-api.onrender.com';
```

> **Local Test:** Backend'i `http://localhost:5000` (web) veya `http://10.0.2.2:5000` (Android emulator) olarak değiştirin.

---

## 🧭 Mimari

```
┌─────────────┐      ┌─────────────┐      ┌──────────────┐
│  React Web  │      │   .NET 6    │      │  Python AI   │
│   + Mobile  │─────▶│   Web API   │─────▶│   (Gradio)   │
│  (Client)   │      │  (Backend)  │      │ Hugging Face │
└─────────────┘      └─────────────┘      └──────────────┘
                            │
                            ▼
                     ┌─────────────┐
                     │   SQLite    │
                     │  Database   │
                     └─────────────┘
```

### Veri Akışı (4 Adım)
1. **Kullanıcı mesaj yazar** → Frontend POST `/api/Messages`
2. **Backend mesajı alır** → AI servisine sentiment analizi isteği gönderir
3. **AI servisi analiz eder** → Pozitif/Nötr/Negatif + confidence score döner
4. **Backend veritabanına kaydeder** → Frontend mesaj + sentiment'i gösterir

---

## 📡 API Kullanımı

### POST `/api/Users` - Kullanıcı Oluştur
```bash
curl -X POST https://vibechat-api.onrender.com/api/Users \
  -H "Content-Type: application/json" \
  -d '{"username": "johndoe"}'
```
**Response:**
```json
{"id": 1, "username": "johndoe", "createdAt": "2025-11-11T12:00:00Z"}
```

### POST `/api/Messages` - Mesaj Gönder (Otomatik AI Analizi)
```bash
curl -X POST https://vibechat-api.onrender.com/api/Messages \
  -H "Content-Type: application/json" \
  -d '{"userId": 1, "content": "Bu harika bir gün!"}'
```
**Response:**
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

### GET `/api/Messages?limit=50&afterId=0` - Mesajları Listele
```bash
curl https://vibechat-api.onrender.com/api/Messages?limit=50
```

---

## 🛠 Troubleshooting

| Sorun | Çözüm |
|-------|-------|
| **CORS hatası** | Backend'de `AllowAnyOrigin()` CORS policy aktif. Tarayıcı cache'ini temizleyin. |
| **AI servisi yavaş** | Hugging Face cold start ~30sn sürebilir. İlk istek sonrası hızlanır. |
| **Render 503 hatası** | Free tier sleep modunda. 1 dakika bekleyip tekrar deneyin. |
| **Android local test** | Emulator için `http://10.0.2.2:5000`, fiziksel cihaz için bilgisayar IP'si kullanın. |
| **APK yüklenmiyor** | Android Settings → Security → "Bilinmeyen kaynaklardan yükleme" açın. |

---

## 🧪 Test & Definition of Done

### ✅ Tamamlanan Özellikler
- [x] Kullanıcı kaydı ve giriş
- [x] Mesaj gönderme/alma
- [x] AI duygu analizi (Türkçe)
- [x] Web responsive tasarım
- [x] Mobile native uygulama
- [x] Production deployment (Web, API, AI)
- [x] Android APK build
- [x] API dokümantasyonu (Swagger)
- [x] Error handling ve toast notifications
- [x] Optimistic UI updates

### 🧪 Test Coverage
- **Backend:** Entity validation, AI service fallback, CRUD operations
- **Frontend:** Form validation, API error handling, navigation flow
- **Integration:** End-to-end message flow (user → message → AI → display)

---

## 🧠 Kod Hakimiyeti

### 🖊️ Elle Yazılan Kritik Kod
| Dosya | Açıklama |
|-------|----------|
| `MessageService.cs` | AI entegrasyon iş mantığı, error handling |
| `SentimentService.cs` | Gradio API polling mekanizması |
| `ApplicationDbContext.cs` | EF Core configuration, entity relationships |
| `chatApi.js` | Axios interceptors, error mapping |
| `useChat.js` | State management, custom hooks |
| `ChatContext.jsx/js` | Global state, side effects |

### 🤖 AI Destekli Bölümler
- Tailwind CSS styling (özelleştirildi)
- DTO class'ları (modifiye edildi)
- Toast component template (genişletildi)

### 🔧 Önemli Modifikasyonlar
- CORS policy güvenlik ayarları
- Production database path (`/tmp/vibechat.db` for Render)
- Türkçe sentiment label mapping
- RTL text direction fix (mobile)

---

## 🗺 Yol Haritası

### 🔜 Planlanan İyileştirmeler
- [ ] **SignalR/WebSocket** - Real-time çift yönlü iletişim
- [ ] **JWT Authentication** - Güvenli kullanıcı yetkilendirme
- [ ] **PostgreSQL Migration** - Production-ready database
- [ ] **Redis Caching** - API response caching
- [ ] **Rate Limiting** - DoS koruması
- [ ] **CI/CD Pipeline** - GitHub Actions otomasyonu
- [ ] **User Profiles** - Avatar, bio, preferences
- [ ] **Message Reactions** - Emoji reactions, threads

---

## 📚 Teknoloji Stack

### Frontend
- **Web:** React 18, Vite, Tailwind CSS
- **Mobile:** React Native CLI, React Navigation

### Backend
- **.NET 6** Web API, Entity Framework Core
- **SQLite** (development), Docker

### AI
- **Python 3.10**, Hugging Face Transformers
- **Model:** `savasy/bert-base-turkish-sentiment-cased`
- **Gradio** API framework

### Deployment
- **Vercel** (Web), **Render** (API), **Hugging Face Spaces** (AI)

---

## 📝 Lisans & İletişim

Bu proje, **FullStack + AI Stajyer Programı** kapsamında eğitim amaçlı geliştirilmiştir.

**Geliştirici:** Ahmet Çalışkan  
📧 GitHub: [@ahmetcaliskan63](https://github.com/ahmetcaliskan63)  
💼 LinkedIn: [Ahmet Çalışkan](https://linkedin.com/in/ahmetcaliskan)

---

⭐ **Projeyi beğendiyseniz star vermeyi unutmayın!**
