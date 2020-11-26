//Import React and Hook we needed
import React, { useState } from 'react';

//Import all required component
import {
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { 
  Avatar, 
  Text, 
} from 'react-native-paper';

import Loader from '../components/Loader';
import * as api from '../services/api';
import { useAuth } from '../provider';
import FooterHome from '../components/FooterHome';
import ImagePicker from 'react-native-image-picker';

export default function UpdateProfile() {
  let [email, setEmail] = useState('');
  let [firstNames, setFirstName] = useState('');
  let [lastName, setLastName] = useState('');
  let [phoneNumber, setPhoneNumber] = useState('');
  let [portrait, setPortrait] = useState(null);
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');

  const {state, setState} = useAuth();
  const user = state.user;
  
  if (user || portrait) {
      if (user.portrait_url != ''){
        setPortrait(user.portrait_url);
      }
  }

  function handleChoosePortrait() {
    const options = {
        //noData: true,
        maxHeight: 500,
        maxWidth: 500
    };    //alert('clicked');

    ImagePicker.showImagePicker(options, (response) => {
        // console.log('Response = ', response);

        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.log('Image Picker Error: ', response.error);
        } else {
          // You can also display the image using data:
          // let source = { uri: 'data:image/jpeg;base64,' + response.data };
          setPortrait(response);
        }
    });
  }



  async function handleSubmitPress() {    
    try {
      setErrortext('');      
      if (!firstNames) {
        alert('Please fill first names');
        return;
      }  
      if (!lastName) {
        alert('Please fill last name');
        return;
      }  
      if (!email) {
        alert('Please fill Email');
        return;
      }
      if (!phoneNumber) {
        alert('Please fill Password');
        return;
      }  

      setLoading(true);  
      let response = await api.updateProfile({firstName: firstName, lastName: lastName, email: email, phoneNumber: phoneNumber, portrait: portrait});
      await handleLogin(response);

      //Hide Loader
      setLoading(false);
      navigation.navigate('Home'); 
    } catch(error) {
      console.log(error);
      setLoading(false);
      setErrortext('Update failure!');

    }
  };


  return (
    <View>
      <Loader loading={loading} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ marginTop: 20 }}>
          <KeyboardAvoidingView enabled>
            <View style={{alignItems: 'center'}}>
                {portrait 
                  ? <Avatar.Image
                      source={{ uri: portrait.uri }}
                      size={200}/>
                  : <TouchableOpacity
                      style={{alignItems: 'center'}}
                      onPress={handleChoosePortrait}>
                      <Avatar.Image
                          source={require('../assets/images/add-user.png')}
                          style={{backgroundColor: '#ffffff'}}
                          size={100}/>
                  </TouchableOpacity>
                }
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={firstNames => setFirstName(firstNames)}
                underlineColorAndroid="#282d84"
                placeholder="Enter first names"
                placeholderTextColor="#282d84"
                autoCapitalize="none"
                keyboardType="name-phone-pad"
                ref={ref => {
                  this._firstnamesinput = ref;
                }}
                returnKeyType="next"
                onSubmitEditing={() =>
                  this._lastnameinput && this._lastnameinput.focus()
                }
                blurOnSubmit={false}
                value={user.firstNames}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={lastName => setLastName(lastName)}
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
                  this._phonenumberinput && this._phonenumberinput.focus()
                }
                blurOnSubmit={false}
                value={user.lastName}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
                underlineColorAndroid="#282d84"
                placeholder="Enter phone number"
                placeholderTextColor="#282d84"
                autoCapitalize="none"
                keyboardType="phone-pad"
                ref={ref => {
                  this._phonenumberinput = ref;
                }}
                returnKeyType="next"
                onSubmitEditing={() =>
                  this._emailinput && this._emailinput.focus()
                }
                blurOnSubmit={false}
                value={user.phoneNumber}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={email => setEmail(email)}
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