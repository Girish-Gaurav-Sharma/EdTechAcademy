// src/features/filters/components/FilterBar/FilterBar.tsx
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Searchbar, Text, useTheme } from 'react-native-paper';
import BrandedChip from '../../../../shared/components/Chip/BrandedChip';
import { useFilters } from '../../../../contexts/FilterContext';
import { ActivityType } from '../../../../types/activity.types';
import { formatActivityTypeLabel } from '../../../../utils/formatters';

const filterTypes: (ActivityType | 'all')[] = [
  'all',
  'online-class',
  'assignment',
  'quiz',
  'discussion',
];


export default function FilterBar() {
  const { filters, setSearchQuery, setSelectedType, setFavoriteFilter } = useFilters();
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {/* 1. The Search Bar */}
      <Searchbar
        placeholder="Search activities..."
        onChangeText={setSearchQuery}
        value={filters.searchQuery}
        style={[styles.searchbar, { backgroundColor: colors.surface }]}
      />

      {/* 2. The Filter Chips */}
      <Text variant="labelLarge" style={styles.filterTitle}>
        Filter by Type
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {filterTypes.map((type) => (
          <BrandedChip
            key={type}
            selected={filters.selectedType === type}
            onPress={() => setSelectedType(type)}
            style={styles.chip}
            testID={`filter-chip-${type}`}
          >
            {formatActivityTypeLabel(type)}
          </BrandedChip>
        ))}
      </ScrollView>
      <Text variant="labelLarge" style={[styles.filterTitle, { marginTop: 8 }]}>Favorites</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {(['all', 'fav', 'not-fav'] as const).map((fav) => (
          <BrandedChip
            key={fav}
            selected={filters.favoriteFilter === fav}
            onPress={() => setFavoriteFilter(fav)}
            style={styles.chip}
            testID={`favorite-chip-${fav}`}
          >
            {fav === 'all' ? 'All' : fav === 'fav' ? 'Favorites' : 'Not favorites'}
          </BrandedChip>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchbar: {
    marginBottom: 12,
  },
  filterTitle: {
    marginBottom: 8,
  },
  chip: {
    marginRight: 8,
  },
});