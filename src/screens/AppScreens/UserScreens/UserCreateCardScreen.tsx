import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../../assets/colors/Colors";
import { AuthContext } from "../../../contexts/AuthContext";

import { useFonts, Inter_600SemiBold } from "@expo-google-fonts/inter";

import { CardProps, createCard } from "../../../services/CardService";
import Input from "../../../components/Input";
import { Formik } from "formik";
import { Options, Select } from "../../../components/SelectList";

export function UserCreateCardScreen(props?: { navigation: any }) {
    const navigation = props?.navigation;

    const { authData, updateUserInfo } = useContext(AuthContext);
    const [ card, setCardInfo ] = useState<CardProps>();
    const [ selectedCardTypeOption, setSelectedCardTypeOption ] = useState<Options>();
    const [ selectedCardFlagOption, setSelectedCardFlagOption ] = useState<Options>();

    useEffect(() => {
        if(!card) {
            setCardInfo(createCard())
        }

    }, [])
    
    const [fontsLoaded] = useFonts({
        Inter_600SemiBold,
    });

    function handleSubmitCreateCard(values: any) {
        if(selectedCardFlagOption === undefined) {
            Alert.alert("Atenção!", "Selecione o tipo de bandeira");
            return;
        }
        
        if(selectedCardTypeOption === undefined) {
            Alert.alert("Atenção!", "Selecione o tipo de cartão");
            return;
        }

        values = {
            ...values, 
            type: selectedCardTypeOption?.title, 
            flag: selectedCardFlagOption.title,
            owner: values.owner ? values.owner : authData?.name
        }
        delete values["name"]
        updateUserInfo({id: authData?.email, cards: [values]})
        .then(res => {
            if(res.error) {
                Alert.alert("Desculpe!", "Não foi possível enviar a solicitação. Tente novamente!");
            } else {
                Alert.alert(
                    "Sucesso!", 
                    "A sua solicitação foi enviada para análise, e está sujeita a aprovação.",
                    [
                        {text: "Ok", onPress: () => {
                            setTimeout(() => 
                                navigation.navigate("Home"),
                                500
                            )
                        }, style: "destructive"},
                    ] 
                );
            }
        })
    }

    if(!fontsLoaded) return null;

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" />

            <View style={styles.container}>
                <View style={[styles.header, { paddingBottom: 5, alignItems: "flex-end", justifyContent: "flex-start"}]}>
                    <Text style={{color: "#FFF", fontSize: 22, fontFamily: "Inter_600SemiBold"}}>
                        Adicione um cartão, ou crie um novo.
                    </Text>
                </View>

                <Text style={{color: "#CCC", width: "95%", fontSize: 15, marginStart: 15, marginTop: 15, fontFamily: "Inter_600SemiBold", marginBottom: 20}}>
                    Preencha as informações para adicionar um cartão, ou clique em continuar para criar um novo automaticamente.
                </Text>
                <ScrollView
                    style={{flex: 1, width: "100%"}}
                >
                    <View style={{ flex: 4, width: "100%", alignItems: "center", justifyContent: "center" }}>                    
                        <Formik 
                            initialValues={{ ...card  }}
                            validateOnChange={true}
                            validateOnMount={true}
                            onSubmit={(values) => handleSubmitCreateCard(values)}
                        >
                            {
                                ({ handleChange, handleBlur, handleSubmit, values, errors, isValid, setFieldValue}) => (
                                    <>
                                        <Input 
                                            type="text"
                                            placeholder="Nome completo"
                                            icon="person-outline"
                                            iconRight={
                                                !errors.owner ? "checkmark-outline"
                                                : values?.owner.length === 0 ? "" : "close-outline"
                                            }
                                            onChangeText={handleChange("owner")}
                                            iconPress={() => {setFieldValue("owner", "")}}
                                            onBlur={handleBlur("owner")}
                                            value={authData?.name || values?.owner}
                                            styleProps={{marginTop: "5%", marginBottom: 5}}                                    
                                        />
                                        <Input 
                                            type="text"
                                            placeholder="0000 0000 0000 0000"
                                            icon="card-outline"
                                            iconRight={
                                                !errors.number ? "checkmark-outline"
                                                : values?.number.length === 0 ? "" : "close-outline"
                                            }
                                            onChangeText={handleChange("number")}
                                            iconPress={() => {setFieldValue("number", "")}}
                                            onBlur={handleBlur("number")}
                                            value={values.number?.split("-").join(" ")}
                                            styleProps={{marginTop: "5%", marginBottom: 5}}
                                        />
                                        <Input 
                                            type="text"
                                            placeholder="CVC"
                                            icon="key-outline"
                                            iconRight={
                                                !errors.cvc ? "checkmark-outline"
                                                : values?.cvc?.length === 0 ? "" : "close-outline"
                                            }
                                            onChangeText={handleChange("cvc")}
                                            iconPress={() => {setFieldValue("cvc", "")}}
                                            onBlur={handleBlur("cvc")}
                                            value={values?.cvc?.toString()}
                                            styleProps={{marginTop: "5%", marginBottom: 5}}                                    
                                        />
                                        <Input 
                                            type="text"
                                            placeholder="Data de validade"
                                            icon="calendar-outline"
                                            iconRight={
                                                !errors.expirationDate ? "checkmark-outline"
                                                : values?.expirationDate?.length === 0 ? "" : "close-outline"
                                            }
                                            onChangeText={handleChange("expirationDate")}
                                            iconPress={() => {setFieldValue("expirationDate", "")}}
                                            onBlur={handleBlur("expirationDate")}
                                            value={values?.expirationDate?.toString()}
                                            styleProps={{marginTop: "5%", marginBottom: 5}}                                    
                                        />
                                        <Select 
                                            icon="card-outline"
                                            placeholder="Bandeira"
                                            style={{marginTop: 20}}
                                            options={[
                                                {title: "Visa", id: "visa"},
                                                {title: "MasterCard", id: "mastercard"},
                                                {title: "Elo", id: "elo"},
                                                {title: "American Express", id: "american-express"},
                                            ]}
                                            currentValueSelected={selectedCardFlagOption}
                                            getCurrentSelected={(option) => {
                                                setSelectedCardFlagOption(option);
                                            }}
                                        />
                                        <Select 
                                            icon="card-outline"
                                            placeholder="Tipo de cartão"
                                            style={{marginTop: 20}}
                                            options={[
                                                {title: "Crédito", id: "C"},
                                                {title: "Débito", id: "D"},
                                                {title: "Poupança", id: "P"},
                                            ]}
                                            currentValueSelected={selectedCardTypeOption}
                                            getCurrentSelected={(option) => {
                                                setSelectedCardTypeOption(option);
                                            }}
                                        />
                                        <TouchableOpacity
                                            style={{
                                                width: "90%",
                                                height: 50,
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                backgroundColor: colors.slateBlue,
                                                padding: 10,
                                                marginTop: 50,
                                                borderRadius: 10
                                            }}
                                            onPress={() => handleSubmit()}
                                        >
                                            <Text style={{fontSize: 15, color: "#FFF", fontWeight: "600", marginEnd: 5, fontFamily: "Inter_600SemiBold"}}>Continuar</Text>
                                            <Ionicons name="arrow-forward-outline" size={24} color="#DDD" />
                                        </TouchableOpacity>
                                    </>
                                )
                            }
                        </Formik>
                    </View>
                </ScrollView>
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
        justifyContent: "center"
    },
    header: {
        height: 70,
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
        justifyContent: "center",
        paddingHorizontal: 20
    },
    errorsContainer: {
		width: '90%',
        alignItems: 'flex-start',
		justifyContent: 'center',
    },
    errors: {
        fontFamily: 'Inter_600SemiBold',
		color: colors.lightRed,
        textAlign: 'left',
        marginStart: 5
    }
});