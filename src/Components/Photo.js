//import React form react
import React from 'react';
import { TouchableOpacity, Text, View, Image, StyleSheet } from 'react-native';


//Define your stateless componetns, and destrcuts props from function arguments
const Photo = ({id, name, description, url, navigation}) => {

    const item = {
        id: id,
        name: name,
        description: description.replace(/(\r\n|\n|\r)/gm,"").replace(/ /g,''),
        uri: url
    }

console.log({item})
    return (
        <TouchableOpacity style={{backgroundColor: 'transparent'}} 
            onPress={() => navigation.navigate('PhotoDetails', {item})}>
            <View  style={styles.listItemContainer}>
                <Text style={styles.itemHeader}>{name}</Text>
                <Image source={{uri: url}} 
                        style={styles.itemImage}/>
            </View>
        </TouchableOpacity>
    )
}


styles = StyleSheet.create({
    // Photos Styles
    listItemContainer: {
        backgroundColor: '#ffffff',
        borderStyle: 'solid',
        borderColor: '#292d83',
        borderBottomWidth: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20
    },
    itemHeader: {  
        color: '#292d83',
        fontSize: 24,
    },
    itemImage: {
        backgroundColor: 'transparent',
        height: 50,
        width: 50
    },

})
export default Photo;