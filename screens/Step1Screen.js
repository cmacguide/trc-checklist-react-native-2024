import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Alert, Select, ScrollView } from "react-native";
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

var currentStep = 1-1;
export default function LoginScreen({ navigation }) {
  // keep back arrow from showing
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);
  const [grupoTitulo, setGrupoTitulo] = React.useState();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: WizardStore.useState((s) => s) });
  const isFocused = useIsFocused();

  const { fields, replace } =
  useFieldArray({
    control,
    name: "test",
    //# rules: {
    //#   minLength: 4,
    //# },
  });
  
  // console.log("errors", errors);
  useEffect(() => {
    isFocused &&
      WizardStore.update((s) => {
        replace(s.fieldsArea[currentStep]);
        setGrupoTitulo(s.fieldsArea[currentStep][0].grupo_nome);
        s.progress = 10;
      });
  }, [isFocused, replace]);

  const onSubmit = () => {
    console.log("currentStep", currentStep)
    currentStep++;
    console.log("currentStep++", currentStep)
    WizardStore.update((s) => {
      // s.progress = 20;
      s.progress = 10+(currentStep*10);
      replace(s.fieldsArea[currentStep]);
      setGrupoTitulo(s.fieldsArea[currentStep][0].grupo_nome);
    });
    // navigation.navigate("Step"+(currentStep+1));
    //navigation.navigate("Step2");
  };
  
  return (
    <ScrollView style={styles.container}>
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
              data={global.alternativasCriticidade}
              defaultButtonText="Criticidade"
              onSelect={(selectedItem) => {                
                WizardStore.update((s) => {
                  s.step1_criticidade == undefined ? s.step1_criticidade = [] : "";
                  s.step1_criticidade[index] = selectedItem
                  console.log("s", s)
                });
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                return item
              }}
            /> }
            
            { <SelectDropdown
              name={item.id}
              data={global.alternativasConformidade}
              defaultButtonText="Conformidade"
              onSelect={(selectedItem) => {                
                WizardStore.update((s) => {
                  s.step1_conformidade == undefined ? s.step1_conformidade = [] : "";
                  s.step1_conformidade[index] = selectedItem
                  console.log("s", s)
                });
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                return item
              }}
            /> }

            <TextInput
              mode="outlined"
              label={"Notas "+index}
              placeholder="Campo opcional para anotações"
              onChangeText={(value) => {                
                WizardStore.update((s) => {
                  s.step1_nota == undefined ? s.step1_nota = [] : "";
                  s.step1_nota[index] = value
                  console.log("s", s)
                });
              }}
              name={"step"+currentStep+"_input_"+index}
            />
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
    </ScrollView>
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
