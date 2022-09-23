import React, { useEffect } from "react";
import { createContext, useState } from "react";
import { firebaseSignIn, firebaseSignUp, resetPasswordViaEmailLink } from "../services/AuthService";
import { clearUserData, getUserInfoFromStorage, storeUserInfo } from "../storage";


export interface AuthData {
    id: string,
    token?: string,
    name: string,
    email: string
    error?: {error: boolean, message: string}
}

interface AuthContextData {
    authData?: AuthData,
    initializing: boolean,
    signIn: (email: string, password: string) => Promise<AuthData>,
    signUp: (email: string, password: string, name:string) => Promise<AuthData>,
    signOut(): any,
    sendResetPasswordLinkViaEmail: (email: string) => Promise<void>,
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = (props: { children: any }) => {
    const { children } = props;

    const [ initializing, setInitializing ] = useState(true);
    const [ authData, setAuthData ] = useState<AuthData>();


    useEffect(() => {
        const getStorageData = async () => {
            const userData = await getUserInfoFromStorage();
            userData && setAuthData(userData);

            (userData && initializing) && setInitializing(false);
        }
        
        getStorageData();
    }, []);
    

    async function signIn(email: string, password: string) : Promise<AuthData> {
        const auth = await firebaseSignIn(email, password)
        
        if (!auth.error) {
            storeUserInfo(auth.id, auth.name, auth.email, auth.token || "");
            setAuthData(auth);
            return auth;
        }

        return auth;
    }

    async function signUp(email: string, password: string, name: string) : Promise<AuthData> {
        const auth = await firebaseSignUp(email, password, name);
        
        if (!auth.error) {
            storeUserInfo(auth.id, name, auth?.email, auth?.token || "");
            setAuthData(auth);
            return auth;
        } 
        
        return auth;
    }

    async function sendResetPasswordLinkViaEmail(email: string) {
        await resetPasswordViaEmailLink(email)
    }

    function signOut() {
        clearUserData();
        setAuthData(undefined);
        return false;
    }

    return (
        <AuthContext.Provider value={{ authData, initializing, signIn, signUp, signOut, sendResetPasswordLinkViaEmail }}>
            { children }
        </AuthContext.Provider>
    );
}