import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, Image, View, Pressable, Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from '../styles/styles';
import api from '../services/Api';


const PokemonInformation = ({ route, navigation }) => {
    const [pokemon, setPokemon] = useState({
        type: ['']
    });

    useEffect(() => fethPokemon(`${route.params.name}`), []);
    const fethPokemon = (name) => {
        const typeList = [];
        const abilitiesList = [];

        api.get(`${name}`).then((response) => {
            response.data.types.map(response => typeList.push(response.type.name));
            response.data.abilities.map(response => abilitiesList.push(response.ability.name));
            
            setPokemon({
                id: route.params.id,
                name: route.params.name, 
                type: typeList, 
                height: response.data.height,
                weight: response.data.weight,
                abilitie1: abilitiesList[0],
                abilitie2: abilitiesList[1],
            });

        })
    }

    const pokemonName = route.params.name.charAt(0).toUpperCase() + route.params.name.slice(1);

    const guardarPokemon = async (value) => {
        try {
            const pokemon_db = await AsyncStorage.getItem('fav_pokemons');
            const jsonValue = JSON.stringify([value])

            if (pokemon_db === null) {
                await AsyncStorage.setItem('fav_pokemons', jsonValue);
            } else {

                const pokemon_obj = pokemon_db != null ? JSON.parse(pokemon_db) : null;
                const findPokemon = pokemon_obj.find(pok => pok.name === value.name);

                if (findPokemon) {
                    Alert.alert('Ops...', 'Esse pokemon já foi inserido aos favoritos');
                } else {
                    pokemon_obj.push(value);
                    const new_db = JSON.stringify(pokemon_obj)
                    await AsyncStorage.setItem('fav_pokemons', new_db);
    
                    Alert.alert('Sucesso','Pokemon adicionado aos favoritos!');
                    
                }
            }
        } catch (e) {
          console.error(e)
        }
    }

    return (
        <SafeAreaView style={[styles.card, styles[pokemon.type[0]]]}>
            <Text style={styles.title}>{pokemonName}</Text>
            <Image
                style={styles.pokemonImage}
                source={{
                    uri: `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${route.params.id}.png`,
                }}
            />
            <Text style={styles.item}>{pokemon.type.join(' | ')}</Text>
            <View style={styles.colunaDados}>
                <Text style={styles.pokemonItem}>Height: {pokemon.height} cm</Text>
                <Text style={styles.pokemonItem}>Weight: {pokemon.weight} g</Text>
                <Text style={styles.pokemonItem}>Abilitie 1: {pokemon.abilitie1}</Text>
                <Text style={styles.pokemonItem}>Abilitie 2: {pokemon.abilitie2}</Text>
            </View>
            <Pressable style={styles.favoriteButton} onPress={() => guardarPokemon(pokemon)}>
                <Text style={styles.text}>Favoritar Pokemon</Text>
            </Pressable>
        </SafeAreaView>
    )
}

export default PokemonInformation;