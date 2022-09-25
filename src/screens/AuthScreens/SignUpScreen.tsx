import React, { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Alert, Animated, Keyboard, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Input from "../../components/Input";
import { AuthContext } from "../../contexts/AuthContext";

import { colors } from "../../assets/colors/Colors";
import { ScreenWidth } from "../../utils/dimensions";
import { Formik } from "formik";
import { signupValidationSchema } from "../../validators/FormValidators";
import { useFonts, Inter_300Light } from "@expo-google-fonts/inter";

import { ScrollView } from "react-native";

import { Options, Select } from "../../components/SelectList";
import { FormInputList } from "../../components/InputListShow";
import { AddressContainer, AddressProps } from "../../components/AddressContainer";

import LottieView from 'lottie-react-native';


export default function SignUp() {
    const { signUp, setUserSigned } = useContext(AuthContext);

    const [fontsLoaded] = useFonts({
        Inter_300Light,
    });

    const [ offset ] = useState(new Animated.ValueXY({x: 0, y: 80}));
    const [ opacity ] = useState(new Animated.Value(0))
    const [ logoContainer ] = useState(new Animated.ValueXY({x:ScreenWidth, y: 200}))
    const [ keyboardShown, setKeyboardShown ] = useState(false);
    const [ selectedAccountOption, setSeletedAccountOption ] = useState<Options>();
    const [ notSelectedAccount, setNotSelectedAccount ] = useState(true);

    const [ formValidated, setFormValidated ] = useState(false);
    const [ showPassword, setShowPassword ] = useState(false);
    const [ showConfirmPassword, setShowConfirmPassword ] = useState(false);
    const [ isOpen, setIsOpen ] = useState(false);


    async function handleSubmitSignIn(signUpData: any) {
        if(selectedAccountOption !== undefined) {
            const data = signUpData;
            const cpf = data.cpf.replace(/\D/g,'')
            data.cpf = cpf;
            const response = await signUp({...data, account: selectedAccountOption});
            
            if(response.error) Alert.alert("Desculpe! Não foi possível cadastrar!", response?.message)
            else {
                setFormValidated(true);
                setTimeout(() => 
                    setUserSigned(true),
                2000
            )
            }
        } else {
            Alert.alert("Atenção!", "Selecione um tipo de conta");
        }
    }

    function keyboardDidShow() {
        setKeyboardShown(true)

        Animated.parallel([
            Animated.timing(logoContainer.x, {
            toValue: ScreenWidth,
            duration: 100,
            useNativeDriver: false,
        }),
        Animated.timing(logoContainer.y, {
            toValue: 170,
            duration: 100,
            useNativeDriver: false,
        })
        ]).start();
    }

    function keyboardDidHide() {
        setKeyboardShown(false)

        Animated.parallel([
            Animated.timing(logoContainer.x, {
                toValue: ScreenWidth,
                duration: 100,
                useNativeDriver: false,
            }),
            Animated.timing(logoContainer.y, {
                toValue: 200,
                duration: 100,
                useNativeDriver: false,
            })
        ]).start();
    }

    function handleEyePress(passwordInput: string) {
        passwordInput == "password" ? setShowPassword(!showPassword)
        : setShowConfirmPassword(!showConfirmPassword);
    }


    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', keyboardDidShow);
        Keyboard.addListener('keyboardDidHide', keyboardDidHide);

        Animated.parallel([
            Animated.spring(offset.y, {
                toValue: 0,
                speed: 4,
                bounciness: 20,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue:1,
                duration: 200,
                useNativeDriver: true,
            })
        ]).start();
    }, []);

    if (!fontsLoaded) return null;

    return (
        <SafeAreaView style={{flex: 1}}>
            <KeyboardAvoidingView style={styles.background}>
                <StatusBar style="light"/>
                <Animated.View style={[styles.containerLogo,
                    {width: logoContainer.x, height: logoContainer.y}]}>
                    <Text style={{color: "#DDD", fontSize: 30, fontFamily: 'Inter_600SemiBold'}}>Olá,</Text>
                    <Text style={{color: "#DDD", fontSize: 20, marginTop: 10, fontFamily: 'Inter_600SemiBold'}}>Bem vindo ao ReactBank</Text>
                    <Text style={{color: "rgb(170, 170, 170)", marginTop: 5, fontSize: 16, fontFamily: 'Inter_600SemiBold'}}>
                        Informe os dados abaixo para realizar seu cadastro
                    </Text>
                </Animated.View>

                <ScrollView
                    scrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    style={{flex: 1, width: "100%" }}
                >
                    <Animated.View style={[styles.container, { opacity: opacity, transform: [{ translateY: offset.y }] }]}>                        
                        <Formik 
                            initialValues={{
                                username: "", 
                                email:"", 
                                cpf: "", 
                                address: {} as AddressProps,
                                password:"", 
                                confirmPassword:""
                            }}
                            validateOnChange={true}
                            validateOnMount={true}
                            onSubmit={(values) => handleSubmitSignIn(values)}
                            validationSchema={signupValidationSchema}
                        >
                            {
                                ({ 
                                    handleChange, 
                                    handleBlur, 
                                    handleSubmit, 
                                    values, 
                                    touched, 
                                    errors, 
                                    isValid,
                                    setFieldValue
                                }) => (
                                    <>
                                    
                                        <Input 
                                            type="text"
                                            placeholder="Nome completo"
                                            icon="person-outline"
                                            iconRight={
                                                !errors.username ? "checkmark-outline"
                                                : !touched.username ? "" : "close-outline"
                                            }
                                            iconPress={() => setFieldValue("username", "")}
                                            onChangeText={handleChange("username")}
                                            onBlur={() => {
                                                handleBlur("username")
                                                // setFieldTouched("username", false)
                                            }}
                                            value={values.username}
                                        />
                                        {(errors.username && touched.username) &&
                                            <View style={styles.errorsContainer}>
                                                <Text style={styles.errors}>{errors.username}</Text>
                                            </View>
                                        }
                                        <Input 
                                            type="email"
                                            placeholder="Informe seu email"
                                            icon="mail-outline"
                                            iconRight={
                                                !errors.email ? "checkmark-outline"
                                                : values.email == "" ? "" : "close-outline"
                                            }
                                            iconPress={() => setFieldValue("email", "")}
                                            onChangeText={handleChange("email")}
                                            onBlur={handleBlur("email")}
                                            value={values.email}
                                            styleProps={{marginTop: 20, marginBottom: 0}}
                                        />
                                        {(errors.email && touched.email) &&
                                            <View style={styles.errorsContainer}>
                                                <Text style={styles.errors}>{errors.email}</Text>
                                            </View>
                                        }
                                        <Input 
                                            type="number"
                                            placeholder="CPF"
                                            icon="person-outline"
                                            iconRight={
                                                !errors.cpf ? "checkmark-outline"
                                                : values.cpf == "" ? "" : "close-outline"
                                            }
                                            iconPress={() => setFieldValue("cpf", "")}
                                            onChangeText={handleChange("cpf")}
                                            onBlur={handleBlur("cpf")}
                                            value={values.cpf}
                                            styleProps={{marginTop: 20, marginBottom: 0}}
                                        />
                                        {(errors.cpf && touched.cpf) &&
                                            <View style={styles.errorsContainer}>
                                                <Text style={styles.errors}>{errors.cpf}</Text>
                                            </View>
                                        }

                                        <FormInputList 
                                            icon="home-outline"
                                            placeholder="Endereço"
                                            style={{marginTop: 20}}
                                            isOpen={isOpen}
                                            onPress={()=> setIsOpen(!isOpen)}
                                        />

                                        {isOpen && <AddressContainer 
                                            values={values} 
                                            errors={errors}
                                            touched={touched}
                                            setFieldValue={setFieldValue}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                        />}
                                        {(errors.address && touched.address) &&
                                            <View style={styles.errorsContainer}>
                                                <Text style={styles.errors}>Adicione um endereço</Text>
                                            </View>
                                        }
                                        <Select 
                                            icon="wallet-outline"
                                            placeholder="Tipo de conta"
                                            style={{marginTop: 20}}
                                            options={[
                                                {title: "Corrente", id: "CC"},
                                                {title: "Poupança", id: "CP"},
                                            ]}
                                            currentValueSelected={selectedAccountOption}
                                            getCurrentSelected={(option) => {
                                                setSeletedAccountOption(option);
                                            }}
                                        />
                                        {(!notSelectedAccount && formValidated) &&
                                            <View style={styles.errorsContainer}>
                                                <Text style={styles.errors}>Selecione um tipo de conta</Text>
                                            </View>
                                        }
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Informe sua senha"
                                            icon="lock-closed-outline"
                                            iconRight={showPassword ? "eye-outline" : "eye-off-outline"} 
                                            iconPress={() => handleEyePress("password")} 
                                            onChangeText={handleChange("password")}
                                            onBlur={handleBlur("password")}
                                            value={values.password}
                                            styleProps={{marginTop: 20, marginBottom: 0}}
                                        />
                                        {(errors.password && touched.password) &&
                                            <View style={styles.errorsContainer}>
                                                <Text style={styles.errors}>{errors.password}</Text>
                                            </View>
                                        }
                                        <Input
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Confirme sua senha"
                                            icon="lock-closed-outline"
                                            iconRight={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                                            iconPress={() => handleEyePress("confirmPassword")} 
                                            onChangeText={handleChange("confirmPassword")}
                                            onBlur={handleBlur("confirmPassword")}
                                            value={values.confirmPassword}
                                            styleProps={{marginTop: 20, marginBottom: 0}}
                                        />
                                        {(errors.confirmPassword && touched.confirmPassword) &&
                                            <View style={styles.errorsContainer}>
                                                <Text style={styles.errors}>{errors.confirmPassword}</Text>
                                            </View>
                                        }

                                        {(!errors.confirmPassword && values.confirmPassword !== values.password) &&
                                            <View style={styles.errorsContainer}>
                                                <Text style={styles.errors}>Senhas não conferem</Text>
                                            </View> 
                                        }

                                        <TouchableOpacity style={styles.submit}
                                            onPress={() => handleSubmit()}
                                        >
                                            {
                                                !formValidated ? (
                                                    <Text style={styles.submitText}>Sign Up</Text>
                                                ) : (
                                                
                                                    <View style={{width: 45, height: 45}}>
                                                        <LottieView resizeMode="cover" autoPlay source={require('../../assets/animated/spinner.json')} />
                                                    </View>
                                                )
                                            }
                                        </TouchableOpacity>
                                    </>
                                )
                            }
                        </Formik>
                    </Animated.View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.bgColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        marginBottom: 20
	},
	containerLogo: {
        flexDirection: "column",
		justifyContent:'flex-start',
		alignItems: 'flex-start',
        padding: "5%"
	},
	submitText:{
		color: '#FFF',
		fontSize: 18,
		fontWeight: '600'
	},
    submit: {
        backgroundColor: colors.slateBlue,
        width: '90%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: "10%",
        elevation: 3
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
