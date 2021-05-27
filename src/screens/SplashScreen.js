
//Import React and Hooks we needed
import React, { useState, useEffect } from 'react';

//Import all required component
import { ActivityIndicator, View, StyleSheet, Image, Text } from 'react-native';
import AuthProvider, { useAuth } from "../provider";

export default function SplashScreen({ navigation }) {
  //State for ActivityIndicator animation
  let [animating, setAnimating] = useState(true);
  const { getAuthState } = useAuth();

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      initialize();
      {/*AsyncStorage.getItem('user_id').then(value =>
        props.navigation.navigate(
          value === null ? 'Auth' : 'DrawerNavigationRoutes'
        )
        );*/}

    }, 5000);
  }, []);


  async function initialize() {
    try {
        const {user} = await getAuthState();
        if (user) {
          if (user.isVerified == 't') {
            navigation.navigate('Home');
          }
        }  
        navigation.navigate('FaceSignIn');
    } catch (e) {
        navigation.navigate('FaceSignIn');
    }
}


  return (   
    <AuthProvider>
      <View style={styles.container}>
        <Image
          source={require('../assets/images/logo-qonteo-white-200.png')}
          style={{ width: '90%', resizeMode: 'contain', margin: 30 }}
        />
        <Text style={styles.slogan2_text}>Biometric is everything</Text>
        <ActivityIndicator
          animating={animating}
          color="#FFFFFF"
          size="large"
          style={styles.activityIndicator}
        />
        <Text style={styles.footer_text}>Powered by Asdf Network Latam SAS. </Text>
        <Text style={styles.footer_text}>@2020 Copyright</Text>    
      </View>
    </AuthProvider> 
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
    paddingVertical: 10,
  },
  slogan2_text: {
    color:'#FFFFFF',
    fontFamily: 'Rotters',
    fontSize: 42,
    paddingVertical: 10,
  },
});