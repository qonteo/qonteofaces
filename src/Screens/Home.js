

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
          <TouchableOpacity style={styles.Button1}
              onPress={() => navigation.navigate('Photos')}>                
              <Text style={styles.buttonText}>Photos</Text>  
          </TouchableOpacity>               
          
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
  },
  Button1: {
    backgroundColor: "#7DE24E",
    width: 150,
    height: 100,
    alignItems: "center",
    borderRadius: 12,
  },
  Button2: {
    backgroundColor: "#7033AD",
    width: 150,
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


