import { Ionicons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { Alert, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../assets/colors/Colors";

import { AuthContext } from "../../contexts/AuthContext";
const UserImg = require('../../assets/img/user.png');

export default function Perfil() {
  const { signOut, authData } = useContext(AuthContext);

  function signOutFromAccount() {
    Alert.alert(
      "Atenção!", 
      "Deseja realmente sair?",
      [
        {text: "Cancelar", style: "cancel"},
        {text: "Ok", onPress: signOut, style: "destructive"},
      ] 
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={[styles.container, {}]}>
        <View style={styles.perfilInfoContainer}>
          <Image source={UserImg} resizeMode="contain" style={{ width: 145, height: 200 }} />
          
          <View style={[styles.userInfoContainer]}>
            <Text style={{ fontSize: 20, marginTop: 15 }}>Informações de cadastro</Text>
            
            {authData.name && <View
                style={styles.infoContainer}
              >
                <Ionicons name="person-outline" color='black' size={24} />
                <Text style={{ marginLeft: 10, fontSize: 15 }}>{ authData.name }</Text>
              </View>
            }
            <View
              style={styles.infoContainer}
              >
              <Ionicons name="mail-outline" color='black' size={24} />
              <Text style={{ marginLeft: 10, fontSize: 15 }}>{ authData.email }</Text>
            </View>
          </View>

            <TouchableOpacity style={styles.logoutButtton} onPress={signOutFromAccount}>
              <Text style={{ fontSize: 16, fontWeight: "700", color: "#FFF", marginEnd: 15 }}>Sair</Text>
              <Ionicons name="log-out-outline" color='white' size={26} />
            </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "rgb(250, 250, 250)",
  },
  perfilInfoContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: '50%',
    marginTop: 50,
    marginBottom: 10,
  },
  userInfoContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '90%',
    marginTop: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    marginTop: 35,
    backgroundColor: "#F0F0F0",
    padding: 5,
    borderRadius: 5,
    elevation: 3
  },
  logoutButtton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.darkRed,
    width: '90%',
    height: 50,
    marginBottom: 35,
    borderRadius: 10,
    elevation: 5
  }
});
