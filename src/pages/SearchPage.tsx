import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function SearchPage({ navigation, route }: { navigation: any, route: any }) {
  // initial search page GUI before search has been made
  const choice = route.params.choice;
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>SEARCH BY {choice}</Text>
      <View>
        <TextInput
          style={styles.searchInput}
          placeholder={"Enter a " + (choice == 'CITY' ? "city" : "country")}
        />
        <TouchableOpacity onPress={() => ""}>
          <View style={styles.searchButton}>
            <Text style={styles.buttonText}>SEARCH</Text>
          </View>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </KeyboardAwareScrollView>
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
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 80,
  },

  searchButton: {
    alignItems: 'center',
    backgroundColor: 'blue',
    marginBottom: 300,
  },

  searchInput: {
    height: 41,
    margin: 11,
    borderWidth: 1,
    padding: 9
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    padding: 15,
    fontFamily: 'Arial'
  }
});