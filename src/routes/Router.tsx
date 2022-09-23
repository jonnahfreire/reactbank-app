import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

// import { AuthContext } from "../contexts/AuthContext";

// import AppStack from "./AppStack";
import AuthStack from "./AuthStack";


export default function Router() {

	// const { authData } = useContext(AuthContext);

    return (
        <NavigationContainer>
			{/* { authData ? <AppStack /> : <AuthStack /> } */}
            <AuthStack />
        </NavigationContainer>
	);
}