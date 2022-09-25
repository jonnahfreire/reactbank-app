import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React from "react";

import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../../assets/colors/Colors";

export function AdminHomeScreen(props: { navigation: any }) {
    const { navigation } = props;

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" />

            <View style={styles.container}>
                <View style={styles.header}>
                    <View></View>
                    {/* <Text style={{color: "#FFF"}}>Header Content</Text> */}
                    
                    <TouchableOpacity
                        style={styles.userAvatar}
                        onPress={() => navigation.navigate("AdminPerfil")}
                    >
                        <Ionicons name="person-outline" size={15} color="#DDD" />
                    </TouchableOpacity>
                </View>
                <View style={styles.content}>
                    <Text style={{color: "#FFF"}}>Admin Home</Text>
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
        alignItems: "center",
        justifyContent: "center",
    }
});