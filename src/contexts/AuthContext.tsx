import React, { useEffect } from "react";
import { createContext, useState } from "react";
import { firebaseSignIn, firebaseSignUp, resetPasswordViaEmailLink } from "../services/AuthService";
import { CardProps } from "../services/CardService";
import { firebaseGetUser, firebaseUpdateUser } from "../services/FirestoreService";
import { clearUserData, getUserInfoFromStorage, storeUserInfo } from "../storage";


export interface AuthData {
    id?: string,
    authid?: string,
    token?: string,
    name: string,
    cpf: string,
    email: string,
    address: {
        state: string,
        city: string,
        street: string,
        cep: string,
        location: string
    },
    account: {
        id?: string,
        title: string
    },
    permission: string,
    cards?: undefined | Array<CardProps>,
    error?: {error: boolean, message: string}
}

export interface ResetCredentialProps {
    error: boolean, message: string
}

interface AuthContextData {
    authData?: AuthData,
    initializing: boolean,
    isUserSigned: boolean,
    setUserSigned(v: boolean): void,
    signIn: (cpf: string, password: string) => Promise<AuthData>,
    signUp: (signUpData: AuthData | any) => Promise<AuthData>,
    signOut(): void,
    updateUserInfo: (data: any) => Promise<AuthData>,
    sendResetPasswordLinkViaEmail: (email: string, cpf: string) => Promise<ResetCredentialProps>,
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = (props: { children: any }) => {
    const { children } = props;

    const [ initializing, setInitializing ] = useState(true);
    const [ isUserSigned, setIsUserSigned ] = useState(false);
    const [ authData, setAuthData ] = useState<AuthData>();

    useEffect(() => {
        const getStorageData = async () => {
            const userData = await getUserInfoFromStorage();

            // update user info
            if(userData) {
                const data = await firebaseGetUser(userData.email)
                
                if(!data.error && userData) {
                    setAuthData({...data, token: userData.token});
                    storeUserInfo(authData);
                }

                setIsUserSigned(true);
            } 
            (userData && initializing) && setInitializing(false);
        }
        
        getStorageData();
    }, []);
    

    async function signIn(cpf: string, password: string) : Promise<AuthData> {
        const auth = await firebaseSignIn(cpf, password)
        
        if (!auth.error) {
            storeUserInfo(auth);
            setAuthData(auth);
            return auth;
        }

        return auth;
    }

    async function signUp(signUpData: AuthData) : Promise<AuthData> {
        const auth = await firebaseSignUp(signUpData);
        
        if (!auth.error) {
            storeUserInfo(auth);
            setAuthData(auth);
            return auth;
        } 
        
        return auth;
    }

    async function sendResetPasswordLinkViaEmail(email: string, cpf: string) {
        const result = await resetPasswordViaEmailLink(email, cpf);

        return result;
    }

    async function updateUserInfo(data: any) {
        const result = await firebaseUpdateUser(data);
        return result;
    }

    function signOut() {
        clearUserData();
        setAuthData(undefined);
        setIsUserSigned(false);
        return false;
    }

    return (
        <AuthContext.Provider value={{ authData, initializing, isUserSigned, setUserSigned: setIsUserSigned, signIn, signUp, signOut, sendResetPasswordLinkViaEmail, updateUserInfo }}>
            { children }
        </AuthContext.Provider>
    );
}