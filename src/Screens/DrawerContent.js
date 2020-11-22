import React from 'react';
import { View, StyleSheet} from 'react-native';
import { 
    Avatar, 
    Title, 
    Caption, 
    Paragraph, 
    Drawer, 
    Text, 
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../provider'; 

export function DrawerContent(props) {
    const {state, setState} = useAuth();
    const user = state.user;
    //console.log({user});
    const [isDarkTheme, setIsDarkTheme] = React.useState(false);

    let user_portrait_p = false;
    if (user) {
        if (user.portrait_url != ''){
            user_portrait_p = true;
        }
    }

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    }

    
    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView { ...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row', marginTop: 15}}>
                            {user_portrait_p == true 
                                ?   <Avatar.Image
                                    source={{ uri: user.portrait_url }}
                                    size={60}/>
                                :   <Avatar.Image
                                        source={require('../assets/images/add-user.png')}
                                        style={{backgroundColor: '#ffffff'}}
                                        size={60}/>
                
                            }
                            <View style={{marginLeft: 15, flexDirection: 'column'}}>
                                <Title style={styles.title}>{user.firstName} {user.lastName}</Title>
                                <Caption style={styles.caption}>{user.email}</Caption>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
                                <Caption style={styles.caption}>Uploaded files</Caption>
                            </View>
                        </View>
                    </View>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="home-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => {props.navigation.navigate('Home')}}/>
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="camera"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Photos"
                            onPress={() => {props.navigation.navigate('Photos')}}/>
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="video-vintage"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Videos"
                            onPress={() => {}}/>
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="account-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Profile"
                            onPress={() => {}}/>
                    </Drawer.Section>
                    <Drawer.Section title="Preferences">
                        <TouchableRipple onPress={() => {toggleTheme()}}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={isDarkTheme}/>
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem icon={({color, size}) => (
                    <Icon
                        name="exit-to-app"
                        color={color}
                        size={size}/>
                    )}
                    label="Sign Out"
                    onPress={() => {props.navigation.navigate('Logout')}}
                />
            </Drawer.Section>
        </View>
    );
}



const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });