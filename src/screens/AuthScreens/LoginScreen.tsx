import React, { useContext, useEffect, useRef, useState } from "react";
import { Alert, Animated, 
    Keyboard, 
    KeyboardAvoidingView, 
    SafeAreaView, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View 
} from "react-native";

import { AuthContext } from "../../contexts/AuthContext";
import { StatusBar } from "expo-status-bar";

import LottieView from 'lottie-react-native';

import { 
    useFonts,
    Inter_300Light
} from "@expo-google-fonts/inter";

import { colors } from "../../assets/colors/Colors";

import Input from "../../components/Input";
import { ScreenWidth } from "../../utils/dimensions";
import { Formik } from "formik";
import { loginValidationSchema } from "../../validators/FormValidators";

export default function Login(props: {navigation: any}) {
    const { navigation } = props;
    
    const { signIn } = useContext(AuthContext);

    const [fontsLoaded] = useFonts({
        Inter_300Light,
    });

    const [offset] = useState(new Animated.ValueXY({x: 0, y: 80}));
    const [opacity] = useState(new Animated.Value(0))
    const [logoContainer] = useState(new Animated.ValueXY({x: ScreenWidth, y:150}))

    const formValidatedRef = useRef({value: false});
    const [ showPassword, setShowPassword ] = useState(false);
    const [ keyboardShown, setKeyboardShown ] = useState(false);


    function handleEyePress() {
        setShowPassword(!showPassword);
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
                toValue: 65,
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
                toValue: 150,
                duration: 100,
                useNativeDriver: false,
            })
        ]).start();
    }

    async function handleSubmitLogin(values: {cpf: string, password: string}) {
        const { cpf, password } = values;
        console.log(cpf, password);
        // const response = await signIn(cpf, password)
        
        // if(response.error) {
        //     Alert.alert("Desculpe! Não foi possível fazer login!", response.message);
        // } else {
        //     formValidatedRef.current.value = true;
        // }
    }

    function handleSignUpRedirect() {
        navigation.navigate("SignUp");
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
    }, [])

    
    if(!fontsLoaded) return null;

    return (
        <SafeAreaView style={{flex: 1}}>
            <KeyboardAvoidingView style={styles.background}>
                <StatusBar style="light"/>

                <Animated.View style={[styles.containerLogo,
                    {width: logoContainer.x, height: logoContainer.y, justifyContent: "center"}]}>

                    <View style={{width: '80%', height: keyboardShown ? "70%" : "70%"}}>
                        <LottieView resizeMode="contain" autoPlay source={require('../../assets/animated/banking.json')} />
                    </View>
                    <Text style={{color: "#DDD", fontSize: 26, fontFamily: 'Inter_600SemiBold'}}>
                        ReactBank
                    </Text>
                </Animated.View>

                <Animated.View 
                    style={
                        [
                            styles.container, {
                            opacity: opacity,
                            transform: [
                                {translateY: offset.y}
                            ]
                        }
                    ]}
                >
                    <Formik 
                        initialValues={{cpf: "", password: ""}}
                        validateOnChange={true}
                        validateOnMount={true}
                        onSubmit={(values) => handleSubmitLogin(values)}
                        validationSchema={loginValidationSchema}
                    >
                        {
                            ({ handleChange, handleBlur, handleSubmit, values, touched, errors, isValid, setFieldValue}) => (
                                <>
                                    <Input 
                                        type="number"
                                        placeholder="CPF"
                                        icon="person-outline"
                                        iconRight={
                                            !errors.cpf ? "checkmark-outline"
                                            : values.cpf.length === 0 ? "" : "close-outline"
                                        }
                                        onChangeText={handleChange("cpf")}
                                        iconPress={() => {setFieldValue("cpf", "")}}
                                        onBlur={handleBlur("cpf")}
                                        value={values.cpf}
                                        styleProps={{marginTop: keyboardShown ? "10%" : "5%", marginBottom: 5}}
                                    />
                                    {(errors.cpf && touched.cpf) &&
                                        <View style={styles.errorsContainer}>
                                            <Text style={styles.errors}>{errors.cpf}</Text>
                                        </View>
                                    }
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Senha"
                                        icon="lock-closed-outline"
                                        iconRight={showPassword ? "eye-outline" : "eye-off-outline"} 
                                        iconPress={handleEyePress} 
                                        onChangeText={handleChange("password")}
                                        onBlur={handleBlur("password")}
                                        value={values.password}
                                        styleProps={{marginTop: 25, marginBottom: 5}}
                                    />
                                    {(errors.password && touched.password) &&
                                        <View style={styles.errorsContainer}>
                                            <Text style={styles.errors}>{errors.password}</Text>
                                        </View>
                                    }
                                    <View style={{flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end', width: '90%', height: 35, marginBottom: 30}}>
                                        <TouchableOpacity style={{width: 125}} onPress={()=> navigation.navigate("Recover")}>
                                            <Text style={{color: '#DDD', fontWeight: '500'}}>
                                                Esqueceu a senha?
                                            </Text>
                                        </TouchableOpacity>
                                    </View>

                                    <TouchableOpacity 
                                        style={[styles.btnSubmit, {marginTop: keyboardShown ? 5 : 15}]} 
                                        onPress={() => handleSubmit()}
                                    >
                                        {
                                            !formValidatedRef.current.value ? (
                                                <Text style={styles.submitText}>Log In</Text>
                                            ) : (
                                            
                                                <View style={{width: 45, height: 45}}>
                                                    <LottieView resizeMode="cover" autoPlay source={require('../../assets/animated/bouncing-balls.json')} />
                                                </View>
                                            )
                                        }
                                    </TouchableOpacity>
                                    
                                    <TouchableOpacity style={styles.linkRedirectSignup} onPress={handleSignUpRedirect}>
                                        <Text style={styles.linkSignupText}>Ainda não tem uma conta? Cadastre-se</Text>
                                    </TouchableOpacity>
                                </>
                            )
                        }
                    </Formik>
                </Animated.View>
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
        justifyContent: 'center',
        width: '100%',
		paddingStart: 10,
		paddingEnd: 10,
		paddingTop: 10,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: "rgba(10, 10, 10, 0.1)",
        elevation: 2,
	},
	containerLogo: {
		flex:1,
		justifyContent:'flex-start',
		alignItems: 'center',
	},
    containerLogoHeader: {
        fontSize: 20, 
        fontFamily: 'Inter_300Light',
        textAlign: 'center',
        padding: 10
    },
	input:{
		width: '90%',
		height: 45,
		marginBottom: 15,
		color: 'rgba(0,0,0,0.7)',
		fontSize: 17,
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(0,0,0,0.5)'
	},
	btnSubmit: {
		backgroundColor: colors.slateBlue,
		width: '90%',
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 10,
		marginTop: 15,
        elevation: 3
	},
	submitText:{
		color: '#FFF',
		fontSize: 18,
		fontWeight: '600'
	},
	linkRedirectSignup:{
        marginTop: 2,
	},
	linkSignupText:{
        color: '#DDD',
        fontWeight: '500',
		marginTop: 35,
	},
    errorsContainer: {
		width: '90%',
        alignItems: 'flex-start',
		justifyContent: 'center',
    },
    errors: {
        fontFamily: 'Inter_600SemiBold',
		color: colors.lightRed,
        textAlign: 'left'
    }
});
