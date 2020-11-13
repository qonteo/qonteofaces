import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

import Home from '../screens/Home';
import PhotosScreen from '../screens/PhotosScreen';
import PhotoDetailsScreen from '../screens/PhotoDetails';
import LogoutScreen from '../screens/LogoutScreen';

export default function DrawerRoutes() {
    return(
        <Drawer.Navigator initialRouteName="Home"
            screenOptions={{
                headerStyle: {backgroundColor: '#292d83'},
                headerTintColor: '#ffffff',                             
            }}>
            <Drawer.Screen name="Home" component={Home} />            
            <Drawer.Screen name="Photos" component={PhotosScreen} />  
            <Drawer.Screen name="PhotoDetails" component={PhotoDetailsScreen} 
                options={{drawerLabel: () => null, title: null, drawerIcon: () => null}}/>          
            <Drawer.Screen name="Logout" component={LogoutScreen} />            

        </Drawer.Navigator>
    );
}
