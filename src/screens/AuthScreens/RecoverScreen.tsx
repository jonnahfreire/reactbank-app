import { useFonts, Inter_600SemiBold } from "@expo-google-fonts/inter";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { colors } from "../../assets/colors/Colors";
import Input from "../../components/Input";
import { AuthContext } from "../../contexts/AuthContext";
import { passRecoverValidationSchema } from "../../validators/FormValidators";


export default function Recover({ navigation }) {
    const { sendResetPasswordLinkViaEmail } = useContext(AuthContext);
    const [ sent, setSent ] = useState(false);

    const [ fontsLoaded ] = useFonts({
        Inter_600SemiBold
    })

    async function sendResetLinkEmail({ email }) {
        if (email.length > 0) {
            await sendResetPasswordLinkViaEmail(email)
            
            Alert.alert(
                "Link enviado!", 
                "Verifique seu email, cadastre uma nova senha e faça login",
                [{text: "Ok", onPress: () => navigation.goBack(), style: "destructive"}]
            );            
        }
    }

    if(!fontsLoaded) return null;

    return (
        <KeyboardAvoidingView style={{flex: 1}}>
            <StatusBar style="dark" />
            <View style={[styles.container]}>
                <View
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        flex: 1,
                        width: "100%",
                        backgroundColor: "#FFF"
                    }}
                >
                    <Text 
                        style={{
                            width: "90%", 
                            marginBottom: 50,
                            fontSize: 20,
                            textAlign: "center",
                            fontFamily: "Inter_600SemiBold"
                        }}
                        >
                        Siga os passos abaixo para recuperar sua senha
                    </Text>
                    
                    <Formik 
                        initialValues={{email: ""}}
                        validateOnChange={true}
                        validateOnMount={true}
                        onSubmit={(values) => sendResetLinkEmail(values)}
                        validationSchema={passRecoverValidationSchema}
                        >
                        {({ handleChange, handleBlur, handleSubmit, values, touched, errors, setFieldValue}) => (
                            <>
                                <Input 
                                    type="email"
                                    placeholder="Informe seu email cadastrado"
                                    textContentType="emailAdress"
                                    icon="mail-outline"
                                    iconRight={
                                        !errors.email ? "checkmark-outline"
                                        : values.email == "" ? "" : "close-outline"
                                    }
                                    onChangeText={handleChange("email")}
                                    iconPress={() => {setFieldValue("email", "")}}
                                    onBlur={handleBlur("email")}
                                    value={values.email}
                                    styleProps={{marginTop: 25, marginBottom: 5}}
                                />
                                {(errors.email && touched.email) &&
                                    <View style={styles.errorsContainer}>
                                        <Text style={styles.errors}>{errors.email}</Text>
                                    </View>
                                }

                                <TouchableOpacity
                                    style={{
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: colors.darkBlue,
                                        width: "90%",
                                        height: 45,
                                        borderRadius: 10,
                                        elevation: 5,
                                        marginTop: 25
                                    }}
                                    onPress={() => handleSubmit()}
                                    >
                                    <Text style={{color: "#FFF", fontSize: 18}}>Enviar Link</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </Formik>
                    <Text style={{width: "90%", marginTop: 50, color: "#777"}}>* Ao enviar, um link de recuperação de senha será enviado para o seu email cadastrado</Text>
                </View>
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
    errorsContainer: {
		width: '90%',
        alignItems: 'flex-start',
		justifyContent: 'center',
    },
    errors: {
        fontFamily: 'Inter_600SemiBold',
		color: colors.darkRed,
        textAlign: 'left'
    }
});