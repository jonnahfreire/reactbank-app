import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";

import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView } from "react-native";
import { colors } from "../../../assets/colors/Colors";
import { AuthContext } from "../../../contexts/AuthContext";

export function UserHomeScreen(props: { navigation: any }) {
    const { navigation } = props;

    const { authData } = useContext(AuthContext);

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" />

            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={{color: "#FFF", fontSize: 22, fontFamily: "Inter_600SemiBold"}}>{authData?.name}</Text>
                    
                    <TouchableOpacity
                        style={styles.userAvatar}
                        onPress={() => navigation.navigate("Perfil")}
                    >
                        <Ionicons name="person-outline" size={15} color="#DDD" />
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    <Text style={{color: "#FFF", fontSize: 18, textAlign: "left", marginStart: 15, marginTop: 15, fontFamily: "Inter_600SemiBold"}}>Meus cartões</Text>
                    {authData?.cards === undefined &&
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            scrollEnabled={true}
                            style={{
                                width: "100%",
                                maxHeight: 220,
                                paddingStart: 15,
                                marginTop: 15
                            }}
                        >
                            {
                                authData?.cards?.map(card => (
                                    <View key={card.cvc}
                                        style={{
                                            width: 350,
                                            height: 220,
                                            backgroundColor: colors.slateBlue,
                                            marginRight: 20,
                                            borderRadius: 20,
                                            elevation: 5
                                        }}
                                    >
                                        <Text style={{color: "#FFF"}}>{card.owner}</Text>
                                        <Text style={{color: "#FFF"}}>{card.number}</Text>
                                        <Text style={{color: "#FFF"}}>{card.cvc}</Text>
                                        <Text style={{color: "#FFF"}}>{card.expirationDate}</Text>
                                        <Text style={{color: "#FFF"}}>{card.flag}</Text>
                                    </View>)
                                )
                            }
                        </ScrollView>
                    }
                    {
                        authData?.cards !== undefined && (
                            <Text style={{color: "#CCC", fontSize: 15, marginStart: 15, marginTop: 10, fontFamily: "Inter_600SemiBold"}}>Você ainda não tem cartão cadastrado</Text>
                            
                        )
                    }
                    <Text style={{color: "#FFF", fontSize: 18, textAlign: "left", marginStart: 15, marginTop: 15, fontFamily: "Inter_600SemiBold"}}>Meus pedidos</Text>

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
        height: 50,
        width: "100%",
        flexDirection: "row",
        paddingHorizontal: 15,
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 0.3,
        borderBottomColor: "#AAA",
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
        alignItems: "flex-start",
        justifyContent: "flex-start",
    }
});