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
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';


import Header from '../components/Header';
import Footer from '../components/Footer';

import { useAuth } from '../provider';

const App: () => React$Node = ({navigation}) => {
  const {state, handleLogout} = useAuth();
  const user = state.user;

  return (
    <>
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={{flex: 1, paddingTop: 50, alignItems: 'center', marginBottom: 50}}>
            <KeyboardAvoidingView enabled>               
              {user 
                  ? <Text>{`Welcome ${user.firstName} ${user.lastName} `}</Text> 
                  : <Text>Welcome</Text>
              }                
              <View style={styles.viewRow}>
                <TouchableOpacity
                    style={{
                        backgroundColor: "#0098ff",
                        width: 150,
                        height: 100,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 12,
                    }}
                    onPress={() => navigation.navigate('Photos')}>
                    <Text style={styles.buttonText}>Photos</Text>
                </TouchableOpacity>
              </View>  
              <Footer/>
            </KeyboardAvoidingView>                
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container : {
      //backgroundColor:'#effbf7',
      backgroundColor: '#d9f1e9',
      flex: 1, 
      paddingHorizontal: 16,
      alignItems:'center',
      width: '100%'    
  },
   // Home Screen
   viewRow: {
    flexDirection:"row",
    margin: 9,
    padding: 9
},
buttonText: {
    color: "#fff", 
    fontFamily: "Barlow-Bold",
    fontSize: 16
},

submitButton: {
  backgroundColor: '#0a18f1',
  borderRadius: 10,
  height: 60,
  marginVertical: 20,
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
},
submitButtonText: {
  fontFamily: 'Barlow-Bold',
  fontSize: 20,
  color: '#fff'

}
});

export default App;
