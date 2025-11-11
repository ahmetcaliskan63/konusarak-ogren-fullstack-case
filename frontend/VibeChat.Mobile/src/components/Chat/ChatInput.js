import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../styles/colors';
import { spacing, fontSize, borderRadius } from '../../styles/spacing';

export default function ChatInput({ onSendMessage, disabled }) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || disabled) return;

    onSendMessage(trimmedMessage);
    setMessage('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Mesajınızı yazın..."
            placeholderTextColor={colors.textMuted}
            multiline
            maxLength={500}
            editable={!disabled}
            writingDirection="ltr"
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              (!message.trim() || disabled) && styles.sendButtonDisabled,
            ]}
            onPress={handleSend}
            disabled={!message.trim() || disabled}>
            <Icon
              name="send"
              size={20}
              color={message.trim() && !disabled ? colors.primary : colors.textMuted}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: fontSize.md,
    color: colors.text,
    maxHeight: 100,
    marginRight: spacing.md,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});

