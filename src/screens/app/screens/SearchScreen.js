import React, {useEffect, useState} from "react";
import {Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SearchScreen = () => {
    const [id, setId] = useState('');
    const [users, setUsers] = useState([]);
    const [games, setGames] = useState([]);
    const [search, setSearch] = useState('');

    const fetchUsers = async (userToken) => {
        try {
            const response = await fetch('https://www.siomende.fr/hallosserie/nexus-api/users/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userToken
                }
            });
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchGames = async (userToken) => {
        try {
            const response = await fetch('https://www.siomende.fr/hallosserie/nexus-api/games/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userToken
                }
            });
            const data = await response.json();
            setGames(data);
            console.log('Games fetched:', data)
        } catch (error) {
            console.error('Error fetching games:', error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = await AsyncStorage.getItem('id');
                const token = await AsyncStorage.getItem('token');
                if (token && id) {
                    setId(id);
                    fetchUsers(token);
                    fetchGames(token);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
            <TextInput style={{ width: '80%', height: 40, borderColor: 'gray', borderRadius: 10, borderWidth: 1, marginVertical: 20 }}
                          onChangeText={text => setSearch(text)}
                          value={search} />

            <ScrollView style={{ width: '80%' }}>
                {search === '' ? (
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Recherchez des utilisateurs ou des jeux</Text>
                        <Image source={require('../../../../assets/icon.png')} style={{ width: '100%', height: 300, marginBottom: 20 }} />
                    </View>
                ) : (
                    <View>
                        <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10 }}>Résultats de la recherche</Text>

                        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Utilisateurs</Text>
                        {users.filter(user => user.pseudoU.toLowerCase().includes(search.toLowerCase())).filter(user => user.id !== id).map(user => (
                            <TouchableOpacity key={user.id} style={{ marginBottom: 10, backgroundColor: 'lightgray', padding: 10, borderRadius: 10 }}>
                                <Text style={{ fontWeight: 'bold' }}>{user.pseudoU}</Text>
                                <Text>{user.emailU}</Text>
                            </TouchableOpacity>
                        ))}
                        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Jeux</Text>
                        {games.filter(game => game.libelleG.toLowerCase().includes(search.toLowerCase())).map(game => (
                            <TouchableOpacity key={game.id} style={{ marginBottom: 10, backgroundColor: 'lightgray', padding: 10, borderRadius: 10 }}>
                                <Text style={{ fontWeight: 'bold' }}>{game.libelleG}</Text>
                                <Text>{game.descriptionG}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

export default SearchScreen;