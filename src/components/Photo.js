//import React form react
import React from 'react';
import { TouchableOpacity, Text, View, Image, StyleSheet } from 'react-native';


//Define your stateless componetns, and destrcuts props from function arguments

export default function Photo ({id, name, description, url, navigation}) {
    const item = {
        id: id,
        name: name,
        description: description.replace(/(\r\n|\n|\r)/gm,"").replace(/ /g,''),
        uri: url
    }

    return (
        <TouchableOpacity style={{backgroundColor: 'transparent'}} 
            onPress={() => { 
                navigation.navigate('PhotoDetails', {item})}}>
            <View  style={styles.listItemContainer}>                
                <Image source={{uri: url}} 
                        style={styles.itemImage}/>
                <Text style={styles.itemHeader}>{name}</Text>
            </View>
        </TouchableOpacity>
    )
}


styles = StyleSheet.create({
    // Photos Styles
    listItemContainer: {
        backgroundColor: '#ffffff',
        /*
        borderStyle: 'solid',
        borderColor: '#292d83',
        borderBottomWidth: 2,
        */
        flexDirection: 'column',
        alignItems: 'center',
        padding: 2

    },
    itemHeader: {  
        color: '#292d83',
        fontSize: 24,
    },
    itemImage: {
        backgroundColor: 'transparent',
        height: 120,
        width: 120
    }
});