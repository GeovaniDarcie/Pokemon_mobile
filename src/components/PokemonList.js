import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    FlatList,
    Image,
    Pressable,
    ActivityIndicator,
} from 'react-native';

import api from '../services/Api';
import styles from '../styles/styles';

const PokemonList = ({ navigation }) => {
    const [pokemon, setPokemon] = useState([]);

    const [offset, setOffset] = useState(0);

    const [loading, setLoading] = useState(false);

    const limit = 10;

    useEffect(() => fethPokemon(), [offset]);

    const fethPokemon = () => {
        setLoading(true);
        api.get(`?offset=${offset}&limit=${limit}`).then(pokemons => {
            const pokemonList = pokemons.data.results.map((pokemon, pokemonId) => {
                return {
                    name: pokemon.name,
                    id: calcutePokemonId(pokemonId + offset + 1),
                }
            })

            setLoading(false);
            setPokemon((prev) => [...prev, ...pokemonList]);
        }).catch(e => {
            console.error(e);
            setLoading(false);
        })
    }

    const loadPokemon = () => {
        setOffset((prev) => prev + limit);
    }

    const calcutePokemonId = (id) => {
        let pokemonId;
        if (id <= 9) {
            pokemonId = `00${id}`
        } else if (id < 100) {
            pokemonId = `0${id}`
        } else {
            pokemonId = id;
        }

        return pokemonId;
    }

    renderFooter = () => {
        if (!loading) return null;
        return (
          <View>
            <ActivityIndicator />
          </View>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={[styles.container, styles.background]}>
                <FlatList 
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1}}
                    data={pokemon}
                    renderItem={ ({item}) => {
                        return(
                            <Pressable style={[styles.card]} onPress={() =>
                                navigation.navigate('PokemonInformation', { name: item.name, id: item.id })}>
                                <Image
                                    style={styles.pokemonImage}
                                    source={{
                                        uri: `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${item.id}.png`,
                                    }}
                                />
                                <Text style={styles.title}>{item.id}. {item.name}</Text>
                                <Text style={styles.item}></Text>
                            </Pressable>
                        )
                    }}
                    keyExtractor={item => item.id.toString()}
                    onEndReached={() => loadPokemon()}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={() => renderFooter()}
                />
                <Pressable style={styles.favoriteButton} onPress={() => navigation.navigate('FavoriteList')}>
                    <Text style={styles.text}>Ir para os favoritos</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}



export default PokemonList;
