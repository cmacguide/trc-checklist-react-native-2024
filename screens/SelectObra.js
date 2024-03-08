import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Alert, Select } from "react-native";
import SelectDropdown from 'react-native-select-dropdown'
import axios from "axios"; 

import {
  SubmitHandler,
  useForm,
  Controller,
  useFieldArray,
} from "react-hook-form";
import { WizardStore } from "../store";
import { Button, MD3Colors, ProgressBar, TextInput } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
const mock = {
	"data": {
		"codigo_usuario_portal": "156",
		"nome_obra": "Corporativa",
		"cod_obra": "1",
		"obras": [
			{
				"id": "1",
				"nome_obra": "Corporativa"
			},
			{
				"id": "29",
				"nome_obra": "Morumbi SP - Escritório"
			},
			{
				"id": "92",
				"nome_obra": "Demonstracao SP"
			},
			{
				"id": "110",
				"nome_obra": "Portal do Morumbi"
			}
		]
	}
}
dataMock = mock.data.obras.map((i)=>{return i.nome_obra})
let obraSelecionada;
let selectedUso;
console.log("dataMock", dataMock);
export default function LoginScreen({ navigation }) {
  // keep back arrow from showing
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);
  const [grupoTitulo, setGrupoTitulo] = React.useState();
  const [alternativas, setAlternativas] = React.useState();
  //const checklistApiRetorno = require("../assets/checklistApiRetorno.json");
  //console.log("checklistApiRetorno", checklistApiRetorno);
  //const tela0 = checklistApiRetorno.data.data.grupo_checklist[0];
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
        setGrupoTitulo("Escolha do Alojamento");
        //setAlternativas(s.fieldsAlojas);
        let ArN = [];
        s.fieldsAlojas.map((item) => {
          ArN.push(item.nome_endereco)
        })
        setAlternativas(ArN);
        s.progress = 10;
      });
  }, [isFocused, replace]);

  const onSubmit = (data) => {
    WizardStore.update((s) => {
      s.progress = 20;
      console.log("s.fieldsArea.length", s.fieldsArea.length)
      s.step = {
        ["notas_calculadas"]:[]
      }
      for(let i=0; i<s.fieldsArea.length; i++) {
        s.step["step_"+i+"_conformidade"]=[]
        s.step["step_"+i+"_criticidade"]=["A", "B", "A"] //TODO: fazer carregar
        s.step["step_"+i+"_notas"]=["Exemplo de nota carregada", "Exemplo 2"]
      }
    });
    navigation.navigate("ChecklistGroup");
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
      <View style={{ paddingHorizontal: 16, width:"100%" }}>
           <SelectDropdown
              style={{innerWidth:"100%"}}
              //name={index}
              data={dataMock}
              defaultButtonText="Selecione Obra"
              onSelect={(selectedItem) => { 
                
                WizardStore.update((s) => {
                  s.obra = selectedItem
                });
                
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                return item
              }}
            />

            <SelectDropdown
              style={{innerWidth:"100%"}}
              //name={index}
              data={["interno", "externo"]}
              defaultButtonText="Ambiente"
              onSelect={(selectedItem) => {
                WizardStore.update((s) => {
                  s.uso = selectedItem
                });
                
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                return item
              }}
            />

            <SelectDropdown
              style={{innerWidth:"100%"}}
              //name={index}
              data={dataMock}
              defaultButtonText="Responder"
              onSelect={(selectedItem) => {   
                WizardStore.update((s) => {
                  let index = dataMock.indexOf(s.obra);
                  console.log("index", index);
                  obraSelecionada = mock.data.obras[index].id;
                  //
                  s.uso=="interno" ? selectedUso=1 : selectedUso=0;
                  console.log("http://app.trcmobile.com.br/ws/checklist/empreiteiras.php?obra="+obraSelecionada+"&uso="+selectedUso);
                  axios.get("http://app.trcmobile.com.br/ws/checklist/empreiteiras.php?obra="+obraSelecionada+"&uso="+selectedUso)
                  .then((r)=> {
                    console.log("r",r);
                  })
                });
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                return item
              }}
            />

            {/* <Text>Selecione o alojamento: </Text> */}
            <SelectDropdown
              style={{innerWidth:"100%"}}
              //name={index}
              data={alternativas}
              defaultButtonText="Responder"
              onSelect={(selectedItem) => {                
                WizardStore.update((s) => {
                  s.alojamento = selectedItem
                });
                
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                return item
              }}
            />
            
         </View>
  
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
