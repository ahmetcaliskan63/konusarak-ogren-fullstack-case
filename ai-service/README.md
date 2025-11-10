# AI Service - Sentiment Analyzer

Hugging Face Spaces'de çalışan duygu analizi servisi.

## Model

- **Model**: `savasy/bert-base-turkish-sentiment-cased`
- **Dil**: Türkçe (özellikle Türkçe için eğitilmiş BERT modeli)
- **Çıktı**: Pozitif, Nötr, Negatif + Güven skorları

## Yerel Çalıştırma

```bash
pip install -r requirements.txt
python app.py
```

## Hugging Face Spaces Deployment

1. Hugging Face hesabı oluştur/giriş yap
2. Yeni Space oluştur: `sentiment-analyzer`
3. Python + Gradio template seç
4. Bu dosyaları Space'e yükle:
   - `app.py`
   - `requirements.txt`
5. Space otomatik olarak deploy edilecek
6. API URL'ini not al (örn: `https://your-username-sentiment-analyzer.hf.space`)

## API Kullanımı

Gradio otomatik olarak API endpoint oluşturur:

```python
import requests

response = requests.post(
    "https://your-username-sentiment-analyzer.hf.space/api/predict",
    json={"data": ["Merhaba, nasılsın?"]}
)
```

## Çıktı Formatı

Backend entegrasyonu için JSON formatı:

```json
{
  "sentiment": "pozitif",
  "sentimentScore": 0.95,
  "scores": {
    "pozitif": 0.95,
    "nötr": 0.03,
    "negatif": 0.02
  }
}
```

**Alanlar:**
- `sentiment`: "pozitif", "nötr" veya "negatif"
- `sentimentScore`: 0.0 ile 1.0 arası güven skoru
- `scores`: Her kategori için detaylı skorlar

## Backend Entegrasyonu (.NET Core)

Backend'den API çağrısı yapılırken Gradio'nun otomatik API'si kullanılır:

```csharp
var response = await httpClient.PostAsJsonAsync(
    "https://your-username-sentiment-analyzer.hf.space/api/predict",
    new { data = new[] { messageContent } }
);
```

Gradio API response formatı:
```json
{
  "data": ["**Duygu:** 😊 POZİTİF\n**Güven Skoru:** 95.00%..."]
}
```

Backend'de bu response'u parse edip `analyze_sentiment()` fonksiyonunun döndürdüğü formatı kullanmak için Gradio API wrapper'ı yazılabilir veya doğrudan `analyze_sentiment()` fonksiyonunu çağıran bir API endpoint eklenebilir.


