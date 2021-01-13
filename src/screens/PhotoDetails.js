import React from 'react';
import {Alert, SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import * as api from '../services/api';
import { useAuth } from '../provider'; 

const PhotoDetails = (props) => {
    //console.log("NAV ", navigation);
    let [loading, setLoading] = React.useState(false);
    let [errortext, setErrortext] = React.useState('');

    const {state, setState} = useAuth();
    const user = state.user;

    const navigation = props.navigation;

    async function deletePhoto(id) {
        try {
            setLoading(true);
            let response = await api.deletePhoto({photo_id: id, user_id: user._id});
            Alert.alert(
                'Request was sent successfully!',
                'An email was sent to reset your password',
                [{text: 'OK', onPress: () => navigation.navigate('Photos')}],
                {cancelable: false},
            );
        } catch(error) {
            setLoading(false);
            Alert.alert(
                'Request failed!',
                'Unabled to delete photo',
                {cancelable: false},
            );
            setErrortext('Error deleting photo!');
            throw new Error(error);
        }
    }

    const convertToObject = ((jsonString) => {
        try {
            var o = Object.assign({}, ...JSON.parse(jsonString));
            // Handle non-exception-throwing cases:
            // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
            // but... JSON.parse(null) returns null, and typeof null === "object", 
            // so we must check for that, too. Thankfully, null is falsey, so this suffices:
            if (o && typeof o === "object") {
                //console.log({o});
                return o;
            }
        } catch(error) {
            //console.log(error);
           // throw new Error(error);
        }
    });
    
    const item = {
        id: props.route.params.item.id,
        name: props.route.params.item.name,
        description: convertToObject(props.route.params.item.description),
        uri: props.route.params.item.uri
    } 

    console.log(item.description);
    return (
        <>
            <SafeAreaView>
                <View style={styles.primaryContainer}>   
                    <ScrollView style={{width:'100%'}} keyboardShouldPersistTaps="handled">
                        <View style={styles.secondaryContainer}>
                            <Image source={{uri: item.uri}} style={styles.image}/>
                            <Text>{item.name}</Text>

                            {!(item.description) || (typeof item.description === "undefined") 
                                ? <View></View>
                                : <View>
                                    {!(item.description.AgeRange) || (typeof item.description.AgeRange === "undefined") 
                                        ? <View> 
                                            <Text style={styles.textStyle}>
                                                <Text style={styles.labelTextStyle}>Confidence:</Text>
                                                {parseFloat(item.description.Confidence).toFixed(2)}%
                                            </Text>                                                
                                            <Text style={styles.textStyle}>
                                                <Text style={styles.labelTextStyle}>Name:</Text>
                                                <Text style={styles.textStyle}>{item.description.Name}</Text>
                                            </Text>
                                            <Text style={styles.labelTextStyle}>Identified Elements:</Text>
                                            <Text style={styles.labelTextStyle}>{item.description.Parents.map(
                                                    (e) => <View key={e.Name} style={{with: '33%'}}><Text key={e.Name} style={styles.textStyle}>
                                                        {e.Name}</Text></View>
                                                    )}                                     
                                            </Text>
                                        </View>
                                        : <View style={styles.secondaryContainer}>
                                            <Text style={styles.textStyle}>
                                                <Text style={styles.labelTextStyle}>Confidence:</Text>
                                                {parseFloat(item.description.Confidence).toFixed(2)}%
                                            </Text>
                                            <Text style={styles.textStyle}>
                                                <Text style={styles.labelTextStyle}>Age:</Text>
                                                Min. {item.description.AgeRange.Low} | Max. {item.description.AgeRange.High}
                                            </Text>
                                            <Text style={styles.textStyle}>
                                                <Text style={styles.labelTextStyle}>Gender:</Text>
                                                {item.description.Gender.Value} {parseFloat(item.description.Gender.Confidence).toFixed(2)}%
                                            </Text>
                                            {item.description.Gender.Value == 'Male'
                                                ? <View style={{flex: 1, flexDirection: 'row'}}>
                                                    <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
                                                    <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
                                                    <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
                                                </View>
                                                : <View style={{flex: 1, flexDirection: 'row'}}>
                                                    <View style={{width: 50, height: 50, backgroundColor: '#FFCEE6'}} />
                                                    <View style={{width: 50, height: 50, backgroundColor: '#FA86F2'}} />
                                                    <View style={{width: 50, height: 50, backgroundColor: '#ED30CD'}} />
                                                </View>
                                            }
                                            <View style={{flex: 1, flexDirection: 'row',  width:'100%'}}>
                                                <View style={{ width: '50%'}}>
                                                    <Text style={styles.textStyle}>
                                                        <Text style={styles.labelTextStyle}>EyesOpen:</Text>
                                                        {item.description.EyesOpen.Value ? 'Yes' : 'No'}
                                                        {'\n' + parseFloat(item.description.EyesOpen.Confidence).toFixed(2)}% 
                                                    </Text>                                    
                                                    <Text style={styles.textStyle}>
                                                        <Text style={styles.labelTextStyle}>Eyeglasses:</Text>
                                                        {item.description.Eyeglasses.Value ? 'Yes' : 'No'} 
                                                        {'\n' + parseFloat(item.description.Eyeglasses.Confidence).toFixed(2)}%
                                                    </Text>
                                                    <Text style={styles.textStyle}>
                                                        <Text style={styles.labelTextStyle}>Sunglasses:</Text>
                                                        {item.description.Sunglasses.Value ? 'Yes' : 'No'} 
                                                        {'\n' + parseFloat(item.description.Sunglasses.Confidence).toFixed(2)}%
                                                    </Text>
                                                </View>
                                                <View style={{ width: '50%'}}>
                                                    <Text style={styles.textStyle}>
                                                        <Text style={styles.labelTextStyle}>Smile:</Text>
                                                        {item.description.Smile.Value ? 'Yes' : 'No'}
                                                        {'\n' + parseFloat(item.description.Smile.Confidence).toFixed(2)}%
                                                    </Text>
                                                    <Text style={styles.textStyle}>
                                                        <Text style={styles.labelTextStyle}>MouthOpen:</Text>
                                                        {item.description.MouthOpen.Value ? 'Yes' : 'No'} 
                                                        {'\n' + parseFloat(item.description.MouthOpen.Confidence).toFixed(2)}%
                                                    </Text>
                                                    <Text style={styles.textStyle}>
                                                        <Text style={styles.labelTextStyle}>Mustache:</Text>
                                                        {item.description.Mustache.Value ? 'Yes' : 'No'}
                                                        {'\n' + parseFloat(item.description.Mustache.Confidence).toFixed(2)}%
                                                    </Text>                                
                                                </View>
                                            </View>
                                            <Text style={styles.labelTextStyle}>Emotions:</Text>

                                            <View style={{width:'100%', alignItems: 'stretch'}}>
                                                <Text style={styles.textStyle}>
                                                    {item.description.Emotions.map(
                                                        (e) => <View key={e.Type} style={{with: '33%'}}><Text key={e.Type} style={styles.textStyle}>
                                                            {e.Type + '\n'} { parseFloat(e.Confidence).toFixed(2)}%{'\n'}</Text></View>
                                                    )}
                                                </Text>
                                            </View>
                                        </View>
                                    }
                                </View>
                            }
                            <View style={{height:200,flexDirection: 'row'}}>
                                <TouchableOpacity 
                                style={{marginLeft:60, marginRight: 30, alignItems: 'center'}}
                                onPress={() => navigation.goBack()}>
                                <Icon name="keyboard-return" size={80} color="#282d84" />
                                <Text style={{fontFamily: 'Barlow-Bold', fontSize: 18, color: '#282d84'}}>RETURN</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={{marginLeft:60, marginRight: 30, alignItems: 'center'}}
                                    onPress={() => { deletePhoto(item.id)}}>
                                    <Icon name="trash-can-outline" size={80} color="#282d84"/>
                                    <Text style={{fontFamily: 'Barlow-Bold', fontSize: 18, color: '#282d84'}}>DELETE</Text>
                                </TouchableOpacity>
                            </View> 
                        </View>
                    </ScrollView>
                </View> 
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    secondaryContainer: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#fff', 
    },
    primaryContainer: {
        width: '100%',
       
        backgroundColor: '#fff', 
        borderColor: 'red',
        borderWidth: 4,

    },
    screenTitleStyle: {
        marginTop: 30,
        fontSize: 36,
        color: '#282d84',              
        fontFamily: 'Barlow-Bold',
    },
    image: {
        marginVertical: 20,
        backgroundColor: 'transparent',
        height: 200,
        width: 200,

    },
    textStyle: {
        padding: 10,
        fontFamily: 'Barlow',
        fontSize: 20,
    },
    textEmotionsStyle: {
        padding: 10,
        fontFamily: 'Barlow',
        fontSize: 16,
    },
    labelTextStyle: {
        padding: 10,
        fontFamily: 'Barlow-Bold',
        fontSize: 20,
    },
    Button: {
        backgroundColor: "#7DE24E",
        width: 150,
        height: 100,
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 12,
      },
      buttonText: {
        color: "#FFFFFF", 
        fontFamily: "Barlow-Bold",
        fontSize: 24
      },
  
});


export default PhotoDetails;