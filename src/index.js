import React, {useEffect} from 'react';
import Routes from './routes';
import { NavigationContainer } from '@react-navigation/native';


export default function app() {
 
  return (
    <NavigationContainer>
        <Routes />
    </NavigationContainer>
  );
}
