import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useChat } from '../hooks/useChat';
import { useNotification } from '../hooks/useNotification';
import Button from '../components/Common/Button';
import Input from '../components/Common/Input';
import { colors } from '../styles/colors';
import { spacing, fontSize, borderRadius } from '../styles/spacing';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const { login, loading } = useChat();
  const notification = useNotification();

  const handleLogin = async () => {
    const trimmedUsername = username.trim();

    if (!trimmedUsername) {
      notification.warning('Lütfen bir kullanıcı adı girin');
      return;
    }

    if (trimmedUsername.length < 3) {
      notification.warning('Kullanıcı adı en az 3 karakter olmalıdır');
      return;
    }

    try {
      await login(trimmedUsername);
      notification.success(`Hoş geldin, ${trimmedUsername}!`);
      navigation.replace('Chat');
    } catch (error) {
      notification.error(error.message || 'Giriş yapılamadı. Lütfen tekrar deneyin.');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>VibeChat</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>MVP</Text>
            </View>
          </View>

          <Text style={styles.subtitle}>
            AI destekli duygu analizi ile sohbet et
          </Text>

          <View style={styles.formContainer}>
            <Input
              label="Kullanıcı Adı (Rumuz)"
              value={username}
              onChangeText={setUsername}
              placeholder="Kullanıcı adınızı girin"
              autoCapitalize="none"
              autoCorrect={false}
              maxLength={20}
              editable={!loading}
            />

            <Button
              title="Giriş Yap"
              onPress={handleLogin}
              loading={loading}
              disabled={loading}
              style={styles.loginButton}
            />
          </View>

          <Text style={styles.footer}>
            Giriş yaparak mesajlarınızın AI tarafından analiz edilmesini kabul
            edersiniz.
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: fontSize.xxl + 8,
    fontWeight: '700',
    color: colors.text,
    marginRight: spacing.md,
  },
  badge: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.lg,
  },
  badgeText: {
    fontSize: fontSize.xs,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xxl,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
  },
  loginButton: {
    marginTop: spacing.xl,
  },
  footer: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.xxl,
    maxWidth: 300,
  },
});
