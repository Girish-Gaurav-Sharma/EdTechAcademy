// src/features/filters/components/FilterBar/FilterBar.tsx
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Searchbar, Text, useTheme } from 'react-native-paper';
import BrandedChip from '../../../../shared/components/Chip/BrandedChip';
import { useFilters } from '../../../../contexts/FilterContext'; // Adjust path
import { ActivityType } from '../../../../types/activity.types'; // Adjust path
import { formatActivityTypeLabel } from '../../../../utils/formatters'; // Adjust path
// Define the filter options
const filterTypes: (ActivityType | 'all')[] = [
  'all',
  'online-class',
  'assignment',
  'quiz',
  'discussion',
];


export default function FilterBar() {
  // Get the state and setters from our context
  const { filters, setSearchQuery, setSelectedType } = useFilters();
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {/* 1. The Search Bar */}
      <Searchbar
        placeholder="Search activities..."
        onChangeText={setSearchQuery} // Set state on change
        value={filters.searchQuery}  // Controlled component
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
    marginLeft: 4,
  },
  chip: {
    marginRight: 8,
  },
});