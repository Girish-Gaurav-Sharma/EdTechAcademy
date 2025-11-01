// __tests__/features/filters/components/FilterBar.test.tsx
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { PaperProvider } from 'react-native-paper';

import FilterBar from '../../../../src/features/filters/components/FilterBar/FilterBar';
import { FilterProvider } from '../../../../src/contexts/FilterContext';

const mockIcon = (props: any) => <></>;
const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <PaperProvider settings={{ icon: mockIcon }}>
      <FilterProvider>
        {component}
      </FilterProvider>
    </PaperProvider>
  );
};

describe('FilterBar', () => {
  test('search bar updates value on change', () => {
    // 1. Render the component with its providers
    renderWithProviders(<FilterBar />);

    // 2. Find the search bar by its placeholder text
    const searchInput = screen.getByPlaceholderText('Search activities...');

    // 3. Check its initial value (empty)
    expect(searchInput.props.value).toBe('');

    // 4. Simulate a user typing "python" into it
    fireEvent.changeText(searchInput, 'python');

    // 5. Check if the component's state (from the hook) updated
    // and fed the new value back to the search bar prop
    expect(searchInput.props.value).toBe('python');
  });

  test('clicking a chip updates its selected state', () => {
    renderWithProviders(<FilterBar />);

    // 1. Find the "All" chip (it's selected by default)
    const allChip = screen.getByTestId('filter-chip-all');
    expect(allChip.props.accessibilityState.selected).toBe(true);

    // 2. Find the "Quiz" chip (it's not selected)
    const quizChip = screen.getByTestId('filter-chip-quiz');
    expect(quizChip.props.accessibilityState.selected).toBe(false);

    // 3. Simulate clicking the "Quiz" chip
    fireEvent.press(quizChip);

    // 4. Re-check the chips
    // The "Quiz" chip should now be selected
    expect(quizChip.props.accessibilityState.selected).toBe(true);
    // The "All" chip should no longer be selected
    expect(allChip.props.accessibilityState.selected).toBe(false);
  });
});