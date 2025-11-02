// App.tsx (Root file)
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Platform } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { FilterProvider } from './src/contexts/FilterContext';
import { ActivityProvider } from './src/contexts/ActivityContext';
import { ThemeProvider, useThemeToggle } from './src/contexts/ThemeContext';
import { lightTheme, darkTheme } from './src/config/theme';
import { useEffect } from 'react';


const AppContent = () => {
  
  const { isDarkMode } = useThemeToggle();
  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    if (Platform.OS === 'web') {
      document.title = 'EdTech Academy';
    }
  }, []);

  return (
    <PaperProvider theme={theme}>
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
    overflowY: Platform.OS === 'web' ? 'scroll' : 'visible',
  },
});