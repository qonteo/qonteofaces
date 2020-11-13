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
            <View style={styles.container}>
                <Text style={styles.copyRightText}>2020 Copyright Asdf Network Latam SAS.</Text>
                <Text style={styles.copyRightText}>All rights reserved.</Text>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 50
    },
    copyRightText: {
       // color: '#0a18f1',
        color: '#FFFFFF',
        fontFamily: 'Barlow-Bold',
        fontSize: 14,
    }
});





