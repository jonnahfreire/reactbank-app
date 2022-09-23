import AsyncStorage from "@react-native-async-storage/async-storage";

export function storeUserInfo(id: string, name: string, email: string, token: string) {
    AsyncStorage.setItem('@reactbank:userinfo', JSON.stringify({id, name, email, token}));
}

export async function getUserInfoFromStorage() {
    const info = await AsyncStorage.getItem('@reactbank:userinfo')

    if(info != null) return JSON.parse(info);
    return
}

export function clearUserData() {
    AsyncStorage.clear();
}