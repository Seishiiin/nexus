import React from 'react';

import Home from "../screens/Home";
import Login from "../screens/Login";
import Register from "../screens/Register";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Connexion" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="Inscription" component={Register} options={{ headerShown: false }} />

                <Stack.Screen name="Nexus" component={Home} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation