import React, { useState } from 'react';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView, Text, TextInput, Image, TouchableOpacity, View } from 'react-native';

const Login = ({ navigation }) => {
    const [pseudo, setPseudo] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(null);

    const getToken = () => {
        fetch('https://www.siomende.fr/hallosserie/nexus-api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pse: pseudo,
                mdp: password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.token === undefined) {
                setError("Pseudo ou mot de passe incorrect");
                setPseudo(null);
                setPassword(null);
            } else {
                const storeData = async (value) => {
                    try {
                        await AsyncStorage.setItem('token', value.token);
                        await AsyncStorage.setItem('id', value.id.toString());
                    } catch (e) {
                        console.error(e);
                    }
                }
                storeData(data)
                setError(null);
                navigation.navigate('Nexus');
            }
            console.log(data)
        })
        .catch(error => console.error(error));
    }

    return (
        <SafeAreaView style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../../assets/icon.png')} style={{ width: 200, height: 200 }} />

            <Text style={{ fontSize: 18, fontWeight: 'bold', alignSelf: "flex-start", marginLeft: "10%" }}>Pseudo</Text>
            <TextInput placeholder={"Entrez votre pseudo"} style={{ width: '80%', height: 30, borderColor: 'gray', borderRadius: 5, borderWidth: 1 }} secureTextEntry={false} value={pseudo} onChangeText={setPseudo} />

            <Text style={{ fontSize: 18, fontWeight: 'bold', alignSelf: "flex-start", marginLeft: "10%", marginTop: 30 }}>Mot de passe</Text>
            <TextInput placeholder={"Entrez votre mot de passe"} style={{ width: '80%', height: 30, borderColor: 'gray', borderRadius: 5, borderWidth: 1 }} secureTextEntry={true} value={password} onChangeText={setPassword} />

            {error !== null && <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>}

            <TouchableOpacity style={{ width: '80%', height: 40, backgroundColor: '#ED7F10', borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginTop: 30 }} onPress={getToken}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Connexion</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', marginTop: 30 }}>
                <Text style={{ fontSize: 14 }}>Vous n'avez pas de compte ?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Inscription')}>
                    <Text style={{ fontSize: 14, color: '#ED7F10', marginLeft: 5 }}>Inscription</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default Login;