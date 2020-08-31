import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AppLoading} from 'expo';
import * as Font from 'expo-font';
import {StyleProvider} from 'native-base';
import getTheme from './native-base-theme/components';
import AsyncStorage from '@react-native-community/async-storage';

import material from './native-base-theme/variables/material';
import light from './native-base-theme/variables/light';
import dark from './native-base-theme/variables/dark';
import MainScreen from './src/screens/MainScreen.jsx';
import SourceScreen from './src/screens/SourceScreen.jsx';
import CategoryNewsScreen from './src/screens/CategoryNewsScreen.jsx';
import {ThemeProvider, ThemeContext} from './src/context/ThemeContext';

import DatabaseSeeder from './src/database/seed/DatabaseSeeder';
import * as API from './src/api/API';


const Stack = createStackNavigator();

export default function App() {

  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState('light');
  // onMount
  useEffect(() => {

    (async () =>{
      setLoading(true);
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
      });

      await DatabaseSeeder.seed();
      // await AsyncStorage.setItem('theme', 'dark');
      // let theme = 'dark';
      // setTheme(theme);
      setLoading(false);
    })();

  }, []);

  if (loading){
    return <AppLoading />
  }

  return (
    <ThemeProvider value={{theme, setTheme}}>
      <StyleProvider style={theme === 'light'? getTheme(light):getTheme(dark)}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Source" component={SourceScreen}
                        options={({route}) => ({
                          title: route.params.source.name,
                          headerShown: true
                          })} />
          <Stack.Screen name="Category" component={CategoryNewsScreen}
                        options={({route}) => ({
                          title: route.params.category.name,
                          headerShown: true
                          })} />
        </Stack.Navigator>
      </NavigationContainer>  
    </StyleProvider>
    </ThemeProvider>
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
