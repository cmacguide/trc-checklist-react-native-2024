import { createNativeStackNavigator } from "@react-navigation/native-stack";

import React from "react";

import { StyleSheet } from "react-native";

// import CreateAccount from "../pages/CreateAccount";
import Login from "../screens/login";

const AuthStack = createNativeStackNavigator();

export default function AuthRoutes() {
	return (
		<AuthStack.Navigator initialRouteName="Login">
			<AuthStack.Screen
				name="Login"
				component={Login}
				options={{
					headerShown: false,
				}}
				//options={styles.optionsCustomStackScreen}
			/>
			{/* <AuthStack.Screen
				name="Nova Conta"
				component={CreateAccount}
				options={{
					headerStyle: {
						backgroundColor: "#32CD32",
						borderBottomWidth: 1,
						borderBottomColor: "#228B22",
					},
					headerTintColor: "#FFF",
					headerTitle: "Voltar",
					headerBackTitleVisible: false, //add para o IOS, ele já gera um button backtitle
				}}
			/> */}
		</AuthStack.Navigator>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	optionsCustomStackScreen: {
		headerTintColor: "#DCDCDC", //#FFF ou black voltar a aparecer
		//     headerTitleStyle: {
		//       fontWeight: 'bold',
		//     },
		headerStyle: {
			backgroundColor: "#DCDCDC", //#FFF
		},
		headerShadowVisible: false, //true ele da o efeito shadow abaixo do header
		//     statusBarColor: "#100F12",
	},
});
