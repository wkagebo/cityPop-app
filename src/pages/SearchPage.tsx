import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function SearchPage({ navigation, route }: { navigation: any, route: any }) {

  // Initialize state variables
  const [searchString, setSearchString] = useState('');
  const [fetching, setFetching] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [result, setResult] = useState(null);

  /*
    var countries = require("i18n-iso-countries");
    countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
    countries.getAlpha2Code("United States of America", "en")
  */

  // Is called when user pushes the search button
  let searchButtonPressed = () => {
    const encodedSearchString = encodeURIComponent(searchString);
    const encodedCountry = encodeURIComponent(searchString);

    let url = ''; // initialiserade inte först, då gav fetch(url) error. 

    if (choice == 'CITY') {
      url = `http://api.geonames.org/searchJSON?name_equals=${encodedSearchString}&maxRows=1&username=weknowit&featureCode=PPLC`;
    } else if (choice == 'COUNTRY') {
      url = `http://api.geonames.org/searchJSON?q=${encodedSearchString}&country=${encodedCountry}&featureCode=PPL&maxRows=3&username=weknowit&orderby=population`;
    }

    // Fetch request from Geonames API
    setFetching(true);
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setFetching(false);
        setFetched(true);
        setResult(json.geonames);
      })
      .catch((error) => {
        console.error(error);
      });
  }



  const choice = route.params.choice;

  // initial search page GUI before search has been made
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>SEARCH BY {choice}</Text>
      <View>
        <TextInput
          style={styles.searchInput}
          placeholder={"Enter a " + (choice == 'CITY' ? "city" : "country")}
          onChangeText={() => setSearchString(searchString)}  // send user input to searchString variable
        />
        <TouchableOpacity onPress={() => searchButtonPressed}>
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