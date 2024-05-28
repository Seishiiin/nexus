import React, { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

import {SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";

const HomeScreen = () => {
    const [token, setToken] = useState('');
    const [id, setId] = useState('');
    const [user, setUser] = useState({
        id: '',
        nomU: '',
        prenomU: '',
        pseudoU: '',
        descriptionU: '',
        dateNaissanceU: '',
        emailU: '',
        dateInscriptionU: '',
        roleU: '',
        friends: [],
        games: []
    });
    const [games, setGames] = useState([]);
    const [users, setUsers] = useState([]);

    const fetchUser = async (userId, userToken) => {
        try {
            const response = await fetch(`https://www.siomende.fr/hallosserie/nexus-api/users/userbyid?id=${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userToken
                }
            });
            const data = await response.json();
            setUser({
                id: data.id,
                nomU: data.nomU,
                prenomU: data.prenomU,
                pseudoU: data.pseudoU,
                descriptionU: data.descriptionU,
                dateNaissanceU: data.dateNaissanceU,
                emailU: data.emailU,
                dateInscriptionU: data.dateInscriptionU,
                roleU: data.roleU,
                friends: data.friends,
                games: data.games
            });
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

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
    };



    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const id = await AsyncStorage.getItem('id');
                if (token && id) {
                    setToken(token);
                    setId(id);
                    await fetchUser(id, token);
                    await fetchGames(token);
                    await fetchUsers(token);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
            {/* View for card to welcome user */}
                <View style={{ height: 100, paddingTop: 20, paddingHorizontal: 20, backgroundColor: '#F0F0F0', borderRadius: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Bienvenue {user.pseudoU} !</Text>
                    <Text style={{ fontSize: 18 }}>Vous êtes connecté en tant que {user.nomU} {user.prenomU}</Text>
                </View>

                {/* View for card to display games */}
                <View style={{ flex: 1, padding: 20 }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Liste de tous les jeux</Text>
                    {games.map((game, index) => (
                        <View style={{ width: '100%', borderRadius: 10, backgroundColor: 'white', borderWidth: 1, borderColor: 'orange', padding: 10, marginVertical: 10 }} key={index}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }} numberOfLines={1}>{game.libelleG}</Text>
                            <Text style={{ fontSize: 14 }} numberOfLines={2}>{game.descriptionG}</Text>

                            <TouchableOpacity style={{ width: '100%', height: 30, backgroundColor: 'orange', borderRadius: 5, alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                                <Text style={{ color: 'white' }}>Voir jeu</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>

                {/* View for card to display users */}
                <View style={{ flex: 1, padding: 20 }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Liste de tous les utilisateurs</Text>
                    {users.map((user, index) => (
                        <View style={{ width: '100%', borderRadius: 10, backgroundColor: 'white', borderWidth: 1, borderColor: 'orange', padding: 10, marginVertical: 10 }} key={index}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }} numberOfLines={1}>{user.pseudoU}</Text>
                            <Text style={{ fontSize: 14 }} numberOfLines={2}>{user.descriptionU}</Text>

                            <TouchableOpacity style={{ width: '100%', height: 30, backgroundColor: 'orange', borderRadius: 5, alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                                <Text style={{ color: 'white' }}>Voir profil</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default HomeScreen;