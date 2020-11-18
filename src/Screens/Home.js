/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import Footer from '../components/Footer';

import { useAuth } from '../provider';

const App: () => React$Node = ({navigation}) => {
  const {state, handleLogout} = useAuth();
  const user = state.user;

  return (
    <>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.WelcomeTextStyle}>
              {user 
                  ? <Text>{`Welcome ${user.firstName} ${user.lastName} `}</Text> 
                  : <Text>Welcome</Text>
              }                
          </View>
          <TouchableOpacity
              style={styles.Button}
              onPress={() => navigation.navigate('Photos')}>
              <Text style={styles.buttonText}>Photos</Text>
          </TouchableOpacity>          
          <Footer/>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {   
      alignItems:'center',
  },
  WelcomeTextStyle: {
    marginVertical: 30
  },
  Button: {
    backgroundColor: "#7DE24E",
    width: 150,
    height: 100,
    alignItems: "center",
    justifyContent: 'center',
    borderRadius: 12,
  },
  buttonText: {
    color: "#FFFFFF", 
    fontFamily: "Barlow-Bold",
    fontSize: 24
  },
});

export default App;
