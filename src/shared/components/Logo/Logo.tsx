// src/shared/components/Logo/Logo.tsx
import React from 'react';
import { Avatar } from 'react-native-paper';

// A simple, minimalist logo: "EA" for "EdTech Academy"
export const Logo = () => {
  return <Avatar.Text size={45} label="EA" />;
};