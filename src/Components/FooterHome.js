/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

export default function Footer() {
    return (
        <>
            <View style={styles.bottom}>
                <Text style={styles.styleText}>2020 Copyright Asdf Network Latam SAS.</Text>
                <Text style={styles.styleText}>All rights reserved.</Text>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    bottom: {
        width: '100%',    
        height: '90%',   
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 0,
    },
    styleText: {
        fontFamily: 'Barlow',
        color: '#282d84',
        fontSize: 18
    }
});





