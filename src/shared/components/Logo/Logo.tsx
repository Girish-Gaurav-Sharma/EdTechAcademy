// src/shared/components/Logo/Logo.tsx
import React from 'react';
import { useTheme, Text } from 'react-native-paper';

// Wordmark logo: "EdTech Academy" with brand accent on "EdTech"
type Props = {
  size?: number; // optional font size for responsiveness
};

export const Logo: React.FC<Props> = ({ size }) => {
  const { colors } = useTheme();
  return (
    <Text
      variant="titleLarge"
      style={{
        fontWeight: '700',
        color: colors.onSurface,
        letterSpacing: 0.2,
        ...(size ? { fontSize: size, lineHeight: size ? size + 4 : undefined } : null),
      }}
    >
      <Text style={{ color: colors.primary }}>EdTech</Text> Academy
    </Text>
  );
};