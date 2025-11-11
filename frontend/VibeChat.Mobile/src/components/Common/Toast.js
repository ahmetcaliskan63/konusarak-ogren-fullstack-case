import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../styles/colors';
import { spacing, fontSize, borderRadius } from '../../styles/spacing';

export default function Toast({ type = 'info', message, onClose, duration = 4000 }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    if (duration && onClose) {
      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnim, {
            toValue: 50,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start(() => onClose());
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose, fadeAnim, slideAnim]);

  const icons = {
    success: 'checkmark-circle',
    error: 'close-circle',
    warning: 'warning',
    info: 'information-circle',
  };

  const iconColors = {
    success: colors.positive,
    error: colors.negative,
    warning: '#F59E0B',
    info: colors.primary,
  };

  const backgroundColors = {
    success: colors.positiveBackground,
    error: colors.negativeBackground,
    warning: '#451A03',
    info: 'rgba(124, 58, 237, 0.1)',
  };

  const borderColors = {
    success: colors.positive,
    error: colors.negative,
    warning: '#F59E0B',
    info: colors.primary,
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: backgroundColors[type],
          borderLeftColor: borderColors[type],
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <Icon name={icons[type]} size={24} color={iconColors[type]} />
      <Text style={[styles.message, { color: iconColors[type] }]} numberOfLines={3} writingDirection="ltr">
        {message}
      </Text>
      {onClose && (
        <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Icon name="close" size={20} color={iconColors[type]} />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderLeftWidth: 4,
    borderRadius: borderRadius.md,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    gap: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  message: {
    flex: 1,
    fontSize: fontSize.sm,
    fontWeight: '500',
  },
});

