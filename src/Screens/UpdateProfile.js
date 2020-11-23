//Import React and Hook we needed
import React, { useState } from 'react';

//Import all required component
import {
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { 
  Avatar, 
  Title, 
  Caption, 
  Paragraph, 
  Drawer, 
  Text, 
  TouchableRipple,
  Switch
} from 'react-native-paper';

import Loader from '../components/Loader';
import * as api from '../services/auth';
import { useAuth } from '../provider';
import FooterHome from '../components/FooterHome';

export default function UpdateProfile() {
  let [userEmail, setUserEmail] = useState('');
  let [firstName, setFirstName] = useState('');
  let [lastName, setLastName] = useState('');
  let [userPassword, setUserPassword] = useState('');
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');
  
  const {state, setState} = useAuth();
  const user = state.user;
  
  let user_portrait_p = false;
  if (user) {
      if (user.portrait_url != ''){
          user_portrait_p = true;
      }
  }
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
      navigation.navigate('Home'); 
    } catch(error) {
      console.log(error);
      setLoading(false);
      setErrortext('Email already exists. Please, Sign In!');

    }
  };


  return (
    <View>
      <Loader loading={loading} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ marginTop: 20 }}>
          <KeyboardAvoidingView enabled>
            <View style={{alignItems: 'center'}}>
                {user_portrait_p == true 
                  ?   <Avatar.Image
                      source={{ uri: user.portrait_url }}
                      size={100}/>
                  :   <Avatar.Image
                          source={require('../assets/images/add-user.png')}
                          style={{backgroundColor: '#ffffff'}}
                          size={100}/>
  
                }
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={FirstName => setFirstName(FirstName)}
                underlineColorAndroid="#282d84"
                placeholder="Enter first names"
                placeholderTextColor="#282d84"
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
                value={user.firstName}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={LastName => setLastName(LastName)}
                underlineColorAndroid="#282d84"
                placeholder="Enter last name"
                placeholderTextColor="#282d84"
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
                value={user.lastName}
              />
            </View>

            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserEmail => setUserEmail(UserEmail)}
                underlineColorAndroid="#282d84"
                placeholder="Enter Email" //dummy@abc.com
                placeholderTextColor="#282d84"
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
                value={user.email}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserPassword => setUserPassword(UserPassword)}
                underlineColorAndroid="#282d84"
                placeholder="Enter new password" //12345
                placeholderTextColor="#282d84"
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
              <Text style={styles.buttonTextStyle}>UPDATE</Text>
            </TouchableOpacity>
            
          </KeyboardAvoidingView>
        </View>
        <FooterHome/>
      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
  
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
    color: '#282d84',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#282d84',
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
  
});