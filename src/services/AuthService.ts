import { AuthData } from '../contexts/AuthContext';

const baseUrl = "https://decola-app-api.herokuapp.com";


export async function firebaseSignIn(email: string, password: string) : Promise<AuthData> {
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email, 
            password: password
        })
    }

    const response = await fetch(`${baseUrl}/signin`, options);
    const userCredential = await response.json();

    if(userCredential.error) {
        return userCredential;
    }
        
    const data = {
        id: userCredential.id,
        name: userCredential.username,
        token: userCredential.token,
        email: userCredential.email,
        error: userCredential.code,
    }
    
    return data;
}

export async function firebaseSignUp(email: string, password: string, name: string) : Promise<AuthData> {
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email, 
            password: password, 
            username: name
        })
    }
    const response = await fetch(`${baseUrl}/signup`, options);
    const userCredential = await response.json();

    if(userCredential.error) {
        return {...userCredential};
    }
    
    const data = {
        id: userCredential.uuid,
        name: userCredential.displayName,
        email: userCredential.email,
        error: userCredential.code,
    }
    
    return data;
}

export async function resetPasswordViaEmailLink(email: string) {
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email
        })
    }
    return await fetch(`${baseUrl}/recover`, options);
}