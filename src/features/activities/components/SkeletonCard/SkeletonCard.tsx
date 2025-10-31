// src/features/activities/components/SkeletonCard/SkeletonCard.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, useTheme } from 'react-native-paper';

// A simple, non-animated skeleton shape
const SkeletonBlock = ({ style }: { style: any }) => {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.skeleton,
        { backgroundColor: colors.surfaceVariant }, // Use a theme color
        style,
      ]}
    />
  );
};

export const SkeletonCard = () => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        {/* Header: Icon + Title/Subtitle */}
        <View style={styles.header}>
          <SkeletonBlock style={styles.icon} />
          <View style={{ flex: 1 }}>
            <SkeletonBlock style={{ height: 20, width: '70%' }} />
            <SkeletonBlock
              style={{ height: 16, width: '40%', marginTop: 8 }}
            />
          </View>
        </View>
        {/* Content: Chips */}
        <View style={styles.chipContainer}>
          <SkeletonBlock style={styles.chip} />
          <SkeletonBlock style={styles.chip} />
        </View>
        {/* Action Button */}
        <View style={styles.actions}>
          <SkeletonBlock style={styles.button} />
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  skeleton: {
    borderRadius: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20, // Make it round
    marginRight: 12,
  },
  chipContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  chip: {
    height: 32,
    width: 80,
    marginRight: 8,
  },
  actions: {
    alignItems: 'flex-end',
  },
  button: {
    height: 36,
    width: 100,
  },
});