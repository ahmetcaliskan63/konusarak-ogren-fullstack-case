import { colors } from '../styles/colors';

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
  
  const sentimentColors = {
    positive: colors.positive,
    neutral: colors.neutral,
    negative: colors.negative,
  };
  
  return sentimentColors[normalized] || colors.neutral;
}

export function getSentimentBgColor(sentiment) {
  const normalized = normalizeSentiment(sentiment);
  
  const bgColors = {
    positive: colors.positiveBackground,
    neutral: colors.neutralBackground,
    negative: colors.negativeBackground,
  };
  
  return bgColors[normalized] || colors.neutralBackground;
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
  
  const barColors = {
    positive: colors.positive,
    neutral: colors.neutral,
    negative: colors.negative,
  };
  
  return barColors[normalized] || colors.neutral;
}

