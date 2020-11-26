

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import FooterHome from '../components/FooterHome';


import { useAuth } from '../provider';

export default function HomeScreen ({ navigation }) {
  const { state } = useAuth();
  const user = state.user;


  return (
    <>
      <SafeAreaView>
        <View>
          <View style={styles.container}>
            {user
              ? <View style={{marginLeft: 15, flexDirection: 'column'}}>
                  <Text style={{fontFamily: 'Barlow-Bold', fontSize: 20}}>Welcome {user.firstNames}! </Text>
              </View>
              : <View></View>
            }
            <View style={styles.Button1}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Photos')}>                
                  <View>
                    <Text style={styles.buttonText}>Photos</Text>
                  </View>
              </TouchableOpacity>
            </View>                                    
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
  Button1: {
    backgroundColor: "#7DE24E",
    width: 150,
    height: 100,
    alignItems: "center",
    borderRadius: 12,
    marginTop:'50%',
    padding: 30 
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
  },
});


