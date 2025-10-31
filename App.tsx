// App.tsx (Root file)
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Platform } from 'react-native';
import { 
  PaperProvider, 
  MD3LightTheme, // Import Light Theme
  MD3DarkTheme   // Import Dark Theme
} from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { FilterProvider } from './src/contexts/FilterContext';
import { ActivityProvider } from './src/contexts/ActivityContext';

// --- IMPORT THE NEW THEME PROVIDER ---
import { ThemeProvider, useThemeToggle } from './src/contexts/ThemeContext';

// This is a new helper component.
// It sits inside ThemeProvider so it can access the theme state,
// but outside PaperProvider so it can *pass the theme to it*.
const AppContent = () => {
  // Get the current theme state
  const { isDarkMode } = useThemeToggle();

  // Select the theme object based on the state
  const theme = isDarkMode ? MD3DarkTheme : MD3LightTheme;

  return (
    <PaperProvider theme={theme}>
      {/* Change status bar color based on theme */}
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <FilterProvider>
        <ActivityProvider>
          <AppNavigator />
        </ActivityProvider>
      </FilterProvider>
    </PaperProvider>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.root}>
        {/* Wrap the entire app in ThemeProvider */}
        <ThemeProvider> 
          <AppContent />
        </ThemeProvider>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // @ts-ignore: '100vh' is a valid web-only style for height
    height: Platform.OS === 'web' ? '100vh' : '100%',
    // @ts-ignore: 'overflowY' is a valid web-only style
    overflowY: Platform.OS === 'web' ? 'auto' : 'visible',
  },
});