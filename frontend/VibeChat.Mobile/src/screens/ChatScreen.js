import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useChat } from '../hooks/useChat';
import { useNotification } from '../hooks/useNotification';
import ChatList from '../components/Chat/ChatList';
import ChatInput from '../components/Chat/ChatInput';
import { colors } from '../styles/colors';
import { spacing } from '../styles/spacing';

export default function ChatScreen({ navigation }) {
  const { currentUser, messages, loading, loadMessages, sendMessage, logout } =
    useChat();
  const notification = useNotification();
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigation.replace('Login');
      return;
    }

    loadMessages().catch(() => {
      notification.error('Mesajlar yüklenirken bir hata oluştu');
    });
  }, [currentUser, navigation, notification]);

  const handleSendMessage = async content => {
    setSending(true);
    try {
      await sendMessage(content);
    } catch (error) {
      notification.error('Mesaj gönderilemedi. Lütfen tekrar deneyin.');
    } finally {
      setSending(false);
    }
  };

  const handleLogout = useCallback(async () => {
    await logout();
    notification.info('Çıkış yapıldı');
    navigation.replace('Login');
  }, [logout, navigation, notification]);

  const handleRefresh = useCallback(() => {
    loadMessages();
  }, [loadMessages]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Icon name="log-out-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, handleLogout]);

  if (!currentUser) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ChatList
        messages={messages}
        currentUserId={currentUser.id}
        loading={loading}
        onRefresh={handleRefresh}
      />
      <ChatInput onSendMessage={handleSendMessage} disabled={sending} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  logoutButton: {
    paddingHorizontal: spacing.lg,
  },
});
