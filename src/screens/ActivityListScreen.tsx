// src/screens/ActivityListScreen.tsx
import React, { useState } from 'react';
import { StyleSheet, FlatList, View, Platform, useWindowDimensions } from 'react-native';
import { Text, ActivityIndicator, useTheme, Button, Snackbar, Portal } from 'react-native-paper';
import ActivityCard from '../features/activities/components/ActivityCard';
import { Activity } from '../types/activity.types';
import { useActivities } from '../contexts/ActivityContext';
import FilterBar from '../features/filters/components/FilterBar/FilterBar';
import SectionHeader from '../shared/components/SectionHeader';
import { SkeletonCard } from '../features/activities/components/SkeletonCard/SkeletonCard';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFilters } from '../contexts/FilterContext'; 


export default function ActivityListScreen() {
  const { filteredActivities, total, loading , isInitialLoad, isLoadingMore, hasMore, loadMore } = useActivities();

  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === 'web';
  const { setSearchQuery, setSelectedType } = useFilters(); 
  const theme = useTheme();
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');
  const [snackbarId, setSnackbarId] = useState(0); 
  const getNumColumns = () => {
    if (!isWeb) {
      return 1; 
    }
    if (width < 768) {
      return 1; 
    }
    if (width < 1200) {
      return 2;
    }
    return 3;
  };

  const numColumns = getNumColumns();
  


  const renderActivityCard = ({ item }: { item: Activity }) => {
    const handlePress = (activity: Activity) => {
      console.log('Pressed:', activity.title);
    };

    const handleActionPress = (activity: Activity) => {
      setSnackbarText('Feature not implemented');
      setSnackbarId((k) => k + 1);
      setSnackbarVisible(true);
    };
    
    const cardStyle = {
      flex: 1,
    };

    return (
      <View style={cardStyle}>
        <ActivityCard activity={item} onPress={handlePress} onActionPress={handleActionPress} />
      </View>
    );
  };

if (loading) {
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={[1, 2, 3]} 
        keyExtractor={(item) => item.toString()}
        numColumns={numColumns}
        key={numColumns} 
        renderItem={() => (
          <View style={{ flex: 1 }}>
            <SkeletonCard />
          </View>
        )}
        contentContainerStyle={[styles.listContent, styles.listHorizontalPadding]}
        ListHeaderComponent={
          <>
            <SectionHeader title="Your Learning Activities" />
            <FilterBar />
            {isInitialLoad && (
                <Text style={[styles.coldStartMessage, { color: theme.colors.error }]}>
                  Please wait 30-60s. The free backend server is coldstarting.....
                </Text>
              )}
            <Text variant="titleMedium" style={styles.resultsHeader}>
              Results ({filteredActivities.length} of {total})
            </Text>
          </>
        }
      />
      <Portal>
        <Snackbar
          key={snackbarId}
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={2000}
          style={isWeb ? styles.webSnackbar : undefined}
        >
          {snackbarText}
        </Snackbar>
      </Portal>
    </View>
  );
}

  return (
  <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={filteredActivities}
        renderItem={renderActivityCard}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        key={numColumns}
        contentContainerStyle={[styles.listContent, styles.listHorizontalPadding]}
        ListHeaderComponent={
          <>
            <SectionHeader title="Your Learning Activities" />
            <FilterBar />
            <Text variant="titleMedium" style={styles.resultsHeader}>
              Results ({filteredActivities.length} of {total})
            </Text>
          </>
        }
        ListFooterComponent={
          hasMore ? (
            <View style={styles.footer}>
              {isLoadingMore ? (
                <ActivityIndicator />
              ) : (
                <Button mode="outlined" onPress={loadMore}>
                  Load more
                </Button>
              )}
            </View>
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.center}>
            <MaterialCommunityIcons
              name="magnify-remove-outline"
              size={64}
              color={theme.colors.onSurfaceDisabled}
            />
            <Text variant="titleMedium" style={styles.emptyTitle}>
              No activities found
            </Text>
            <Text variant="bodyMedium" style={styles.emptyBody}>
              Try adjusting your search or filters.
            </Text>
            <Button
              mode="text"
              onPress={() => {
                setSearchQuery('');
                setSelectedType('all');
              }}
              style={styles.emptyButton}
            >
              Clear Filters
            </Button>
          </View>
        }
      />
      <Portal>
        <Snackbar
          key={snackbarId}
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={2000}
          style={isWeb ? styles.webSnackbar : undefined}
        >
          {snackbarText}
        </Snackbar>
      </Portal>
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
  listHorizontalPadding: {
    paddingHorizontal: 8,
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
  coldStartMessage: { 
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 17,
    marginHorizontal: 16,
    marginTop: 8,
  },
  emptyTitle: {
    marginTop: 16,
  },
  emptyBody: {
    marginTop: 4,
  },
  emptyButton: {
    marginTop: 16,
  },
  footer: {
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  webSnackbar: {
    // @ts-ignore: RN Web supports 'position: fixed'
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
  },
});