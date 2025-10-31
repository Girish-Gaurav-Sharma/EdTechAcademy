// src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ActivityListScreen from '../screens/ActivityListScreen';
import { Logo } from '../shared/components/Logo/Logo';
// Define the type for your stack parameters
export type RootStackParamList = {
  ActivityList: undefined; // No parameters expected for this screen
  // Add other screens here later, e.g.: ActivityDetail: { id: string }
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    // NavigationContainer must wrap your entire navigation structure
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ActivityList"
          component={ActivityListScreen}
          options={{
            headerTitle: () => <Logo />,
            headerTitleAlign: 'center', // Center the logo
          }} // This will be the header title
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}