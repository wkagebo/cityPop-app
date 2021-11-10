import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function SearchPage({ route }: { route: any }) {

  // Initialize state variables
  const [searchString, setSearchString] = useState('');
  const [fetching, setFetching] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [result, setResult] = useState<null | { population: number[], name: string[] }[]>(null);

  const choice = route.params.choice;

  // Is called when user pushes the search button
  let searchButtonPressed = () => {

    // The following converts the search string "Country" into its corresponding country code. 
    var countries = require("i18n-iso-countries");
    countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
    const countryCode = countries.getAlpha2Code(searchString, "en");

    const encodedSearchString = encodeURIComponent(searchString);

    let url = '';

    if (choice == 'CITY') {
      url = `https://secure.geonames.org/searchJSON?name_equals=${encodedSearchString}&maxRows=1&username=weknowit&featureCode=PPLA&featureCode=PPLA2&featureCode=PPLC`;
    } else if (choice == 'COUNTRY') {
      url = `http://api.geonames.org/searchJSON?q=${encodedSearchString}&maxRows=3&username=weknowit&featureCode=PPLA&featureCode=PPLA2&featureCode=PPLC&country='${countryCode}'&orderby=population`;
    }
    apiFetch(url);
  }

  // fetches search results from Geonames API
  let apiFetch = (query: string) => {
    setFetching(true);
    fetch(query)
      .then((response) => response.json())
      .then((json) => {
        setFetching(false);
        setFetched(true);
        setResult(json.geonames);

        if (result != null) // if search has happened
          if (!result.length) { // If search returns 0 results
            setFetched(false);
            throw new Error('No results were found :(')
          }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Called when user taps on a city result after searching for a country
  let cityButtonPressed = (cityName: any) => {
    if (result != null) {
      setResult(result.filter(item => item.name === cityName));
    }
    setSearchString(cityName);
  }


  if (!fetching && !fetched) { // display search bar and search button 
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>SEARCH BY {choice}</Text>
        <View>
          <TextInput
            style={styles.searchInput}
            placeholder={"Enter a " + (choice == 'CITY' ? "city" : "country")}
            onChangeText={(searchString) => setSearchString(searchString)}
          />
          <TouchableOpacity onPress={() => searchButtonPressed()}>
            <View style={styles.searchButton}>
              <Text style={styles.buttonText}>SEARCH</Text>
            </View>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </KeyboardAwareScrollView>
    );
  } else if (fetching) { // display loading circle while app is fetching results 
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <ActivityIndicator />
        <StatusBar style="auto" />
      </KeyboardAwareScrollView>
    );
  } else if (fetched && !fetching) { // display search results 
    let output;
    if (result != null) {
      output = result.map((value, keyValue) => {
        if (result.length > 1) { // if country search 
          return (
            <TouchableOpacity style={styles.button} key={keyValue} onPress={() => cityButtonPressed(value.name)}>
              <View>
                <Text style={styles.buttonText}>{value.name}</Text>
              </View>
            </TouchableOpacity>
          )
        } else { // if city search 
          return (
            <View key={keyValue}>
              <Text>Population</Text>
              <Text>{value.population}</Text>
            </View>
          )
        }
      });
    }
    return ( // show final result
      <View style={styles.container}>
        <Text style={styles.title}>{searchString}</Text>
        {output}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 50,
  },

  searchButton: {
    alignItems: 'center',
    backgroundColor: 'green',
    marginBottom: 300,
  },

  searchInput: {
    height: 41,
    margin: 11,
    borderWidth: 1,
    padding: 9
  },

  button: {
    alignItems: 'center',
    backgroundColor: 'red',
    marginBottom: 5,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    padding: 15,
    fontFamily: 'Arial'
  }
});

