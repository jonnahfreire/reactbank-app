import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";

import { ScreenHeight, ScreenWidth } from "../utils/dimensions";

import { 
    useFonts,
    Inter_600SemiBold,
    Inter_400Regular
} from "@expo-google-fonts/inter";

import { colors } from "../assets/colors/Colors";
import LottieView from "lottie-react-native";


export default function SplashScreen({ navigation }) {

    const [fontsLoaded] = useFonts({
        Inter_600SemiBold, Inter_400Regular
    });

    if(!fontsLoaded) return null;

    return (
        <View style={[styles.container]}>
            <StatusBar style="light"/>

            <View style={{width: '100%', height: "35%", marginTop: 50, justifyContent: "center", alignItems: "center"}}>
                <LottieView resizeMode="contain" autoPlay source={require('../assets/animated/banking.json')} />
            </View>
            <View style={{flex: 1, width: '100%', justifyContent: "center", alignItems: "center", borderBottomLeftRadius: 30}}>
                <Text style={styles.textContentTitle}>ReactBank</Text>
                {/* <Text style={[styles.textContent, {marginBottom: 10}]}>Reaja ao descontrole financeiro.</Text> */}
                <Text style={[styles.textContent, {marginTop: 0, fontSize: 13}]}>Esteja no controle das suas finanças, gerencie seus cartões com facilidade de maneira ágil e sem a burocracia dos atendimentos em agências.</Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.redirectButton, {backgroundColor: colors.slateBlue}]}
                    onPress={() => navigation.navigate("Login")}
                >
                    <Text style={styles.buttonText}>Acessar minha conta</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.redirectButton, 
                        {
                            marginBottom: 50,
                            marginTop: 30,
                            backgroundColor: "transparent",
                            elevation: 0,
                            borderWidth: 1,
                            borderColor: "rgba(210, 210, 210, 0.5)"
                        }]}
                    onPress={() => navigation.navigate("SignUp")}
                >
                    <Text style={[styles.buttonText]}>Ainda não tenho conta</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.bgColor
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: "flex-end",
        alignItems: 'center'
    },
    textContentTitle: {
        color: "#ddd", 
        fontFamily: "Inter_600SemiBold", 
        fontSize: 28,
        marginBottom: 25,
    },
    textContent: {
        width: '90%',
        color: "#aaa", 
        fontFamily: "Inter_600SemiBold", 
        fontSize: 18,
        lineHeight: 25,
        textAlign: "center"
    },
    buttonContainer: {
        flex: 1,
        width: ScreenWidth,
        height: ScreenHeight,
        justifyContent: "center",
        alignItems: 'center',
    },
    redirectButton: {
        width: '90%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderRadius: 10,
        elevation: 5
    }, 
    buttonText: {
        color: '#FFF',
        fontFamily: 'Inter_600SemiBold'
    },
});