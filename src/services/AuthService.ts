import { AuthData, ResetCredentialProps } from '../contexts/AuthContext';

const baseUrl = "https://darm-app-api.herokuapp.com";


export async function firebaseSignIn(cpf: string, password: string) : Promise<AuthData> {
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cpf: cpf, 
            password: password
        })
    }

    const response = await fetch(`${baseUrl}/signin`, options);
    const userCredential = await response.json();

    if(userCredential.error) {
        return userCredential;
    }
        
    const data = {
        ...userCredential,
        error: false
    }
    
    return data;
}

export async function firebaseSignUp(signupData: any) : Promise<AuthData> {
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...signupData
        })
    }

    const response = await fetch(`${baseUrl}/signup`, options);
    const userCredential = await response.json();

    if(userCredential.error) {
        return {...userCredential};
    }
    
    const data = {
        ...userCredential,
        error: false,
    }
    
    return data;
}

export async function resetPasswordViaEmailLink(email: string, cpf: string) : Promise<ResetCredentialProps> {
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            cpf: cpf
        })
    }
    const response = await fetch(`${baseUrl}/recover`, options);
    const result = response.json();

    return result;
}