import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useChat } from '../hooks/useChat';
import ChatList from '../components/Chat/ChatList';
import ChatInput from '../components/Chat/ChatInput';
import { colors } from '../styles/colors';
import { spacing } from '../styles/spacing';

export default function ChatScreen({ navigation }) {
  const { currentUser, messages, loading, loadMessages, sendMessage, logout } =
    useChat();
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigation.replace('Login');
      return;
    }

    loadMessages();
  }, [currentUser, navigation]);

  const handleSendMessage = async content => {
    setSending(true);
    try {
      await sendMessage(content);
    } catch (error) {
      Alert.alert('Hata', 'Mesaj gönderilemedi. Lütfen tekrar deneyin.');
    } finally {
      setSending(false);
    }
  };

  const handleLogout = useCallback(() => {
    Alert.alert('Çıkış', 'Çıkış yapmak istediğinize emin misiniz?', [
      { text: 'İptal', style: 'cancel' },
      {
        text: 'Çıkış',
        style: 'destructive',
        onPress: async () => {
          await logout();
          navigation.replace('Login');
        },
      },
    ]);
  }, [logout, navigation]);

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
