import React, { useState } from 'react';
import { KeyboardAvoidingView, Keyboard, SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-picker';
// import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';

import ListPhotos from '../components/ListPhotos';
import { useAuth } from '../provider';


export default function Photos({ navigation }) {
    const {state, setState} = useAuth();
    let [photo, setPhoto] = useState(null);
    let [photoName, setPhotoName] = useState(null);
    const user = state.user;
       
    function handleChoosePhoto() {
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
              setPhoto(response);
            }
        });
    }

    async function onSubmit() {
        //console.log("USER ", user);
        const realPath = Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri;
        //console.log("NAME ", photoName);
        //console.log("DESC ", photo.uri.substring(photo.uri.lastIndexOf('/')+1));
        await RNFetchBlob.fetch('POST', 'http://ec2-54-86-23-8.compute-1.amazonaws.com/file/upload', {
            Authorization : "Bearer ", 
                //'Content-Type' : 'application/json',
                'Content-Type' : 'multipart/form-data',
        }, [
            // element with property `filename` will be transformed into `file` in form data
        { 
            name: 'file',
            filename:  photo.uri.substring(photo.uri.lastIndexOf('/')+1),
            type: photo.type,
            data: RNFetchBlob.wrap(realPath)          
        }]).then((resp) => {
            uploadPhoto(resp);
        }).catch((error) => {
            console.log("Error", error);
          });        
    }





{/*
    async function onSubmitLuna() {
        const realPath = Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri;

        await RNFetchBlob.fetch('POST', 
            'https://luna.qonteo.com:9000/4/storage/descriptors?estimate_attributes=1&estimate_emotions=1&warped_image=1&external_id=usb_camera_0809&source=usb_camera_0&identification=usb_camera_0', {  
            'X-Auth-Token': '9fb6e731-b342-4952-b0c1-aa1d0b52757b',
            'Content-Type': 'image/jpeg'
        }, RNFetchBlob.wrap(realPath)
        ).then((resp) => {
            //console.log("SERVER RESPONSE",resp);
            if(!resp.status == 200) {
                throw newError(
                    `${resp.status}: ${response.statusText}`
                );
            }

            uploadPhoto(resp.data);
           
        }).catch((error) => {
            console.log(error);
        });        
    }     
 
*/}


    async function uploadPhoto(response) {
        const realPath = Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri;
        const file_name = photo.uri.substring(photo.uri.lastIndexOf('/')+1);
        //console.log("NAME ", file_name);
        //console.log("DESC ", response.data)

        await RNFetchBlob.fetch('POST', 'https://dashboard.qonteo.com/REST/upload-photo-ios', {
            Authorization : "Bearer " , 
            //'Content-Type' : 'application/json',
            'Content-Type' : 'multipart/form-data',
        }, [
            // element with property `filename` will be transformed into `file` in form data
            { 
            name: 'file',
            filename: file_name,
            type: photo.type,
            data: RNFetchBlob.wrap(realPath)          
            //data: photo.data
            },
            // elements without property `filename` will be sent as plain text
            { 
                name : 'data',             
                data : JSON.stringify({
                    title : photoName,
                    user_id : user._id,
                    description : response.data,
                // mime_type : photo.type,
                // filename: file_name,
                // filesize: photo.fileSize,
                // height: photo.height,
                // width: photo.width,
                // isVertical: photo.isVertical
                }),
                type: 'application/json',
            }
        ]).then((resp) => {
            //console.log("SERVER RESPONSE",resp);
            alert('Success! Your image uploaded successfully');         
            setPhoto(null);
            navigation.navigate('Photos');
        }).catch((error) => {
            alert("ERROR: " + error);
            console.log(error);
        });                
    }




    return (
        <View style={styles.mainBody}>     
            <KeyboardAvoidingView enabled>
                <View style={styles.container}>      
                    {photo ?
                        <View>
                            <TouchableOpacity
                                style={{alignItems: 'center'}}
                                onPress={handleChoosePhoto}>
                                <Text style={styles.screenTitleStyle}> ADD PHOTO </Text>                                        
                                <Image
                                    source={{
                                    uri: photo.uri
                                    }}
                                    resizeMode='cover'
                                    style={styles.formImageDisplay} />                          
                            </TouchableOpacity>
                            
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={photoName => setPhotoName(photoName)}
                                underlineColorAndroid="#FFFFFF"
                                placeholder="Type a subtitle for the photo"
                                placeholderTextColor="#282d84"
                                onSubmitEditing={Keyboard.dismiss}
                            />
                            <TouchableOpacity
                                style={styles.buttonStyle}
                                activeOpacity={0.5}
                                onPress={onSubmit}>
                                <Text style={styles.buttonTextStyle}>Ok</Text>
                            </TouchableOpacity>
                        
                        </View>
                    :   <View style={styles.container} >                           
                            <ListPhotos {...user} navigation={navigation} />

                            <TouchableOpacity onPress={handleChoosePhoto}>
                                <View style={styles.buttonPlusViewStyle}>                
                                    <Text style={styles.buttonPlusTextStyle}>+</Text>
                                </View>
                            </TouchableOpacity>       
                        </View> 

                    }
                </View>
            </KeyboardAvoidingView>  
        </View>
    );
}


const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
    },
    container : {
        alignItems: 'center', 
        width: '100%',
        height: '100%',   
        backgroundColor: '#fff',    
    },

    // Form Stylesheet
    formImageDisplay: { 
        width: 200,
        height: 200,
        borderRadius: 10,    
    }, 
    buttonStyle: {
        height: 60,
        width: 300,
        backgroundColor: '#7DE24E',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        alignItems: 'center',
        borderRadius: 10,
        marginVertical: 10,
      },  
    buttonTextStyle: {
        color: '#FFFFFF',
        alignItems: 'center',
        paddingVertical: 15,
        fontSize: 24,
        fontFamily: 'Barlow-Bold'
    },
    inputStyle: {
        width: 300,
        height: 60,
        color: '#282d84',
        marginVertical: 20,
        padding: 20,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#282d84',
    },
    screenTitleStyle: {
        marginTop: 30,
        fontSize: 36,
        color: '#282d84',              
        fontFamily: 'Barlow-Bold',
    },
    buttonPlusViewStyle: {
        width: 80, 
        height: 80,
        borderRadius: 80,
        backgroundColor: '#7DE24E', 
        alignItems: 'center',
        marginTop: 0,
        marginBottom: 10,
        padding: 5
    },
    buttonPlusTextStyle: { 
        fontSize:50, 
        color:'#ffffff',
        fontFamily: 'Barlow-Bold'
    }
});