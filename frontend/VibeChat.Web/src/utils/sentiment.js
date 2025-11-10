export const SENTIMENT_TYPES = {
  POSITIVE: 'positive',
  NEUTRAL: 'neutral',
  NEGATIVE: 'negative',
  POZITIF: 'pozitif',
  NOTR: 'nötr',
  NEGATIF: 'negatif',
};

export function normalizeSentiment(sentiment) {
  if (!sentiment) return 'neutral';
  
  const normalized = sentiment.toLowerCase().trim();
  
  if (normalized === 'pozitif' || normalized === 'positive') {
    return 'positive';
  }
  if (normalized === 'nötr' || normalized === 'notr' || normalized === 'neutral') {
    return 'neutral';
  }
  if (normalized === 'negatif' || normalized === 'negative') {
    return 'negative';
  }
  
  return 'neutral';
}

export function getSentimentEmoji(sentiment) {
  const normalized = normalizeSentiment(sentiment);
  
  const emojis = {
    positive: '😊',
    neutral: '😐',
    negative: '😔',
  };
  
  return emojis[normalized] || '😐';
}

export function getSentimentColor(sentiment) {
  const normalized = normalizeSentiment(sentiment);
  
  const colors = {
    positive: 'text-sentiment-positive',
    neutral: 'text-sentiment-neutral',
    negative: 'text-sentiment-negative',
  };
  
  return colors[normalized] || 'text-sentiment-neutral';
}

export function getSentimentBgColor(sentiment) {
  const normalized = normalizeSentiment(sentiment);
  
  const bgColors = {
    positive: 'bg-sentiment-positive-bg',
    neutral: 'bg-sentiment-neutral-bg',
    negative: 'bg-sentiment-negative-bg',
  };
  
  return bgColors[normalized] || 'bg-sentiment-neutral-bg';
}

export function getSentimentLabel(sentiment) {
  const normalized = normalizeSentiment(sentiment);
  
  const labels = {
    positive: 'Positive',
    neutral: 'Neutral',
    negative: 'Negative',
  };
  
  return labels[normalized] || 'Neutral';
}

export function formatScore(score) {
  if (typeof score !== 'number') return '0%';
  return `${Math.round(score * 100)}%`;
}

export function getScoreBarColor(sentiment) {
  const normalized = normalizeSentiment(sentiment);
  
  const colors = {
    positive: 'bg-sentiment-positive',
    neutral: 'bg-sentiment-neutral',
    negative: 'bg-sentiment-negative',
  };
  
  return colors[normalized] || 'bg-sentiment-neutral';
}

export function getSentimentChipClass(sentiment) {
  const normalized = normalizeSentiment(sentiment);
  
  const classes = {
    positive: 'sentiment-chip-positive',
    neutral: 'sentiment-chip-neutral',
    negative: 'sentiment-chip-negative',
  };
  
  return classes[normalized] || 'sentiment-chip-neutral';
}

