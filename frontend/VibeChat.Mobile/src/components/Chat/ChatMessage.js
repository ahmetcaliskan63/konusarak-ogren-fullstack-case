import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { format } from 'date-fns';
import {
  getSentimentEmoji,
  getSentimentLabel,
  formatScore,
  getSentimentColor,
  getSentimentBgColor,
  getScoreBarColor,
} from '../../utils/sentiment';
import { colors } from '../../styles/colors';
import { spacing, fontSize, borderRadius } from '../../styles/spacing';

export default function ChatMessage({ message, isOwnMessage }) {
  const scoreAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (message.sentimentScore && !message.isOptimistic) {
      Animated.timing(scoreAnim, {
        toValue: message.sentimentScore,
        duration: 700,
        useNativeDriver: false,
      }).start();
    }
  }, [message.sentimentScore, message.isOptimistic, scoreAnim]);

  let formattedTime = '';
  let formattedDate = '';

  try {
    if (message.timestamp) {
      const date = new Date(message.timestamp);
      formattedTime = format(date, 'HH:mm');
      formattedDate = format(date, 'd MMM');
    }
  } catch (error) {
    formattedTime = '--:--';
    formattedDate = '--';
  }

  const progressWidth = scoreAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View
      style={[
        styles.container,
        isOwnMessage ? styles.ownMessage : styles.otherMessage,
      ]}>
      <View
        style={[
          styles.bubble,
          isOwnMessage ? styles.ownBubble : styles.otherBubble,
        ]}>
        <View style={styles.header}>
          <Text style={styles.username}>
            {message.username || 'Anonim'}
          </Text>
          <Text style={styles.timestamp}>
            {formattedDate} • {formattedTime}
          </Text>
        </View>

        <Text style={styles.content}>{message.content}</Text>

        {message.sentiment && (
          <View style={styles.sentimentContainer}>
            <View style={styles.sentimentHeader}>
              <View
                style={[
                  styles.sentimentChip,
                  { backgroundColor: getSentimentBgColor(message.sentiment) },
                ]}>
                <Text style={styles.emoji}>
                  {getSentimentEmoji(message.sentiment)}
                </Text>
                <Text
                  style={[
                    styles.sentimentLabel,
                    { color: getSentimentColor(message.sentiment) },
                  ]}>
                  {getSentimentLabel(message.sentiment)}
                </Text>
              </View>
              <Text style={styles.score}>
                {formatScore(message.sentimentScore)}
              </Text>
            </View>

            <View style={styles.progressBar}>
              <Animated.View
                style={[
                  styles.progressFill,
                  {
                    width: progressWidth,
                    backgroundColor: getScoreBarColor(message.sentiment),
                  },
                ]}
              />
            </View>
          </View>
        )}

        {message.isOptimistic && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Gönderiliyor...</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  ownMessage: {
    alignItems: 'flex-end',
  },
  otherMessage: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '85%',
    borderRadius: borderRadius.bubble,
    padding: spacing.md,
    borderWidth: 1,
  },
  ownBubble: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  otherBubble: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: spacing.xs,
  },
  username: {
    fontSize: fontSize.sm,
    fontWeight: '500',
    color: colors.text,
    marginRight: spacing.sm,
  },
  timestamp: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },
  content: {
    fontSize: fontSize.md,
    lineHeight: 22,
    color: colors.text,
  },
  sentimentContainer: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  sentimentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  sentimentChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  emoji: {
    fontSize: fontSize.md,
    marginRight: spacing.xs,
  },
  sentimentLabel: {
    fontSize: fontSize.xs,
    fontWeight: '500',
  },
  score: {
    fontSize: fontSize.xs,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: borderRadius.sm,
  },
  loadingContainer: {
    marginTop: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },
});

