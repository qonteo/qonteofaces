import React from 'react';
import {SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function PhotoDetails(navigation) {
    console.log("NAV ", navigation);
    const item = {
        id: navigation.route.params.item.id,
        name: navigation.route.params.item.name,
        description: Object.assign({}, ...JSON.parse(navigation.route.params.item.description)),
        url: navigation.route.params.item.uri
    } 
    
    return (
        <>
            <SafeAreaView>
                <View style={styles.primaryContainer}>   
                    <ScrollView style={{width:'100%'}} keyboardShouldPersistTaps="handled">
                        <View style={styles.secondaryContainer}>
                            <Image source={{uri: item.url}} style={styles.image}/>
                            <Text>{item.name}</Text>
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

                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
                                <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
                                <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
                            </View>

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
                                            {e.Type} { parseFloat(e.Confidence).toFixed(2)}%{'\n'}</Text></View>
                                    )}
                                </Text>
                            </View>
                            <View style={{height:200}}>
                                <TouchableOpacity 
                                    onPress={(navigation) => { navigation.navigate('Home')}}>
                                    <Icon name="trash-alt" size={30} color="#282d84" />
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
        alignItems: 'center',
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