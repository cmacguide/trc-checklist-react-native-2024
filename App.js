import * as React from "react";
import { StyleSheet } from "react-native";
import Constants from "expo-constants";

// You can import from local files

// or any pure javascript modules available in npm
import { ProgressBar,MD3Colors, Provider as PaperProvider } from 'react-native-paper';


import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./screens/LoginScreen";
import Step0Screen from "./screens/Step0Screen";
import Step1Screen from "./screens/Step1Screen";
import Step2Screen from "./screens/Step2Screen";
import Step3Screen from "./screens/Step3Screen";
import Step4Screen from "./screens/Step4Screen";
import Step5Screen from "./screens/Step5Screen";
import Step6Screen from "./screens/Step6Screen";
import Step7Screen from "./screens/Step7Screen";
import Step8Screen from "./screens/Step8Screen";
import ConfirmationScreen from "./screens/ConfirmationScreen";

const Stack = createStackNavigator();
global.alternativasCriticidade = ["A", "B", "C"]
global.alternativasConformidade = ["C", "NC", "NA"]

export default function App() {
  return (
    <PaperProvider>
      
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Step0" component={Step0Screen} />
          <Stack.Screen name="Step1" component={Step1Screen} />
          <Stack.Screen name="Step2" component={Step2Screen} />
          <Stack.Screen name="Step3" component={Step3Screen} />
          <Stack.Screen name="Step4" component={Step4Screen} />
          <Stack.Screen name="Step5" component={Step5Screen} />
          <Stack.Screen name="Step6" component={Step6Screen} />
          <Stack.Screen name="Step7" component={Step7Screen} />
          <Stack.Screen name="Step8" component={Step8Screen} />
          <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
