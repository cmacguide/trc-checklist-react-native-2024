import React, { useContext } from "react";

import { View, Text, ActivityIndicator } from "react-native";

import { AuthContext } from "../contexts/auth";

import AppRoutes from "./appRoutes";
import AuthRoutes from "./authRoutes";

export default function Routes() {

    const { signed, loading } = useContext(AuthContext);

    //const loading = false;
    // const signed = true;

    if(loading) {
        return(
          <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
           <ActivityIndicator size={80} color="#4169E1"></ActivityIndicator>
          </View>
        );
    }

    return(

        signed ? <AppRoutes /> :
        <AuthRoutes />
    );


}