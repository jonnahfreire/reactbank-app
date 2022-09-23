import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import Perfil from '../screens/AppScreens/PerfilScreen';
import { colors } from '../assets/colors/Colors';


const Tab = createMaterialBottomTabNavigator();

export default function AppStack() {
    return (
        <Tab.Navigator 
            initialRouteName="Courses"
            activeColor={colors.lightBlue}
            inactiveColor="rgb(180, 180, 180)"
            shifting={true}
            barStyle={{ 
                backgroundColor: 'rgb(245, 245, 245)',
                elevation: 0
            }}
        >
            {/* <Tab.Screen 
                name="Box" 
                component={""} 
                options={{
                    title: "Ajuda",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="message-question-outline" color={color} size={26} />
                    ),
                    tabBarAccessibilityLabel: "Ajuda",
                    tabBarLabel: "Ajuda"
                }}
            /> */}
            <Tab.Screen 
                name="Perfil" 
                component={Perfil} 
                options={{
                    title: "Perfil",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="person-outline" color={color} size={26} />
                    ),
                    tabBarAccessibilityLabel: "Perfil"
                }}
            />
        </Tab.Navigator>
    );
}