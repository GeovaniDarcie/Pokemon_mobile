/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Button, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { Node } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';


import PokemonList from './src/components/PokemonList';
import PokemonInformation from './src/components/PokemonInformation';
import FavoriteList from './src/components/FavoriteList';

const Stack = createNativeStackNavigator();

const App: () => Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="PokemonList"
          component={PokemonList}
          options={{ title: 'Pokemons' }}
        /> 
        <Stack.Screen
          name="PokemonInformation"
          component={PokemonInformation}
          options={{ title: 'Dados do Pokemon' }}
        />
        <Stack.Screen
          name="FavoriteList"
          component={FavoriteList}
          options={{ title: 'Pokemons Favoritos' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
