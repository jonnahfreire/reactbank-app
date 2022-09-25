import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import Login from '../screens/AuthScreens/LoginScreen';
import SignUp from '../screens/AuthScreens/SignUpScreen';
import Recover from '../screens/AuthScreens/RecoverScreen';

import CustomHeader from '../components/CustomHeader';
import { colors } from '../assets/colors/Colors';

const Stack = createNativeStackNavigator();

const headerOptions = {
    headerBackVisible: false,
    headerShadowVisible: false,
}

export default function AuthStack() {

    return (
        <Stack.Navigator initialRouteName='Splash'>
            <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown: false}} />
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
            <Stack.Screen name="SignUp" component={SignUp} 
                options={{ headerTitle: ()=> <CustomHeader iconColor='#CCC' />, headerStyle: {backgroundColor: colors.bgColor}, ...headerOptions}}
            />
            <Stack.Screen name="Recover" component={Recover} 
                options={{headerTitle: ()=> <CustomHeader iconColor='#CCC'/>, headerStyle: {backgroundColor: colors.bgColor}, ...headerOptions}}
            />
        </Stack.Navigator>
    );
}