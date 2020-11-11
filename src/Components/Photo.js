import React from 'react';
import { SafeAreaView, View, Text, Image } from 'react-native';


export default function Item({ navigation }) {
   
    return (
        <>       
            <SafeAreaView>
                <View style={{backgroundColor: '#fff',}}>        
                    <Image source={{uri: 'https://res.cloudinary.com/aa1997/image/upload/v1535930682/pokeball-image.jpg'}}/>
                    <Text>Name</Text>
                </View>
            </SafeAreaView>
        </>
    );
}