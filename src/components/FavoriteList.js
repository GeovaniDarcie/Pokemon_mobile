import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    Text,
    View,
    Image,
    Pressable,
    Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from '../styles/styles';

const FavoriteList = ({ navigation }) => {
    const [pokemons, setPokemons] = useState(['']);
    useEffect(() => buscarPokemon(), []);

    const buscarPokemon = async () => {
        try {
            const value = await AsyncStorage.getItem('fav_pokemons');
            if (value !== null) {
                setPokemons(JSON.parse(value));

                if (value.length === 2) {
                    Alert.alert('Ops...', 'Adicione um pokemon a lista de favoritos primeiro!');
                    navigation.navigate('PokemonList');
                }
            } 
        } catch (e) {
            console.error(e);
        }
    }

    const removerFavorito = async (name) => {
        try {
          const value = await AsyncStorage.getItem('fav_pokemons');
          const pokemons_db = JSON.parse(value);
          const pokemon_no_delete = pokemons_db.filter(pok => pok.name !== name);
          setPokemons(pokemon_no_delete);
          const new_db = JSON.stringify(pokemon_no_delete);
          await AsyncStorage.setItem('fav_pokemons', new_db);
        } catch(e) {
          console.error(e);
        }
    }

    return (
        <ScrollView>
            <View style={[styles.container, styles.background]}>
                <View style={{ flex: 1 }}>
                    {pokemons.map((pokemon, index) => {
                        return (
                            <View style={styles.card} key={index}>
                                <View style={styles.colunaDados}>
                                    <Image
                                        style={styles.pokemonImage}
                                        source={{
                                            uri: `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${pokemon.id}.png`,
                                        }}
                                    />
                                    <Text style={styles.title}>Nome: {pokemon.name}</Text>
                                    <Text style={styles.pokemonItem}>Height: {pokemon.height} cm</Text>
                                    <Text style={styles.pokemonItem}>Weight: {pokemon.weight} g</Text>
                                    <Text style={styles.pokemonItem}>Abilitie 1: {pokemon.abilitie1}</Text>
                                    <Text style={styles.pokemonItem}>Abilitie 2: {pokemon.abilitie2}</Text>
                                    <Pressable style={styles.favoriteButton} onPress={() => removerFavorito(pokemon.name)}>
                                        <Text style={styles.text}>Retirar Favoritos</Text>
                                    </Pressable>
                                </View>
                            </View>
                        )
                    })}
                </View>
            </View>
        </ScrollView>
    )
}

export default FavoriteList;