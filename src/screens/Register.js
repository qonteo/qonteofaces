
//Import React and Hook we needed
import React, { useState } from 'react';

//Import all required component
import {
  Alert,
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import Loader from '../components/Loader';
import Footer from '../components/Footer';

import * as api from '../services/auth';
import { useAuth } from '../provider'; 

const SignInScreen = ({navigation}) => {
  let [userEmail, setUserEmail] = useState('');
  let [firstName, setFirstName] = useState('');
  let [lastName, setLastName] = useState('');
  let [userPassword, setUserPassword] = useState('');
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');
  const { handleLogin } = useAuth();       
       
  async function handleSubmitPress() {    
    try {
      setErrortext('');      
      if (!firstName) {
        alert('Please fill first names');
        return;
      }  
      if (!lastName) {
        alert('Please fill last name');
        return;
      }  
      if (!userEmail) {
        alert('Please fill Email');
        return;
      }
      if (!userPassword) {
        alert('Please fill Password');
        return;
      }  

      setLoading(true);  
      let response = await api.register({firstName: firstName, lastName: lastName, email: userEmail, password: userPassword});
      await handleLogin(response);
      //Hide Loader
      setLoading(false);
      Alert.alert(
        'Registration Successful!',
        response.message,
        [{text: 'OK', onPress: () => navigation.navigate('Home') }],
        {cancelable: false}
      );
      
      
      
    } catch(error) {
      console.log(error);
      setLoading(false);
      setErrortext('Email already exists. Please, Sign In!');

    }
  };

  return (
    <View style={styles.mainBody}>     
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
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={FirstName => setFirstName(FirstName)}
                underlineColorAndroid="#FFFFFF"
                placeholder="Enter first names"
                placeholderTextColor="#F6F6F7"
                autoCapitalize="none"
                keyboardType="name-phone-pad"
                ref={ref => {
                  this._firstnameinput = ref;
                }}
                returnKeyType="next"
                onSubmitEditing={() =>
                  this._lastnameinput && this._lastnameinput.focus()
                }
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={LastName => setLastName(LastName)}
                underlineColorAndroid="#FFFFFF"
                placeholder="Enter last name"
                placeholderTextColor="#F6F6F7"
                autoCapitalize="none"
                keyboardType="name-phone-pad"
                ref={ref => {
                  this._lastnameinput = ref;
                }}
                returnKeyType="next"
                onSubmitEditing={() =>
                  this._emailinput && this._emailinput.focus()
                }
                blurOnSubmit={false}
              />
            </View>

            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserEmail => setUserEmail(UserEmail)}
                underlineColorAndroid="#FFFFFF"
                placeholder="Enter Email" //dummy@abc.com
                placeholderTextColor="#F6F6F7"
                autoCapitalize="none"
                keyboardType="email-address"
                ref={ref => {
                  this._emailinput = ref;
                }}
                returnKeyType="next"
                onSubmitEditing={() =>
                  this._passwordinput && this._passwordinput.focus()
                }
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserPassword => setUserPassword(UserPassword)}
                underlineColorAndroid="#FFFFFF"
                placeholder="Enter Password" //12345
                placeholderTextColor="#F6F6F7"
                keyboardType="default"
                ref={ref => {
                  this._passwordinput = ref;
                }}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
              />
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}> {errortext} </Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>REGISTER</Text>
            </TouchableOpacity>
            <Text
              style={styles.signInTextStyle}
              onPress={() => navigation.navigate('Login')}>
              Have an account? <Text style={{fontFamily: 'Barlow-Bold'}}> Sign In!</Text>
            </Text>
            <Footer/>
            
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#282d84',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    height: 60,
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 35,
    marginVertical: 40,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    alignItems: 'center',
    paddingVertical: 20,
    fontSize: 20,
    fontFamily: 'Barlow-Bold'
  },
  inputStyle: {
    height: 60,
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'white',
    fontSize: 18,
    fontFamily: 'Barlow-Regular'
  },
  signInTextStyle: {
    marginTop: 30,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Barlow-Regular',
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