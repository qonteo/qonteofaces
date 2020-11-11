import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, Image, StyleSheet, StatusBar } from 'react-native';
import ImagePicker from 'react-native-image-picker';

import Footer from '../components/Footer';

import ListPhotos from '../components/ListPhotos';
import { useAuth } from '../provider';


export default function Photos({ navigation }) {
    const {state, setState} = useAuth();
    const [photo, setPhoto] = useState(null)
    const user = state.user;
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    

    //console.log("USER", user);


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



    async function onSubmit(state) {
        const realPath = Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri;

        await fetch('POST', 'https://dashboard.qonteo.com/REST/upload-photo-ios', {
            Authorization : "Bearer " + user.password, 
            //'Content-Type' : 'application/json',
            'Content-Type' : 'multipart/form-data',
          }, [
            // element with property `filename` will be transformed into `file` in form data
            { 
              name: 'file',
              filename: photo.fileName,
              type: photo.type,
              data: RNFetchBlob.wrap(realPath)          
              //data: photo.data
            },
            // elements without property `filename` will be sent as plain text
            { name : 'data',             
              data : JSON.stringify({
                person_name : state.personname,
                user_id : user._id,
                mime_type : photo.type,
                filename: photo.fileName,
                filesize: photo.fileSize,
                height: photo.height,
                width: photo.width,
                isVertical: photo.isVertical}),
              type: 'application/json',
            }
          ]).then((resp) => {
            console.log("SERVER RESPONSE",resp);
            alert('your image uploaded successfully');         
            setPhoto(null);
            navigation.navigate('Photos');
        
          }).catch((error) => {
            console.log(error);
          });        
    }

    return (
        <>
            <SafeAreaView>
                <View style={{backgroundColor: '#fff',}}>        
                    <View>        
                        {photo
                            ?   <View style={styles.container}>
                                    <TouchableOpacity
                                        style={{alignItems: 'center',
                                        justifyContent: 'center'}}
                                        onPress={handleChoosePhoto}>
                                        <Text style={{
                                            marginTop: 20,
                                            marginBottom: 10,
                                            fontSize: 26,
                                            fontFamily: 'Barlow-Bold',
                                            color: '#0a18f1'              
                                        }}> ADD PHOTO </Text>                                        
                                        <Image
                                            source={{
                                            uri: photo.uri
                                            }}
                                            resizeMode='cover'
                                            style={styles.formImageDisplay} />                          
                                    </TouchableOpacity>
                                   {/* Insert form here */}                   
                                </View>
                            :   <View style={styles.container} >
                                    <Text style={{
                                        marginTop: 20,
                                        marginBottom: 10,
                                        fontSize: 26,
                                        color: '#0a18f1'              
                                    }}> ADD PHOTO </Text>
                                    <View style={{width: 80, 
                                                height: 80,
                                                borderRadius: 80,
                                                backgroundColor: '#0a18f1', 
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                marginVertical: 20
                            
                                        }}>                
                                       <TouchableOpacity
                                            style={{alignItems: 'center',
                                            justifyContent: 'center'}}
                                            onPress={handleChoosePhoto}>
                                            <Text style={{ fontSize:30, color:'#ffffff'}}>+</Text>
                                        </TouchableOpacity>       
                                    </View>
                                    <ListPhotos {...user} navigation={navigation} />
                                </View> 

                        }                         
                    </View>
                    <Footer />
                </View>
            </SafeAreaView>
        </>
    );
}


const styles = StyleSheet.create({
    container : {
        alignItems: 'center', 
        justifyContent: 'center', 
        width: '100%',
        height: '100%'

    },
    // Form Stylesheet
    formImageDisplay: { 
        width: 180,
        height: 180,
        borderRadius: 20,


    },


});