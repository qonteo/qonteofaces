import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';


const App: () => React$Node = () => {
    const navigation = useNavigation();

    return (
        <>
            <View>
                <View style={styles.viewRow}>
                    <View style={styles.leftContainer}><Text style={{color:'#FFFFFF'}}> </Text></View>
                    <View style={styles.rightContainer}>
                        <TouchableOpacity style={{
                                backgroundColor: "#282d84",
                                width: 150,
                                height: 100,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 12,
                            }} onPress={() => navigation.toggleDrawer()} >                                
                            <Text style={{color:'#FFFFFF'}}>Menu</Text>
                        </TouchableOpacity>
        
                        
                    </View>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    viewRow: {
        flexDirection: "row", 
        justifyContent: 'space-between',
        paddingHorizontal: 5,
    },
    leftContainer: {
        flex: 1,
        flexDirection: "row", 
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftContainer: {
        flex: 1,
        flexDirection: "row", 
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    rightContainer: {
        flex: 1,
        flexDirection: "row", 
        justifyContent: 'flex-end',
        padding: 10,
        alignItems: 'center',
    },
    headerText: {
        color: '#0a18f1',
        fontFamily: 'Barlow-Bold',
        fontSize: 14,
        textAlign: 'left',
        
    },

});
export default App;




