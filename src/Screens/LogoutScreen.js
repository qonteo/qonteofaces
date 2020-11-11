import React, {useEffect} from 'react';
import {ActivityIndicator, View, Text, Button} from 'react-native';

import { useAuth } from "../provider";

export default function Logout({ navigation }) {
    const { handleLogout } = useAuth();
    
    useEffect(() => {
            console.log("Running useEffect hook");
            initialize();
    }, []);

    async function initialize() {
        try {
            handleLogout();
            navigation.navigate('Login');
        } catch (e) {
            navigation.navigate('Login');
        }
    }
    
    return (
        <View style={{backgroundColor: "#fff", alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <ActivityIndicator/>
            <Text>{"Logging out"}</Text>
            <View style={{flexDirection:"row", marginVertical: 20, marginHorizontal:20}}>
                    <Button title={"Log Out"} onPress={() => {
                        handleLogout();
                        navigation.navigate('Login');
                    }}/>
            </View>
        </View>
    );
};