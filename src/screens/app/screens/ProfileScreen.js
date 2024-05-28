import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView, View, Text, TouchableOpacity, Image, ScrollView } from "react-native";

const ProfileScreen = ({ navigation }) => {
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const id = await AsyncStorage.getItem('id');
                if (token && id) {
                    setToken(token);
                    setId(id);
                    await fetchUser(id, token);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleLogout = async () => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('id');
        navigation.navigate('Connexion');
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ width: '100%', height: 150, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                    <View style={{ width: 100, height: 100, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={{uri : 'https://i.pinimg.com/736x/96/d6/59/96d659a77e661e022df4fb640b60da49.jpg'}} style={{ width: 80, height: 80, borderRadius: 40 }} />
                    </View>

                    <View style={{ flex: 1, height: '100%', justifyContent: 'center', marginLeft: 20 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{user.pseudoU}</Text>
                        <Text style={{ fontSize: 14 }}>{user.descriptionU}</Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', gap: 20, marginTop: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Ionicons name="people" size={24} color="black" />
                                <Text style={{ marginLeft: 5 }}>{user.friends.length} amis</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Ionicons name="game-controller" size={24} color="black" />
                                <Text style={{ marginLeft: 5 }}>{user.games.length} jeux</Text>
                            </View>

                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'flex-end' }} onPress={handleLogout}>
                                <Ionicons name="log-out" size={24} color="red" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={{ width: '100%', padding: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="people" size={24} color="black" />
                        <Text style={{ marginLeft: 5, fontSize: 18, fontWeight: 'bold' }}>Amis</Text>
                    </View>

                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
                        {user.friends.map((friend, index) => (
                            <View style={{ width: 200, borderRadius: 10, backgroundColor: 'white', borderWidth: 1, borderColor: 'orange', padding: 10, marginRight: 10 }} key={index}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{friend.pseudoU}</Text>
                                <Text style={{ fontSize: 14 }} numberOfLines={2}>{friend.descriptionU}</Text>

                                <TouchableOpacity style={{ width: '100%', height: 30, backgroundColor: 'orange', borderRadius: 5, alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                                    <Text style={{ color: 'white' }}>Voir profil</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                </View>

                <View style={{ width: '100%', padding: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="game-controller" size={24} color="black" />
                        <Text style={{ marginLeft: 5, fontSize: 18, fontWeight: 'bold' }}>Jeux</Text>
                    </View>

                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
                        {user.games.map((game, index) => (
                            <View style={{ width: 200, borderRadius: 10, backgroundColor: 'white', borderWidth: 1, borderColor: 'orange', padding: 10, marginRight: 10 }} key={index}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }} numberOfLines={1}>{game.libelleG}</Text>
                                <Text style={{ fontSize: 14 }} numberOfLines={2}>{game.descriptionG}</Text>

                                <TouchableOpacity style={{ width: '100%', height: 30, backgroundColor: 'orange', borderRadius: 5, alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                                    <Text style={{ color: 'white' }}>Voir jeu</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProfileScreen;
