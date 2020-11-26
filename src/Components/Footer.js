import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function Footer() {
    const route = useRoute();
    let [color, setColor] = useState('#FFFFFF');
    if (route.name != 'Login') { 
        setColor = '#282d84';
    }

    return (
        <>
            <View style={styles.bottom}>
                <Text style={{fontFamily: 'Barlow', color: '#FFFFFF',
                    fontSize: 18}}>2020 Copyright Asdf Network Latam SAS.</Text>
                <Text style={{fontFamily: 'Barlow', color: '#FFFFFF',
                    fontSize: 18}}>All rights reserved.</Text>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    bottom: {
        width: '100%',
        padding: 10,
        backgroundColor: '#282d84',
        alignItems: 'center',
        marginBottom: 0,
        marginTop:'97%'
    }
});





