// src/features/filters/components/FilterBar/FilterBar.tsx
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Searchbar, Chip, Text } from 'react-native-paper';
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

  return (
    <View style={styles.container}>
      {/* 1. The Search Bar */}
      <Searchbar
        placeholder="Search activities..."
        onChangeText={setSearchQuery} // Set state on change
        value={filters.searchQuery}  // Controlled component
        style={styles.searchbar}
      />

      {/* 2. The Filter Chips */}
      <Text variant="labelLarge" style={styles.filterTitle}>
        Filter by Type
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {filterTypes.map((type) => (
          <Chip
            key={type}
            mode="flat"
            // 'selected' controls the visual highlight
            selected={filters.selectedType === type} 
            onPress={() => setSelectedType(type)} // Set state on press
            style={styles.chip}
            testID={`filter-chip-${type}`}
          >
            {formatActivityTypeLabel(type)}
          </Chip>
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