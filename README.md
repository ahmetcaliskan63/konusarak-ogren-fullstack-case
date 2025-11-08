# Sentiment Chat Evaluator

FullStack + AI Stajyer Projesi

## Proje Özeti

Kullanıcıların mesajlaşarak sohbet edebildiği, yazışmaların AI tarafından duygu analizi yapılarak canlı olarak gösterildiği basit bir web + mobil uygulama.

## Teknoloji Stack

- **Frontend (Web)**: React - Vercel
- **Frontend (Mobil)**: React Native CLI
- **Backend**: .NET Core + SQLite - Render
- **AI Servisi**: Python + Gradio API - Hugging Face Spaces

## Klasör Yapısı

```
sentiment-chat-evaluator/
├── frontend/          # React web uygulaması
├── mobile/            # React Native CLI mobil uygulama
├── backend/           # .NET Core API
├── ai-service/        # Python AI servisi (Hugging Face Spaces)
└── README.md          # Bu dosya
```

## Kurulum

### Frontend (Web)
```bash
cd frontend
npm install
npm start
```

### Mobile
```bash
cd mobile
npm install
npx react-native run-android
```

### Backend
```bash
cd backend
dotnet restore
dotnet run
```

### AI Service
```bash
cd ai-service
pip install -r requirements.txt
python app.py
```

## Deployment Linkleri

- **Web App**: [Vercel Linki] (henüz deploy edilmedi)
- **API**: [Render Linki] (henüz deploy edilmedi)
- **AI Service**: [Hugging Face Space Linki] (henüz deploy edilmedi)
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


