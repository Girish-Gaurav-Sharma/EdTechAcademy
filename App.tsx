// App.tsx (Root file)
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Platform } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { FilterProvider } from './src/contexts/FilterContext';
import { ActivityProvider } from './src/contexts/ActivityContext';
import { API_URL } from './src/config/index';
// --- IMPORT THE NEW THEME PROVIDER ---
import { ThemeProvider, useThemeToggle } from './src/contexts/ThemeContext';
import { lightTheme, darkTheme } from './src/config/theme';
import { useEffect } from 'react';
// This is a new helper component.
// It sits inside ThemeProvider so it can access the theme state,
// but outside PaperProvider so it can *pass the theme to it*.
const AppContent = () => {
  // Get the current theme state
  const { isDarkMode } = useThemeToggle();
  console.log(`[CONFIG] API URL is: ${API_URL}`);
  // Select the theme object based on the state
  const theme = isDarkMode ? darkTheme : lightTheme;

  // Keep web page title aligned with brand
  useEffect(() => {
    if (Platform.OS === 'web') {
      document.title = 'EdTech Academy';
    }
  }, []);

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