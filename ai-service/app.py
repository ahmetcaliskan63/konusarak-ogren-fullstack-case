import gradio as gr
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from scipy.special import softmax
import torch
import json

model_name = "savasy/bert-base-turkish-sentiment-cased"
tokenizer = None
model = None

def load_model():
    global tokenizer, model
    if tokenizer is None or model is None:
        tokenizer = AutoTokenizer.from_pretrained(model_name)
        model = AutoModelForSequenceClassification.from_pretrained(model_name)
    return tokenizer, model

def analyze_sentiment(text):
    if not text or len(text.strip()) == 0:
        return {
            "sentiment": "nötr",
            "sentimentScore": 0.0,
            "error": "Boş metin analiz edilemez"
        }
    
    try:
        tokenizer, model = load_model()
        encoded_input = tokenizer(text, return_tensors='pt', truncation=True, max_length=512)
        
        with torch.no_grad():
            output = model(**encoded_input)
        
        scores = output[0][0].detach().numpy()
        scores = softmax(scores)
        
        id2label = model.config.id2label
        label_ids = sorted(id2label.keys())
        
        label_to_sentiment = {}
        for label_id in label_ids:
            label_text = str(id2label[label_id]).lower()
            if 'negatif' in label_text or 'negative' in label_text:
                label_to_sentiment[label_id] = 'negatif'
            elif 'pozitif' in label_text or 'positive' in label_text:
                label_to_sentiment[label_id] = 'pozitif'
            elif 'nötr' in label_text or 'neutral' in label_text or 'notr' in label_text:
                label_to_sentiment[label_id] = 'nötr'
            else:
                if len(label_ids) == 3:
                    if label_id == label_ids[0]:
                        label_to_sentiment[label_id] = 'negatif'
                    elif label_id == label_ids[-1]:
                        label_to_sentiment[label_id] = 'pozitif'
                    else:
                        label_to_sentiment[label_id] = 'nötr'
                elif len(label_ids) == 2:
                    if label_id == label_ids[0]:
                        label_to_sentiment[label_id] = 'negatif'
                    else:
                        label_to_sentiment[label_id] = 'pozitif'
                else:
                    label_to_sentiment[label_id] = 'nötr'
        
        results = {'pozitif': 0.0, 'nötr': 0.0, 'negatif': 0.0}
        for idx, label_id in enumerate(label_ids):
            sentiment_name = label_to_sentiment.get(label_id, 'nötr')
            results[sentiment_name] = float(scores[idx])
        
        max_score_idx = scores.argmax()
        sentiment = label_to_sentiment.get(label_ids[max_score_idx], 'nötr')
        confidence = float(scores[max_score_idx])
        
        return {
            "sentiment": sentiment,
            "sentimentScore": confidence,
            "scores": results
        }
    except Exception as e:
        return {
            "sentiment": "nötr",
            "sentimentScore": 0.0,
            "error": str(e)
        }

# API endpoint için direkt fonksiyon (JSON döndürür)
def analyze_sentiment_api(text):
    """
    HTTP API için JSON döndüren fonksiyon
    """
    result = analyze_sentiment(text)
    return json.dumps(result, ensure_ascii=False)

def sentiment_interface(text):
    result = analyze_sentiment(text)
    
    if "error" in result:
        return f"❌ Hata: {result['error']}"
    
    sentiment_emoji = {
        "pozitif": "😊",
        "nötr": "😐",
        "negatif": "😞"
    }
    
    emoji = sentiment_emoji.get(result["sentiment"], "❓")
    
    output = f"""
    **Duygu:** {emoji} {result['sentiment'].upper()}
    **Güven Skoru:** {result['sentimentScore']:.2%}
    
    **Detaylı Skorlar:**
    - Pozitif: {result['scores']['pozitif']:.2%}
    - Nötr: {result['scores']['nötr']:.2%}
    - Negatif: {result['scores']['negatif']:.2%}
    """
    
    return output

# Tek bir Interface - hem web hem API için JSON döndürür
app = gr.Interface(
    fn=analyze_sentiment_api,  # JSON string döndüren fonksiyon
    inputs=gr.Textbox(
        label="Mesaj",
        placeholder="Analiz etmek istediğiniz metni girin...",
        lines=3
    ),
    outputs=gr.JSON(label="Duygu Analizi Sonucu"),  # JSON output
    title="Sentiment Analyzer - Duygu Analizi",
    description="Metinlerin duygu durumunu analiz eder (Pozitif/Nötr/Negatif) - JSON API",
    examples=[
        ["Bugün harika bir gün geçirdim!"],
        ["Her şey normal, özel bir durum yok."],
        ["Bu durumdan hiç memnun değilim."]
    ],
    api_name="predict"  # API endpoint adı (bu çalışıyor!)
)

if __name__ == "__main__":
    app.launch(server_name="0.0.0.0", server_port=7860)
