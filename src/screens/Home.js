

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
import { red100 } from 'react-native-paper/lib/typescript/styles/colors';

export default function HomeScreen ({ navigation }) {
  const { state } = useAuth();
  const user = state.user;


  return (
    <>
      <SafeAreaView>
        <View style={styles.container}>
          {user
            ? <View style={{marginLeft: 15}}>
                <Text style={{fontFamily: 'Barlow-Bold', fontSize: 20}}>Welcome {user.firstNames}! </Text>
            </View>
            : <View></View>
          }
          <View style={{flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity style={styles.Button1}
                onPress={() => navigation.navigate('Photos')}>                
                <Text style={styles.buttonText}>Photos</Text>  
            </TouchableOpacity>      
            <Text style={styles.buttonText}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>         
            <TouchableOpacity style={styles.Button2}
                onPress={() => navigation.navigate('Scan')}>                
                <Text style={styles.buttonText}>Scan Faces</Text>  
            </TouchableOpacity>               
          </View>          
        </View>
        <FooterHome/>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {   
      flex: 1,
      alignItems:'center',
      marginTop: 20,
      borderColor: 'red',
      borderWidth: 1,
  },
  Button1: {
    backgroundColor: "#7DE24E",
    width: 130,
    height: 100,
    alignItems: "center",
    borderRadius: 12,
  },
  Button2: {
    backgroundColor: "#7033AD",
    width: 130,
    height: 100,
    alignItems: "center",
    borderRadius: 12,

  },
  buttonText: {
    color: "#FFFFFF", 
    fontFamily: "Barlow-Bold",
    fontSize: 24,
    marginVertical: 30    
  },
});


