import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const MainStack = createStackNavigator();

import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/Login';
import FaceLoginScreen from '../screens/FaceLogin';
import RegisterScreen from '../screens/Register';
import ForgotPasswordScreen from '../screens/ForgotPassword';
import DrawerRoutes from './DrawerRoutes';

import { View, StatusBar } from 'react-native';
import AuthProvider from "../provider";


export default function Routes({ navigation }) {
    return(
        <View style={{flex: 1}}>    
            <StatusBar
                backgroundColor='#292d83'
                color='#effbf7'
                barStyle="light-content"
            />
            <AuthProvider>
                <MainStack.Navigator initialRouteName="SplashScreen" >
                    <MainStack.Screen name="SplashScreen"
                        component={SplashScreen}
                        options={{headerShown:false}}/>
                    <MainStack.Screen name="Login"
                        component={LoginScreen}
                        options={{headerShown:false}}/>
                    <MainStack.Screen name="FaceLogin"
                        component={FaceLoginScreen}
                        options={{headerShown:false}}/>
                    <MainStack.Screen name="Register"
                        component={RegisterScreen}
                        options={{headerShown:false}}/>
                    <MainStack.Screen name="ForgotPassword"
                        component={ForgotPasswordScreen}
                        options={{headerShown:false}}/>
                    <MainStack.Screen name="Home"
                        component={DrawerRoutes}
                        options={{headerShown:false}}/>
                </MainStack.Navigator>
            </AuthProvider>
        </View>
    );
}