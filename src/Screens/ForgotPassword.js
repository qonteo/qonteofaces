
//Import React and Hook we needed
import React, { useState } from 'react';

//Import all required component
import {
  Alert,
  StyleSheet,
  TextInput,
  ScrollView,
  View,
  Text,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import Loader from '../components/Loader';
import Footer from '../components/Footer';

import * as api from '../services/auth';
import { useAuth } from '../provider'; 

const SignInScreen: () => React$Node = ({navigation}) => {
  let [userEmail, setUserEmail] = useState('');
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');
      
       
  async function handleSubmitPress() {    
    setLoading(false);

    try {
      if (!userEmail) {
        alert('Please fill Email');
        return;
      }
  
      let response = await api.forgotPassword({email: userEmail});
      
      Alert.alert(
          'Request was sent successfully!',
          'An email was sent to reset your password',
          [{text: 'OK', onPress: () => navigation.goBack()}],
          {cancelable: false},
      );
    } catch (error) {
        setErrortext('Unauthorized! \n' + error.message + '\n Email Invalid!');
        setLoading(false)
    }
   
  };

  return (
    <View style={styles.container}>     
      <Loader loading={loading} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ marginTop: 80 }}>
          <KeyboardAvoidingView enabled>
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('../assets/images/logo-qonteo-white-200.png')}
                style={{
                  width: '70%',
                  height: 120,
                  resizeMode: 'contain',
                  margin: 0,
                }}
              />
              <Text style={styles.imageTextStyle}>Faces</Text>       
            </View>
            <View style={styles.labelStyle}>
              <Text style={styles.labelTextStyle}>Forgot your password?</Text>
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserEmail => setUserEmail(UserEmail)}
                underlineColorAndroid="#FFFFFF"
                placeholder="Enter a valid Email" //dummy@abc.com
                placeholderTextColor="#F6F6F7"
                autoCapitalize="none"
                keyboardType="email-address"
                ref={ref => {
                  this._emailinput = ref;
                }}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
              />
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}> {errortext} </Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>Recover Password</Text>
            </TouchableOpacity>
            <Text
              style={styles.signInTextStyle}
              onPress={() => navigation.navigate('Login')}>
              Sign In!
            </Text>
           <View style={{marginTop: '11%', alignItems: 'center' }}>
           <Text style={{fontFamily: 'Barlow', color: '#FFFFFF',
                    fontSize: 18}}>2020 Copyright Asdf Network Latam SAS.</Text>
                <Text style={{fontFamily: 'Barlow', color: '#FFFFFF',
                    fontSize: 18}}>All rights reserved.</Text>
           </View>
            
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#282d84',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
  },
  buttonStyle: {
    height: 60,
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 40,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    alignItems: 'center',
    paddingVertical: 15,
    fontFamily: 'Barlow-Bold',
    fontSize: 20,
  },
  inputStyle: {
    height: 60,
    flex: 1,
    color: 'white',
    fontSize: 18,
    fontFamily: 'Barlow-Regular',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'white',
  },
  labelStyle: {
    flexDirection: 'row',
    marginTop: 40,
    marginLeft: 35,
    marginRight: 35,
  },
  labelTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Barlow-Bold',
    fontSize: 20,
  
  },
  signInTextStyle: {
    marginTop:20,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Barlow-Bold',
    fontSize: 20,
  },
  errorTextStyle: {
    color: '#FF64B4',
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 16,
    fontFamily: 'Barlow-Bold'
  },
  imageTextStyle: {
      color:'#FFFFFF',
      fontFamily: 'Rotters',
      fontSize: 42,
      paddingVertical: 10,
    },
});