import { AuthData } from "../contexts/AuthContext";

const baseUrl = "https://darm-app-api.herokuapp.com";

export async function firebaseGetUser(id: any) : Promise<AuthData> {
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id})
    }

    const response = await fetch(`${baseUrl}/storage/user`, options);
    const user = await response.json();
    
    return user;
}

export async function firebaseUpdateUser(userData: any) : Promise<any> {
    const options = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({...userData})
    }

    const response = await fetch(`${baseUrl}/user/update`, options);
    const result = await response.json();
    
    return result;
}