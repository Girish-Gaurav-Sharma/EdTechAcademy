// src/shared/components/Profile/ProfileAvatar.tsx
import React from 'react';
import { Avatar, useTheme } from 'react-native-paper';

type Props = {
  size?: number;
};

// Simple profile icon. No logic/state.
export const ProfileAvatar: React.FC<Props> = ({ size = 36 }) => {
  const { colors } = useTheme();
  return (
    <Avatar.Icon
      size={size}
      icon="account-circle"
      color={colors.onSurface}
      style={{ backgroundColor: 'transparent' }}
    />
  );
};

export default ProfileAvatar;
