import React from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import ChatMessage from './ChatMessage';
import { colors } from '../../styles/colors';
import { spacing, fontSize } from '../../styles/spacing';

export default function ChatList({
  messages,
  currentUserId,
  loading,
  onRefresh,
}) {
  const renderMessage = ({ item }) => (
    <ChatMessage message={item} isOwnMessage={item.userId === currentUserId} />
  );

  const renderEmpty = () => {
    if (loading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      );
    }

    return (
      <View style={styles.centerContainer}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>💬</Text>
          <Text style={styles.emptyTitle}>Henüz mesaj yok</Text>
          <Text style={styles.emptySubtitle}>
            İlk mesajı göndererek sohbete başla!{'\n'}AI duygu analizini
            göreceksin.
          </Text>
        </View>
      </View>
    );
  };

  const renderFooter = () => {
    if (!loading || messages.length === 0) return null;

    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    );
  };

  return (
    <FlatList
      data={messages}
      renderItem={renderMessage}
      keyExtractor={item => item.id.toString()}
      inverted
      contentContainerStyle={[
        styles.listContent,
        messages.length === 0 && styles.emptyListContent,
      ]}
      ListEmptyComponent={renderEmpty}
      ListFooterComponent={renderFooter}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={onRefresh}
          tintColor={colors.primary}
          colors={[colors.primary]}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    flexGrow: 1,
    paddingVertical: spacing.md,
  },
  emptyListContent: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyContainer: {
    alignItems: 'center',
    maxWidth: 300,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  footerLoader: {
    paddingVertical: spacing.lg,
  },
});

