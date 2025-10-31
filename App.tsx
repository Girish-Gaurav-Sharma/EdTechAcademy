// App.tsx (Root file)
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Platform } from 'react-native';
import {
  PaperProvider,
  MD3LightTheme as DefaultLightTheme, // Rename the import
  MD3DarkTheme as DefaultDarkTheme    // Rename the import
} from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { FilterProvider } from './src/contexts/FilterContext';
import { ActivityProvider } from './src/contexts/ActivityContext';
import { API_URL } from './src/config/index';
// --- IMPORT THE NEW THEME PROVIDER ---
import { ThemeProvider, useThemeToggle } from './src/contexts/ThemeContext';
const lightTheme = {
  ...DefaultLightTheme, // Start with the default
  colors: {
    ...DefaultLightTheme.colors,
    primary: '#3F51B5', // A professional Indigo
    background: '#F8FAFC', // A very light, clean gray (Slate-50)
    surface: '#FFFFFF', // White cards
    surfaceVariant: '#EEEEEE', // For the theme toggle bar
  },
};

const darkTheme = {
  ...DefaultDarkTheme, // Start with the default
  colors: {
    ...DefaultDarkTheme.colors,
    primary: '#8B5CF6', // A vibrant Violet accent
    background: '#0F172A', // A deep, modern Slate-900
    surface: '#1E293B', // A lighter Slate-800 for cards
    surfaceVariant: '#334155', // For the theme toggle bar (Slate-700)
  },
};
// This is a new helper component.
// It sits inside ThemeProvider so it can access the theme state,
// but outside PaperProvider so it can *pass the theme to it*.
const AppContent = () => {
  // Get the current theme state
  const { isDarkMode } = useThemeToggle();
  console.log(`[CONFIG] API URL is: ${API_URL}`);
  // Select the theme object based on the state
  const theme = isDarkMode ? darkTheme : lightTheme;

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