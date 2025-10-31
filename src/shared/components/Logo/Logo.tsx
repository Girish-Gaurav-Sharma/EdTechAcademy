// src/shared/components/Logo/Logo.tsx
import React from 'react';
import { Avatar, useTheme } from 'react-native-paper';

// A simple, minimalist logo: "EA" for "EdTech Academy"
export const Logo = () => {
  const { colors } = useTheme();
  return (
    <Avatar.Text
      size={45}
      label="EA"
      style={{ backgroundColor: colors.primary }}
      color={colors.onPrimary}
    />
  );
};