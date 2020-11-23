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
  TouchableOpacity
} from 'react-native';

import FooterHome from '../components/FooterHome';

import { useAuth } from '../provider';

export default function HomeScreen({ navigation }) {
  const {state, handleLogout} = useAuth();
  const user = state.user;

  return (
    <>
      <SafeAreaView>
        <View>
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.Button}
              onPress={() => navigation.navigate('Photos')}>
              <Text style={styles.buttonText}>Photos</Text>
            </TouchableOpacity>                   
          </View>
          <FooterHome/>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {   
      flex: 1,
      alignItems:'center',
      marginTop: 20,
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


