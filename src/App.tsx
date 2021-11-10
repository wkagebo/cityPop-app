import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';

const Stack = createNativeStackNavigator();

// Main function, which navigates between the app screens. 
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerTitle: '' }}
        initialRouteName="CityPop"
      >
        <Stack.Screen name="CityPop" options={{ headerTitle: 'CityPop', headerShown: false }} component={HomePage} />
        <Stack.Screen name="Search" component={SearchPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}




