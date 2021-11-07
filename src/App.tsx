import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
        initialRouteName="CityPop"
      >
        <Stack.Screen name="CityPop" component={HomePage} />
        <Stack.Screen name="Search" component={SearchPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



