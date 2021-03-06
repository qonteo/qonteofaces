
//Import React and Hook we needed
import React, { useState } from 'react';

//Import all required component
import {
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

const SignInScreen: () => React$Node = ({navigation}) => {
  let [userEmail, setUserEmail] = useState('');
  let [userPassword, setUserPassword] = useState('');
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');
  const { handleLogin } = useAuth();       
       
  async function handleSubmitPress() {    
    try {
      setErrortext('');      
      if (!userEmail) {
        alert('Please fill Email');
        return;
      }
      if (!userPassword) {
        alert('Please fill Password');
        return;
      }  
      setLoading(true);
      let response = await api.login({email: userEmail, password: userPassword});
      await handleLogin(response);
      
      // If server response message same as Data Matched
      if (response.user.isVerified == 't') {
        setLoading(false);
        navigation.navigate('Home'); 
      } else {
        setLoading(false);
        setErrortext('Please check your email id or password');
        console.log('Please check your email id or password');
      }
      //Hide Loader
      setLoading(false);
    } catch(error) {
      console.log(error);
      setLoading(false);
      setErrortext('Please check your email id or password');
      throw new Error(error);
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
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={navigation.navigate('FaceLogin')}>
              <Text style={styles.buttonTextStyle}>FACE LOGIN</Text>
            </TouchableOpacity>

            <Text
              style={styles.forgotPasswordTextStyle}
              onPress={() => navigation.navigate('ForgotPassword')}>
              Forgot you Password?
            </Text>


            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate('Register')}>
              New Here ? Register
            </Text>
            <Footer/>
            
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};


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
    marginTop: 40,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    alignItems: 'center',
    paddingVertical: 20,
    fontFamily: 'Barlow-Bold',
    fontSize: 20,
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
  forgotPasswordTextStyle: {
    marginTop: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Barlow-Bold'

  },

  registerTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Barlow-Bold',
    marginTop: 40,
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


export default SignInScreen;