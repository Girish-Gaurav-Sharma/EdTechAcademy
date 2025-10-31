// src/shared/components/SectionHeader/SectionHeader.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Divider, useTheme } from 'react-native-paper';

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  divider?: boolean;
};

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, divider = true }) => {
  const theme = useTheme();
  return (
    <View style={styles.container} accessibilityRole="header">
      <Text
        variant="labelLarge"
        style={[styles.title, { color: theme.colors.onSurfaceVariant }]}
      >
        {title.toUpperCase()}
      </Text>
      {subtitle ? (
        <Text variant="titleSmall" style={[styles.subtitle, { color: theme.colors.onSurface }]}> 
          {subtitle}
        </Text>
      ) : null}
      {divider ? <Divider style={[styles.divider, { backgroundColor: theme.colors.outline }]} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginHorizontal: 16,
    gap: 8,
  },
  title: {
    letterSpacing: 1,
    fontWeight: '600',
  },
  subtitle: {},
  divider: {
    marginTop: 4,
  },
});

export default SectionHeader;
