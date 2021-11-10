import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Homepage GUI 
export default function HomePage({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CityPop</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Search', { choice: 'CITY' })}>
        <View >
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
    alignItems: 'center'
  },

  title: {
    //flex: 1,
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 80,
    marginBottom: 100
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#5DADE2',
    marginBottom: 5,
    width: 350,
    height: 50,
    borderWidth: 2,
    borderColor: '#2874A6'
  },

  buttonText: {
    color: '#154360',
    fontSize: 15,
    padding: 15,
    fontFamily: 'Arial',
    fontWeight: 'bold'
  }
});