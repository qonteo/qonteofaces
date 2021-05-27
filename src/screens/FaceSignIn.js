
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

import ImagePicker from 'react-native-image-picker';
import Loader from '../components/Loader';
import Footer from '../components/Footer';

import RNFetchBlob from 'rn-fetch-blob'

import * as api from '../services/auth';
import { useAuth } from '../provider'; 
import Icon from 'react-native-vector-icons/Entypo';

export default function FaceSignIn({navigation}) {  
  const {state, setState} = useAuth();
  let [photo, setPhoto] = useState(null);
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');
  const { handleLogin } = useAuth();       
       

  function handleTakePhoto() {
    const options = {
      title: 'SignIn with your Face Photo',
      cameraType: 'front',
      quality: 1,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, (response) => {
      //console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        Alert.alert(response.customButton);
      } else {
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        setPhoto(response);
      }
    });
  }


  async function uploadPhoto() {
    setErrortext('');      
    setLoading(true);
    const realPath = Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri;
    await RNFetchBlob.fetch('POST', 'https://dashboard.qonteo.com/REST/users/face-login', {
        Authorization : "Bearer ", 
            'Content-Type' : 'multipart/form-data',
    }, [
        // element with property `filename` will be transformed into `file` in form data
    { 
        name: 'file',
        filename:  photo.uri.substring(photo.uri.lastIndexOf('/')+1),
        type: photo.type,
        data: RNFetchBlob.wrap(realPath)          
    }]).then((response) => {
      console.log("RES", response.data);                
      onSubmit(JSON.parse(response.data));
    }).catch((error) => {
        console.log("Error", error);
    });
  }



  async function onSubmit(response) {
    try {
      console.log("RESPONSE", response);
      // If server response message same as Data Matched
      if (response.user.isVerified == 't') {         
        await handleLogin(response);
        setLoading(false);
        navigation.navigate('Home'); 
      } else {
        setErrortext('Login Failed. You may SignIn using your email id or password');
        console.log('Login Failed. You may SignIn using your email id or password');
      }

    } catch(error) {
      console.log(error);
      setLoading(false);
      setErrortext('Login Failed!\nYou may SignIn using your email id or password');
      throw new Error(error);
    }
  }

  return (
    <View style={styles.mainBody}>     
      <Loader loading={loading} />

      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ marginTop: 0 }}>
          <KeyboardAvoidingView enabled>
            <View style={styles.container}>      
              {photo ?
                  <View>
                      <TouchableOpacity
                          style={{alignItems: 'center'}}
                          onPress={handleTakePhoto}>
                          <Image
                              source={{
                              uri: photo.uri
                              }}
                              resizeMode='cover'
                              style={styles.ImageDisplay} />                          
                          <View style={styles.buttonPlusViewStyle}>                
                            <Text style={styles.buttonPlusTextStyle}>+</Text>
                          </View>                        
                          <Text style={styles.screenTitleStyle}> Edit Photo </Text> 
                      
                      </TouchableOpacity>
                                            
                      <TouchableOpacity
                          style={styles.buttonStyle}
                          activeOpacity={0.5}
                          onPress={uploadPhoto}>
                          <Text style={styles.buttonTextStyle}>Sign In</Text>
                      </TouchableOpacity>
                  
                  </View>
              :   <View style={styles.container} >     
                    <View style={{ alignItems: 'center' }}>
                      <Image
                        source={require('../assets/images/logo-qonteo-white-200.png')}
                        style={{
                          width: '100%',
                          height: 180,
                          resizeMode: 'contain',
                          margin: 20,
                        }}
                      />                             
                    </View>
                    <Text style={styles.screenTitleStyle}>Face Sign In</Text>
                   
                    <TouchableOpacity
              style={{ textAlign: 'center', alignItems: 'center', marginTop: 20}}
              onPress={handleTakePhoto}> 
              <Icon name='camera' color='#7DE24E' size={50}/> 
              <Text style={styles.buttonTextStyle}>Take Photo</Text>              
            </TouchableOpacity>


                  </View>
              }
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}> {errortext} </Text>
            ) : null}
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate('SignIn')}>
              Email & Password? Sign In! 
            </Text>
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate('SignUp')}>
              New Here? Register!
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
    backgroundColor: '#282d84',
  },
  screenTitleStyle: {
    textAlign: 'center',
    fontSize: 36,
    color: '#FFFFFF',              
    fontFamily: 'Barlow-Bold',
},
  ImageDisplay: { 
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,    
  }, 
  buttonTextStyle: {
    color: '#FFFFFF',
    alignItems: 'center',
    paddingVertical: 15,
    fontSize: 24,
    fontFamily: 'Barlow-Bold'
},
buttonPlusViewStyle: {
  width: 80, 
  height: 80,
  borderRadius: 80,
  backgroundColor: '#7DE24E', 
  alignItems: 'center',
  marginTop: 20,
  marginBottom: 10,
  padding: 5
},
buttonPlusTextStyle: { 
  fontSize:50, 
  color:'#ffffff',
  fontFamily: 'Barlow-Bold'
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



