import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Alert, Select } from "react-native";
import SelectDropdown from 'react-native-select-dropdown'

import {
  SubmitHandler,
  useForm,
  Controller,
  useFieldArray,
} from "react-hook-form";
import { WizardStore } from "../store";
import { Button, MD3Colors, ProgressBar, TextInput } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";

const alternativas = ["A", "B", "C", "D", "E"]

export default function LoginScreen({ navigation }) {
  // keep back arrow from showing
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);
  const [grupoTitulo, setGrupoTitulo] = React.useState();

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: WizardStore.useState((s) => s) });

  const { fields, append, prepend, remove, swap, move, insert, replace } =
  useFieldArray({
    control,
    name: "test",
    // rules: {
    //   minLength: 4,
    // },
  });
  
  console.log("errors", errors);
  useEffect(() => {
    isFocused &&
      WizardStore.update((s) => {
        replace(s.fieldsArea[6]);
        setGrupoTitulo(s.fieldsArea[0][0].grupo_nome);
        s.progress = 80;
      });
  }, [isFocused, replace]);

  const onSubmit = (data) => {
    WizardStore.update((s) => {
      s.progress = 90;
    });
    navigation.navigate("Step8");
  };
  const isFocused = useIsFocused();
  
  return (
    <View style={styles.container}>
      <ProgressBar
        style={styles.progressBar}
        progress={WizardStore.getRawState().progress}
        color={MD3Colors.primary60}
      />
      <Text style={{fontSize:18, fontWeight:"bold"}}>Grupo: { grupoTitulo }</Text>
      <View style={{ paddingHorizontal: 16 }}></View>
      <Text>{ WizardStore.getRawState().s }</Text>
      {fields.map((item, index) => {
        return (
          <View key={item.id} style={{ paddingHorizontal: 16 }}>
            <Text>{item.itens_nome} </Text>
            { <SelectDropdown
              name={item.id}
              data={alternativas}
              defaultButtonText="Responder"
              onSelect={(selectedItem) => {
                WizardStore.update((s) => {
                  s.step7 == undefined ? s.step7 = [] : "";
                  s.step7[index] = selectedItem
                });
                
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                return item
              }}
            /> }
         </View>
        );
      })}

      <Button
        mode="outlined"
        style={[styles.button, { marginTop: 40 }]}
        onPress={() => navigation.goBack()}
      >
        VOLTAR
      </Button>
      <Button
        title="Submit"
        mode="outlined"
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
      >
        PRÓXIMO PASSO
      </Button>
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
