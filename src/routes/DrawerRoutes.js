import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from '../screens/DrawerContent';

const Drawer = createDrawerNavigator();

import HomeScreen from '../screens/Home';
import PhotosScreen from '../screens/PhotosScreen';
import PhotoDetailsScreen from '../screens/PhotoDetails';
import UpdateProfileScreen from '../screens/UpdateProfile';
import LogoutScreen from '../screens/Logout';


export default function DrawerRoutes() {
    return(
        <Drawer.Navigator initialRouteName="Home"
            drawerContent={props => <DrawerContent { ... props} /> }
            drawerContentOptions={{
                activeTintColor: '#282d84',
        
            }}
            screenOptions={{
                headerStyle: {backgroundColor: '#292d83'},
                headerTintColor: '#ffffff',                             
            }}>
            <Drawer.Screen name="Home" component={HomeScreen} />            
            <Drawer.Screen name="Photos" component={PhotosScreen} />  
            <Drawer.Screen name="PhotoDetails" component={PhotoDetailsScreen} 
                options={{drawerLabel: () => null, title: "Photo Details"}}/>          
            {/*<Drawer.Screen name="PhotoDetails" component={PhotoDetailsScreen} 
                options={{drawerLabel: () => null, title: "Photo Details", drawerIcon: () => null}} />*/}
            <Drawer.Screen name="UpdateProfile" component={UpdateProfileScreen} />  
            <Drawer.Screen name="Logout" component={LogoutScreen} />            

        </Drawer.Navigator>
    );
}
