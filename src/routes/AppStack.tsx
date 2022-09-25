import React, { useContext, useEffect, useState } from 'react';

import CustomHeader from '../components/CustomHeader';
import { colors } from '../assets/colors/Colors';
import { AuthContext } from '../contexts/AuthContext';

import { UserHomeScreen } from '../screens/AppScreens/UserScreens/UserHomeScreen';
import { UserPerfil } from '../screens/AppScreens/UserScreens/UserPerfilScreen';
import { UserCardPresentationScreen } from '../screens/AppScreens/UserScreens/UserCardPresentationsScreen';

import { AdminHomeScreen } from '../screens/AppScreens/AdminScreens/AdminHomeScreen';
import { AdminPerfil } from '../screens/AppScreens/AdminScreens/AdminPerfilScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserCreateCardScreen } from '../screens/AppScreens/UserScreens/UserCreateCardScreen';

const Stack = createNativeStackNavigator();

const headerOptions = {
    headerBackVisible: false,
    headerShadowVisible: false,
}

export default function AppStack() {
    const { authData } = useContext(AuthContext);

    const [ initialUserRoute, setInitialUserRoute ] = useState("CardPresentation");
    const [ isAdmin, setIsAdmin ] = useState(false);
    const [ userHasCards, setUserHasCards ] = useState(false);

    useEffect(() => {
        authData?.permission === "admin"
        && setIsAdmin(true);

        if(authData?.cards !== undefined && authData.cards.length > 0) {
            setInitialUserRoute("Home");
            setUserHasCards(true)
        }
    }, []);

    return (
        <>
            {isAdmin ? (
                <Stack.Navigator initialRouteName='Home'>
                    <Stack.Screen name="AdminHome" component={AdminHomeScreen} options={{headerShown: false}}/>
                    <Stack.Screen name="AdminPerfil" component={AdminPerfil} 
                        options={{ headerTitle: ()=> <CustomHeader iconColor='#CCC' />, headerStyle: {backgroundColor: colors.bgColor}, ...headerOptions}}
                    />
                </Stack.Navigator>
            ) : (
                <Stack.Navigator initialRouteName={initialUserRoute}>
                    <Stack.Screen name="Home" component={UserHomeScreen} options={{headerShown: false}}/>
                    {!userHasCards && <Stack.Screen name="CardPresentation" component={UserCardPresentationScreen} options={{headerShown: false}}/>}
                    <Stack.Screen name="CreateCard" component={UserCreateCardScreen} 
                        options={{ headerTitle: ()=> <CustomHeader iconColor='#CCC' />, headerStyle: {backgroundColor: colors.bgColor}, ...headerOptions}}
                    />
                    <Stack.Screen name="Perfil" component={UserPerfil} 
                        options={{ headerTitle: ()=> <CustomHeader iconColor='#CCC' />, headerStyle: {backgroundColor: colors.bgColor}, ...headerOptions}}
                    />
                </Stack.Navigator>
            )}
        </>
    );
}