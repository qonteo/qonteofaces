/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React and Hooks we needed
import React, { useState, useEffect } from 'react';

//Import all required component
import { ActivityIndicator, View, StyleSheet, Image, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const SplashScreen = props => {
  //State for ActivityIndicator animation
  let [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      AsyncStorage.getItem('user_id').then(value =>
        props.navigation.navigate(
          value === null ? 'Auth' : 'DrawerNavigationRoutes'
        )
      );
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo-qonteo-white-200.png')}
        style={{ width: '90%', resizeMode: 'contain', margin: 30 }}
      />
      <Text style={styles.slogan_text}>Biometric is everything</Text>
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
      <Text style={styles.footer_text}>Powered by Asdf Network Latam SAS. </Text>
      <Text style={styles.footer_text}>@2020 Copyright</Text>
   
    </View>
  );
};
export default SplashScreen;

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
    fontFamily: 'Barlow-Bold',
    fontSize: 20,
    paddingVertical: 10,
  },
  slogan_text: {
    color:'#FFFFFF',
    fontFamily: 'Rotters',
    fontSize: 42,
    paddingVertical: 10,
  },
});