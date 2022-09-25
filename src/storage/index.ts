import AsyncStorage from "@react-native-async-storage/async-storage";

export function storeUserInfo(userData: any) {
    AsyncStorage.setItem('@reactbank:userinfo', JSON.stringify({...userData}));
}

export async function getUserInfoFromStorage() {
    const info = await AsyncStorage.getItem('@reactbank:userinfo')

    if(info != null) return JSON.parse(info);
    return
}

export function clearUserData() {
    AsyncStorage.clear();
}