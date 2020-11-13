import React from 'react';
import {SafeAreaView, View, Text, Image, StyleSheet } from 'react-native';

const PhotoDetails = (navigation) => {
    console.log("ITEM", navigation.route.params);
    
    const item = {
        id: navigation.route.params.item.id,
        name: navigation.route.params.item.name,
        uri: navigation.route.params.item.uri
    } 
    
    return (
        <>
            <SafeAreaView>
                <View style={{backgroundColor: '#fff',}}>        
                    <Image source={{uri: 'https://dashboard.qonteo.com/photo-album/images/'}}/>
                    <Text>name</Text>
                </View>
            </SafeAreaView>
        </>
    );
}

export default PhotoDetails;
