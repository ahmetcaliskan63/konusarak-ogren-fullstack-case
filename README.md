# Sentiment Chat Evaluator

FullStack + AI Stajyer Projesi

## Proje Özeti

Kullanıcıların mesajlaşarak sohbet edebildiği, yazışmaların AI tarafından duygu analizi yapılarak canlı olarak gösterildiği basit bir web + mobil uygulama.

## Teknoloji Stack

- **Frontend (Web)**: React - Vercel
- **Frontend (Mobil)**: React Native CLI
- **Backend**: .NET 6 + SQLite - Render
- **AI Servisi**: Python + Gradio API - Hugging Face Spaces

## Klasör Yapısı

```
sentiment-chat-evaluator/
├── frontend/
│   ├── VibeChat.Web/      # React web uygulaması
│   └── VibeChat.Mobile/   # React Native CLI mobil uygulama
├── backend/               # .NET 6 API
├── ai-service/            # Python AI servisi (Hugging Face Spaces)
└── README.md              # Bu dosya
```

## Kurulum

### Frontend (Web)
```bash
cd frontend/VibeChat.Web
npm install
npm start
```

### Mobile
```bash
cd frontend/VibeChat.Mobile
npm install
npx react-native run-android
```

### Backend
```bash
cd backend/VibeChat.Api
dotnet restore
dotnet run
```

### AI Service
```bash
cd ai-service
pip install -r requirements.txt
python app.py
```

## AI Araçları

Bu projede kullanılan AI araçları:

- **Hugging Face Spaces**: AI servisi için hosting platformu
- **Model**: `savasy/bert-base-turkish-sentiment-cased` - Türkçe duygu analizi modeli
- **Gradio**: Web arayüzü ve API endpoint'i için framework
- **Transformers**: Hugging Face model kütüphanesi

### AI Servisi Detayları

- **Space URL**: https://ahmetcan3281-sentiment-analyzer.hf.space
- **API Endpoint**: `/gradio_api/call/predict` (asenkron)
- **Model**: `savasy/bert-base-turkish-sentiment-cased`
- **Çıktı Formatı**: 
  - `sentiment`: "pozitif", "nötr" veya "negatif"
  - `sentimentScore`: 0.0 ile 1.0 arası güven skoru
  - `scores`: Detaylı kategori skorları (pozitif, nötr, negatif)

### Backend API Endpoint'leri

**Base URL (Local)**: `http://localhost:60995` veya `https://localhost:60994`

#### Users:
- `POST /api/Users` - Yeni kullanıcı oluştur (rumuz)
- `GET /api/Users` - Tüm kullanıcıları listele

#### Messages:
- `POST /api/Messages` - Yeni mesaj gönder (otomatik sentiment analizi)
- `GET /api/Messages` - Tüm mesajları listele

#### Swagger Documentation:
- `http://localhost:60995/swagger` - API dokümantasyonu

## Deployment Linkleri

- **Web App**: [Vercel Linki] (henüz deploy edilmedi)
- **API**: [Render Linki] (henüz deploy edilmedi)
- **AI Service**: https://ahmetcan3281-sentiment-analyzer.hf.space
- **APK**: [GitHub Releases Linki] (henüz build edilmedi)

## Özellikler

- ✅ Kullanıcı kaydı (sadece rumuz)
- ✅ Mesajlaşma
- ✅ Gerçek zamanlı duygu analizi (pozitif/nötr/negatif)
- ✅ Sentiment skoru gösterimi
- ✅ Web ve mobil platform desteği

## Geliştirme Durumu

🚧 Proje geliştirme aşamasında...

## Lisans

Bu proje stajyer projesi olarak geliştirilmiştir.


