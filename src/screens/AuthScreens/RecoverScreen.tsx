import { useFonts, Inter_600SemiBold } from "@expo-google-fonts/inter";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import React, { useContext } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { colors } from "../../assets/colors/Colors";
import Input from "../../components/Input";
import { AuthContext } from "../../contexts/AuthContext";
import { passRecoverValidationSchema } from "../../validators/FormValidators";


export default function Recover(props: { navigation: any }) {
    const { navigation } = props;
    const { sendResetPasswordLinkViaEmail } = useContext(AuthContext);

    const [ fontsLoaded ] = useFonts({
        Inter_600SemiBold
    })

    async function sendResetLinkEmail(props: { email: string, name: string, cpf: string }) {
        const { email, name, cpf } = props;
        const CPF = cpf.replace(/\D/g, '');

        if (email.length > 0 && CPF.length > 0) {
            const response = await sendResetPasswordLinkViaEmail(email, CPF);

            if(response.error) Alert.alert("Desculpe!", response.message);
            else {
                Alert.alert(
                    "Enviamos um link!", 
                    response.message,
                    [{text: "Ok", onPress: () => navigation.goBack(), style: "destructive"}]
                );
            }
        }
    }

    if(!fontsLoaded) return null;

    return (
        <KeyboardAvoidingView style={{flex: 1}}>
            <StatusBar style="light" />
            <View style={[styles.container]}>
                <View
                    style={{
                        alignItems: "center",
                        justifyContent: "flex-start",
                        flex: 1,
                        width: "100%",
                    }}
                >
                    <View style={{ width: "90%" }}>
                        <Text style={[styles.headerCommonStyle, { fontSize: 30 }]}>
                            Olá, 
                        </Text>
                        <Text style={[styles.headerCommonStyle, { marginBottom: 5, fontSize: 20 }]}>
                            Perdeu sua senha?
                        </Text>
                        <Text style={[styles.headerCommonStyle, { marginTop: 20, marginBottom: 45, fontSize: 18, color: "rgb(170, 170, 170)" }]}>
                            Comece nos informando seus dados abaixo para recuperar
                        </Text>
                    </View>
                    
                    <Formik 
                        initialValues={{email: "", name: "", cpf: ""}}
                        validateOnChange={true}
                        validateOnMount={true}
                        onSubmit={(values) => sendResetLinkEmail(values)}
                        validationSchema={passRecoverValidationSchema}
                        >
                        {({ handleChange, handleBlur, handleSubmit, values, touched, errors, setFieldValue}) => (
                            <>
                                <Input 
                                    type="text"
                                    placeholder="Informe seu nome completo"
                                    icon="person-outline"
                                    iconRight={
                                        !errors.name ? "checkmark-outline"
                                        : values.name == "" ? "" : "close-outline"
                                    }
                                    onChangeText={handleChange("name")}
                                    iconPress={() => {setFieldValue("name", "")}}
                                    onBlur={handleBlur("name")}
                                    value={values.name}
                                    styleProps={{marginTop: 25, marginBottom: 5}}
                                />
                                {(errors.name && touched.name) &&
                                    <View style={styles.errorsContainer}>
                                        <Text style={styles.errors}>{errors.name}</Text>
                                    </View>
                                }
                                <Input 
                                    type="number"
                                    placeholder="Informe seu CPF"
                                    icon="card-outline"
                                    iconRight={
                                        !errors.cpf ? "checkmark-outline"
                                        : values.cpf == "" ? "" : "close-outline"
                                    }
                                    onChangeText={handleChange("cpf")}
                                    iconPress={() => {setFieldValue("cpf", "")}}
                                    onBlur={handleBlur("cpf")}
                                    value={values.cpf}
                                    styleProps={{marginTop: 25, marginBottom: 5}}
                                />
                                {(errors.cpf && touched.cpf) &&
                                    <View style={styles.errorsContainer}>
                                        <Text style={styles.errors}>{errors.cpf}</Text>
                                    </View>
                                }
                                <Input 
                                    type="email"
                                    placeholder="Informe seu email cadastrado"
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

                                <Text style={{width: "90%", marginTop: 50, color: "#888"}}>
                                    * Ao enviar, um link de recuperação de senha será enviado para o seu email cadastrado
                                </Text>
                                <TouchableOpacity
                                    style={styles.submit}
                                    onPress={() => handleSubmit()}
                                    >
                                    <Text style={{color: "#DDD", fontSize: 18, fontWeight: "600"}}>Enviar</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </Formik>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.bgColor
    },
    headerCommonStyle: {
        width: "90%",
        textAlign: "left",
        fontFamily: "Inter_600SemiBold", 
        color: "#DDD"
    },
    submit: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.slateBlue,
        width: "90%",
        height: 45,
        borderRadius: 10,
        elevation: 5,
        marginTop: "15%"
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