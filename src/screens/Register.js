import React, { useState } from 'react';

import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Register = ({navigation}) => {
    const [email, setEmail] = useState(null);
    const [pseudo, setPseudo] = useState(null);
    const [password, setPassword] = useState(null);

    return (
        <SafeAreaView style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../../assets/icon.png')} style={{ width: 200, height: 200 }} />

            <Text style={{ fontSize: 18, fontWeight: 'bold', alignSelf: "flex-start", marginLeft: "10%" }}>Email</Text>
            <TextInput placeholder={"Entrez votre email"} style={{ width: '80%', height: 30, borderColor: 'gray', borderRadius: 5, borderWidth: 1 }} secureTextEntry={false} value={email} onChangeText={setEmail} />

            <Text style={{ fontSize: 18, fontWeight: 'bold', alignSelf: "flex-start", marginLeft: "10%", marginTop: 30 }}>Pseudo</Text>
            <TextInput placeholder={"Entrez votre pseudo"} style={{ width: '80%', height: 30, borderColor: 'gray', borderRadius: 5, borderWidth: 1 }} secureTextEntry={false} value={pseudo} onChangeText={setPseudo} />

            <Text style={{ fontSize: 18, fontWeight: 'bold', alignSelf: "flex-start", marginLeft: "10%", marginTop: 30 }}>Mot de passe</Text>
            <TextInput placeholder={"Entrez votre mot de passe"} style={{ width: '80%', height: 30, borderColor: 'gray', borderRadius: 5, borderWidth: 1 }} secureTextEntry={true} value={password} onChangeText={setPassword} />

            <TouchableOpacity style={{ width: '80%', height: 40, backgroundColor: '#ED7F10', borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Inscription</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', marginTop: 30 }}>
                <Text style={{ fontSize: 14 }}>Vous avez déjà un compte ?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Connexion')}>
                    <Text style={{ fontSize: 14, color: '#ED7F10', marginLeft: 5 }}>Connexion</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default Register;