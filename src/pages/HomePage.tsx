import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';

// Homepage GUI 
export default function HomePage({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CityPop</Text>

      <TouchableOpacity onPress={() => navigation.navigate('Search', { choice: 'CITY' })}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>SEARCH BY CITY</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Search', { choice: 'COUNTRY' })}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>SEARCH BY COUNTRY</Text>
        </View>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    flex: 1,
    fontSize: 50,
    fontWeight: 'bold',
    marginTop: 80,
  },

  button: {
    alignItems: 'center',
    backgroundColor: 'red',
    marginBottom: 50,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    padding: 15,
    fontFamily: 'Arial'
  }
});