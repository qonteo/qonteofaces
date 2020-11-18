import React from 'react';
import {SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const PhotoDetails = (navigation) => {
    console.log("ITEM", navigation);
    
    const item = {
        id: navigation.route.params.item.id,
        name: navigation.route.params.item.name,
        url: navigation.route.params.item.uri
    } 
    
    return (
        <>
            <SafeAreaView>
                <View style={{backgroundColor: '#fff',}}>        
                    <Image source={{uri: item.url}}/>
                    <Text>{item.name}</Text>

                </View>
                
            </SafeAreaView>
        </>
    );
}

export default PhotoDetails;
