import { useFonts, Inter_600SemiBold } from "@expo-google-fonts/inter";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from "react-native";
// import { privacyPolicyAndUsageTerms } from "../../utils/usage.terms";

function UsageContentItem({ title, content, titleStyle=undefined, contentStyle=undefined }) {
    return (
        <View>
            <Text 
                style={[{
                    width: "95%", 
                    marginBottom: 30,
                    fontSize: 20,
                    textAlign: "center",
                    fontFamily: "Inter_600SemiBold"
                }, titleStyle]}
            >
                {title}
            </Text>
            <Text 
                style={[{
                    width: "95%", 
                    marginBottom: 30,
                    marginHorizontal: 10,
                    fontSize: 15,
                    textAlign: "justify",
                    color: "#444"
                }, contentStyle]}
            >
                {content}
            </Text>
        </View>
    );
}
export default function UsageTerms() {

    const [ fontsLoaded ] = useFonts({
        Inter_600SemiBold
    })

    if(!fontsLoaded) return null;
    return (<View></View>)

    return (
        <KeyboardAvoidingView style={{flex: 1}}>
            <StatusBar style="light" />
            <View style={[styles.container]}>
                            
                <ScrollView
                    horizontal={false}
                    style={{ width: "100%", backgroundColor: "#FFF" }}>
                    
                    <UsageContentItem title={privacyPolicyAndUsageTerms.privacyPolicyTitle} content={privacyPolicyAndUsageTerms.privacyPolicy} titleStyle={{marginBottom: 10}} contentStyle={{marginBottom: 40}} />
                    <UsageContentItem title={privacyPolicyAndUsageTerms.usageTermsTitle} content="" titleStyle={{marginBottom: -40}}/>
                    <UsageContentItem title={privacyPolicyAndUsageTerms.usageTermsAcceptanceTitle} content={privacyPolicyAndUsageTerms.usageTerms} titleStyle={{marginBottom: 10}} />
                    <UsageContentItem title={privacyPolicyAndUsageTerms.usageTermsLicenseTitle} content={privacyPolicyAndUsageTerms.usageTermsLicense} titleStyle={{marginBottom: 10}} />
                    <UsageContentItem title={privacyPolicyAndUsageTerms.usageTermsRightsTitle} content={privacyPolicyAndUsageTerms.usageTermsRights} titleStyle={{marginBottom: 10}} />
                    <UsageContentItem title={privacyPolicyAndUsageTerms.usageTermsDataCollectingTitle} content={privacyPolicyAndUsageTerms.usageTermsDataCollecting} titleStyle={{marginBottom: 10}} />
                    <UsageContentItem title={privacyPolicyAndUsageTerms.usageTermsDataGuarantiesTitle} content={privacyPolicyAndUsageTerms.usageTermsDataGuaranties} titleStyle={{marginBottom: 10}} />
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});