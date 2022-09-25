import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../../assets/colors/Colors";
import { AuthContext } from "../../../contexts/AuthContext";

import LottieView from 'lottie-react-native';



import { 
    useFonts,
    Inter_600SemiBold
} from "@expo-google-fonts/inter";

export function UserCardPresentationScreen(props?: { navigation: any }) {
    const navigation = props?.navigation;

    const { authData } = useContext(AuthContext);
    const [ userHasCards, setUserHasCards ] = useState(false);

    useEffect(() => {
        if(authData?.cards !== undefined && authData.cards.length > 0) {
            setUserHasCards(true);
        }
    }, [])
    
    const [fontsLoaded] = useFonts({
        Inter_600SemiBold,
    });

    if(!fontsLoaded) return null;

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" />

            <View style={styles.container}>
                <View style={[styles.header, { paddingBottom: 5, alignItems: "flex-end", justifyContent: "flex-start"}]}>
                    <Text style={{color: "#FFF", fontSize: 30, fontFamily: "Inter_600SemiBold"}}>Olá,</Text>
                    <Text style={{color: "#FFF", fontSize: 20, marginStart: 5, fontFamily: "Inter_600SemiBold"}}>{authData?.name?.split(' ')[0]}</Text>
                </View>

                <View style={{width: "100%", padding: 10 }}>
                    {
                        !userHasCards &&
                        <>
                            <Text style={{color: "#FFF", fontSize: 26, marginStart: 5, fontFamily: "Inter_600SemiBold"}}>Ainda não tem um cartão?</Text>
                            <View 
                                style={{
                                    width: '100%', 
                                    height: "50%",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginTop: 20,
                                }}>
                                <LottieView resizeMode="contain" autoPlay source={require('../../../assets/animated/mobile-payments.json')} />
                            </View>
                            
                            <Text style={{color: "#DDD", fontSize: 16, textAlign: "center", marginTop: 50, marginStart: 5, fontFamily: "Inter_600SemiBold"}}>
                                Para começar a utilizar nossos serviços, solicite um de nossos cartões,
                                e aproveite todos os benefícios sem taxas.
                            </Text>
                        </>
                    }

                </View>
                
                <View style={styles.content}>
                    {!userHasCards &&
                        <>
                            <TouchableOpacity
                                style={{
                                    width: 120,
                                    height: 50,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: "#444",
                                    padding: 10,
                                    paddingHorizontal: 20,
                                    borderRadius: 10
                                }}
                                onPress={() => navigation.replace("Home")}
                                >
                                <Text style={{fontSize: 15, color: "#FFF", fontWeight: "600", fontFamily:"Inter_600SemiBold"}}>Agora não</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    flex: .7,
                                    width: 200,
                                    height: 50,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: colors.slateBlue,
                                    padding: 10,
                                    paddingHorizontal: 20,
                                    borderRadius: 10
                                }}
                                onPress={() => navigation.navigate("CreateCard")}
                            >
                                <Text style={{fontSize: 15, color: "#FFF", fontWeight: "600", marginEnd: 5, fontFamily: "Inter_600SemiBold"}}>Continuar</Text>
                                <Ionicons name="arrow-forward-outline" size={24} color="#DDD" />
                            </TouchableOpacity>
                        </>
                    }
                </View>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.bgColor
    },
    container: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    header: {
        marginTop: 45,
        height: 60,
        width: "100%",
        flexDirection: "row",
        paddingHorizontal: 15,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    userAvatar: {
        alignItems: "center",
        justifyContent: "center",
        width: 30,
        height: 30,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "#FFF",
        padding: 2
    },
    content: {
        flex: 1,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20
    }
});