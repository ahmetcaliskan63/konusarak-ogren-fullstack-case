import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';
import { spacing, borderRadius, fontSize } from '../../styles/spacing';

export default function Input({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  multiline = false,
  numberOfLines = 1,
  maxLength,
  style,
  ...props
}) {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          multiline && styles.multiline,
          error && styles.inputError,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        multiline={multiline}
        numberOfLines={numberOfLines}
        maxLength={maxLength}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: '500',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: fontSize.md,
    color: colors.text,
    minHeight: 48,
  },
  multiline: {
    paddingTop: spacing.md,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: colors.negative,
  },
  errorText: {
    fontSize: fontSize.xs,
    color: colors.negative,
    marginTop: spacing.xs,
  },
});

