import React, { useEffect } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import Constants from "expo-constants";

import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { WizardStore } from "../store";
import { Button, MD3Colors, ProgressBar, TextInput } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";

//import { jsonFieldsChecklist } from "../assets/jsonFieldsChecklist.json"
//import { data } from "../assets/data.json"

export default function LoginScreen({ navigation }) {
  const jsonFieldsChecklist = require("../assets/jsonFieldsChecklist.json");
  console.log(
    "jsonFieldsChecklist",
    jsonFieldsChecklist.CAMPOS.map((item, index) => {
      return item.IDGRUPO29238.data;
    })
  );
  //const data = require('../assets/data.json');
  // keep back arrow from showing
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues: WizardStore.useState((s) => s) });
  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused &&
      WizardStore.update((s) => {
        s.progress = 0;
      });
  }, [isFocused]);

  const onSubmit = (data) => {
    WizardStore.update((s) => {
      s.progress = 10;
      s.username = data.username;
      s.password = data.password;
    });
    navigation.navigate("Step1");
  };

  const renderField = (json) => {
    console.log("renderField", json.DESCRICAO);
    return <Text>{json.DESCRICAO}</Text>;
  };

  console.log("json0 ", jsonFieldsChecklist);
  //console.log("data", data)

  return (
    <View style={styles.container}>
      <ProgressBar
        style={styles.progressBar}
        progress={WizardStore.getRawState().progress}
        color={MD3Colors.primary60}
      />
      <View style={{ paddingHorizontal: 16 }}>
        <View>
          {jsonFieldsChecklist.CAMPOS.map((item, index) => {
            console.log("item", item);
            return (
              <Text key={index}>item</Text>
              //console.log("item", item.CAMPO)
            );
          })}
          <Text> Json: </Text>
          {jsonFieldsChecklist.CAMPOS.map((item, index) => {
            return true;
            
            //return renderJson(item)
            //Object.keys(item).map( (i2) => {
            //  console.log("i2", i2)
            //})
            //<Text>{item}</Text>
            //return (<Text key={index}>ASDASD</Text>)

            let output = "";
            Object.values(item).forEach((a2, i) => {
              //Object.value(a2).map( (r3) => {
              //  console.log("r3", r3)
              //})
              //console.log("a2 0 i", Object.values(a2[0])[0][0].DESCRICAO, i)
              console.log("a2", a2.CAMPO);
              //return a2.CAMPO.DESCRICAO
              //renderField(a2.CAMPO)
              output += "<Text>a2.CAMPO.DESCRICAO</Text>";
              //return (<Text>lllllll</Text>)
            });
            //return (<Text>a2.CAMPO.DESCRICAO</Text>)

            console.log("output", output);
            //return (<Text html={output}</Text>)
            console.log("item", item);
            console.log("index", index);
            return <Text></Text>;
          })}
        </View>
        <View style={styles.formEntry}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                mode="outlined"
                label="Username"
                placeholder="Nome de usuário"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="username"
          />
          {errors.username && (
            <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
              Campo obrigatório.
            </Text>
          )}
        </View>

        <View style={[styles.formEntry]}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                mode="outlined"
                label="Password"
                placeholder="Senha"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="numeric"
              />
            )}
            name="password"
          />
          {errors.password && (
            <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
              Campo obrigatório.
            </Text>
          )}
        </View>

        <Button
          onPress={handleSubmit(onSubmit)}
          mode="outlined"
          style={styles.button}
        >
          ENTRAR
        </Button>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    margin: 8,
  },
  formEntry: {
    margin: 8,
  },
  container: {
    flex: 1,
  },
  progressBar: {
    marginBottom: 16,
    paddingHorizontal: 0,
  },
});
