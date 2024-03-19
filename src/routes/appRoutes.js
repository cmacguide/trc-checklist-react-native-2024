import { createDrawerNavigator } from "@react-navigation/drawer";

import React from "react";

import SelectScreen from "../../screens/SelectObra";

const AppStack = createDrawerNavigator();

export default function AppRoutes() {
	return (
		<AppStack.Navigator>
			<AppStack.Screen
				name="Home"
				component={SelectScreen}
			></AppStack.Screen>
		</AppStack.Navigator>
	);
}
