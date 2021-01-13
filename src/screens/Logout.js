import React, {useState, useEffect} from 'react';
import {ActivityIndicator, StyleSheet, Image, View, Text, Button} from 'react-native';
import * as api from '../services/auth';
import { useAuth } from "../provider";

export default function Logout({ navigation }) {
    const { state, setState } = useAuth();
    const { handleLogout } = useAuth();
    const user = state.user;
    let [animating, setAnimating] = useState(true);
    useEffect(() => {
        console.log("Running useEffect hook in the logout process");
        setTimeout(() => {
          setAnimating(false);
          //Check if user_id is set or not
          //If not then send for Authentication
          //else send to Home Screen
          initialize();
        }, 4000);
      }, []);
      

    async function initialize() {
        try {
            let response = await api.logout({user_id: user._id});
            console.log(response);
            handleLogout();
            state.user = null;
            setState(null);
            navigation.navigate('Login');
        } catch (e) {
            navigation.navigate('Login');
        }
    }
    
    return (
        <View style={styles.container}>
            <Image
            source={require('../assets/images/logo-qonteo-white-200.png')}
            style={{ width: '90%', resizeMode: 'contain', margin: 30 }}
            />
            <Text style={styles.slogan1_text}>Faces</Text> 
            <Text style={styles.slogan2_text}>So sad that you're leaving {user
                ? <Text>{user.firstNames}</Text>
                : <Text></Text>
            } ... {'\n'} Be back soon!</Text>
            <ActivityIndicator
            animating={animating}
            color="#FFFFFF"
            size="large"
            style={styles.activityIndicator}
            />
            <Button title={"Log Out"} onPress={() => {
                            handleLogout();
                            navigation.navigate('Login');
            }}/>
            <Text style={styles.footer_text}>Powered by Asdf Network Latam SAS. </Text>
            <Text style={styles.footer_text}>@2020 Copyright</Text>    
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#282d84',
    },
    activityIndicator: {
      alignItems: 'center',
      height: 80,
    },
    footer_text: {
      color:'#FFFFFF',
      fontFamily: 'Barlow',
      fontSize: 20,
      paddingVertical: 10,
    },
    slogan1_text: {
      color:'#FFFFFF',
      fontFamily: 'Rotters',
      fontSize: 36,
      paddingVertical: 5,
    },
    slogan2_text: {
      color:'#FFFFFF',
      fontFamily: 'Barlow-Bold',
      fontSize: 22,
      paddingVertical: 10,
    },
  });