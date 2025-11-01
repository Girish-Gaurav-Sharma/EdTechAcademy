// src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ActivityListScreen from '../screens/ActivityListScreen';
import { Logo } from '../shared/components/Logo/Logo';
import { useTheme, IconButton } from 'react-native-paper';
import { View, useWindowDimensions, StyleSheet } from 'react-native';
import { useThemeToggle } from '../contexts/ThemeContext';
import ProfileAvatar from '../shared/components/Profile/ProfileAvatar';
export type RootStackParamList = {
  ActivityList: undefined; 
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  
  const isWide = width >= 1200;
  const isTablet = width >= 768 && width < 1200;
  const headerPadding = isWide ? 32 : isTablet ? 24 : 12;
  const iconSize = isWide ? 30 : isTablet ? 26 : 24;
  const avatarSize = isWide ? 40 : isTablet ? 36 : 34;
  const logoFontSize = isWide ? 24 : isTablet ? 21 : 19;
  const { isDarkMode, toggleTheme } = useThemeToggle();

  const ThemeToggleButton = () => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <IconButton
        icon={isDarkMode ? 'weather-night' : 'white-balance-sunny'}
        size={iconSize}
        onPress={toggleTheme}
        accessibilityLabel="Toggle theme"
        iconColor={theme.colors.onSurface}
      />
    </View>
  );
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.surface,
            paddingHorizontal: headerPadding,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: theme.colors.outline,
          },
          headerTintColor: theme.colors.onSurface,
          headerTitleStyle: { color: theme.colors.onSurface },
        }}
      >
        <Stack.Screen
          name="ActivityList"
          component={ActivityListScreen}
          options={{
            headerTitle: () => <Logo size={logoFontSize} />,
            headerTitleAlign: 'center', 
            headerLeft: () => <ProfileAvatar size={avatarSize} />,
            headerRight: () => <ThemeToggleButton />,
            headerLeftContainerStyle: { paddingLeft: 8 },
            headerRightContainerStyle: { paddingRight: 8 },
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}