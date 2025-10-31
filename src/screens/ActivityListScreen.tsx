// src/screens/ActivityListScreen.tsx
import React from 'react';
// --- IMPORT Platform and useWindowDimensions ---
import { StyleSheet, FlatList, View, Platform, useWindowDimensions } from 'react-native';
import { Text, ActivityIndicator, Switch, useTheme } from 'react-native-paper';
import ActivityCard from '../features/activities/components/ActivityCard';
import { Activity } from '../types/activity.types';
import { useActivities } from '../contexts/ActivityContext';
import FilterBar from '../features/filters/components/FilterBar/FilterBar';
import { useThemeToggle } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useThemeToggle();
  const theme = useTheme(); // Get colors from Paper

  return (
    <View style={[styles.themeToggleContainer, { backgroundColor: theme.colors.surfaceVariant }]}>
      <Text variant="labelLarge" style={{ color: theme.colors.onSurfaceVariant }}>
        Dark Mode
      </Text>
      <Switch value={isDarkMode} onValueChange={toggleTheme} />
    </View>
  );
};

export default function ActivityListScreen() {
  const { filteredActivities, loading } = useActivities();

  // --- START: RESPONSIVENESS LOGIC ---
  const { width } = useWindowDimensions(); // Get screen width
  const isWeb = Platform.OS === 'web';

  // Determine the number of columns based on width
  const getNumColumns = () => {
    if (!isWeb) {
      return 1; // Always 1 column on native (iOS/Android)
    }
    if (width < 768) {
      return 1; // 1 column for small browser windows
    }
    if (width < 1200) {
      return 2; // 2 columns for medium browser windows (tablet)
    }
    return 3; // 3 columns for large browser windows (desktop)
  };

  const numColumns = getNumColumns();
  // --- END: RESPONSIVENESS LOGIC ---


  const renderActivityCard = ({ item }: { item: Activity }) => {
    const handlePress = (activity: Activity) => {
      console.log('Pressed:', activity.title);
    };
    
    // This style is important for multi-column layout
    // It makes each card take up its share of the space
    const cardStyle = {
      flex: 1,
    };

    return (
      <View style={cardStyle}>
        <ActivityCard activity={item} onPress={handlePress} />
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredActivities}
        renderItem={renderActivityCard}
        keyExtractor={(item) => item.id}
        
        // --- ADD THESE TWO PROPS ---
        numColumns={numColumns} // Tell the FlatList how many columns to render
        key={numColumns}        // CRITICAL: This forces a re-render when numColumns changes
        // -----------------------------

        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            <ThemeToggle />
            <Text variant="headlineMedium" style={styles.header}>
              Your Learning Activities
            </Text>
            <FilterBar />
            <Text variant="titleMedium" style={styles.resultsHeader}>
              Results
            </Text>
          </>
        }
        ListEmptyComponent={
          <View style={styles.center}>
            <Text variant="titleMedium">No activities found.</Text>
            <Text variant="bodyMedium">Try adjusting your filters.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 16,
    flexGrow: 1,
  },
  header: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  resultsHeader: {
    marginTop: 16,
    marginBottom: 8,
    marginHorizontal: 16,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: 50,
  },
  themeToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
});