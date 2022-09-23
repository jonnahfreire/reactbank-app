import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { colors } from "../assets/colors/Colors";
import CustomHeader from "./CustomHeader";

export function HeaderBackground() {
    return (
        <View style={{backgroundColor: colors.bgColor}}>
            <StatusBar style="light"/>

            <CustomHeader />
        </View>
    )
}