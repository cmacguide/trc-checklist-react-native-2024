import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Alert, Select } from "react-native";
import Constants from "expo-constants";
import SelectDropdown from 'react-native-select-dropdown'
import { xorBy } from 'lodash'
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

//import { jsonFieldsChecklist } from "../assets/jsonFieldsChecklist.json"
//import { data } from "../assets/data.json"
const K_OPTIONS = [
  {
    item: 'A',
    id: 'A',
  },
  {
    item: 'B',
    id: 'B',
  },
  {
    item: 'C',
    id: 'C',
  },
  {
    item: 'D',
    id: 'D',
  },
  {
    item: 'E',
    id: 'E',
  }
]
const countries = ["A", "B", "C", "D", "E"]

export default function LoginScreen({ navigation }) {
  const jsonCampos = require("../assets/jsonCamposFinal.json");
  const [selectedOption, setSelectedOption] = useState([])

  // keep back arrow from showing
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);
  
  const values = jsonCampos.campos
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
    
  let renderCount = 0;

  console.log("errors", errors);
  //console.log("j", jsonCampos.data.attributes.grupo_checklist.area)
  useEffect(() => {
    isFocused &&
      WizardStore.update((s) => {
        console.log("s.fieldsArea", s.fieldsArea);
        replace(s.fieldsArea);
        s.progress = 33;
      });
  }, [isFocused, replace]);

  const onSubmit = (data) => {
    console.log("data", data)
    WizardStore.update((s) => {
      s.progress = 10;
      s.username = data.username;
      s.password = data.password;
    });
    navigation.navigate("Step2");
  };
  //const onSubmit = (data) => console.log("data", data);
  const isFocused = useIsFocused();

  let datasend2 = {
    // data: {
    //   attributes : {
    //     usuario_mobile: {
    //       nome: "vagneradm",
    //       senha: "123",
    //       codigo_obra: "29"
    //     },
    //     codigo_checklist: ""
    //   }
    // }
    "data": {
      "attributes": {
        "usuario_mobile": {
            "nome":"vagneradm",
            "senha": "123",
            "codigo_obra": "29"
        },
              "codigo_checklist":""
      }
    }
  }
  //console.log("datasend2 step1", datasend2)
  const getF = () => {
    axios.get("https://app.trcmobile.com.br/ws/api_checklist_alojamento.php/", datasend2)
    .then((r)=> {
      console.log("resposta step1:", r)
      //let authorized = r.data.data.attributes.OK!=="N";
    })
  }
  //getF();
  
  return (
    <View style={styles.container}>
      <ProgressBar
        style={styles.progressBar}
        progress={WizardStore.getRawState().progress}
        color={MD3Colors.primary60}
      />
      <View style={{ paddingHorizontal: 16 }}></View>
      <Text>{ WizardStore.getRawState().s }</Text>
      {fields.map((item, index) => {
        return (
          <View key={item.id} style={{ paddingHorizontal: 16 }}>
            <Text>{item.itens_nome} {index} {item.id}</Text>
            { <SelectDropdown
              name={item.id}
              data={countries}
              defaultButtonText="Responder"
              onSelect={(selectedItem, index2) => {
                console.log(selectedItem, index2)
                
                WizardStore.update((s) => {
                  s.step1 == undefined ? s.step1 = [] : "";

                  console.log("index externo", index)
                  console.log("index interno", index2)
                  console.log("item.id interno", item.id)
                  //s.username = selectedItem;
                  //selectedOption[`${item.id}`] = selectedItem;
                  //selectedOption[1] = selectedItem;
                  //s.step1[item.id] = selectedItem; //não começa com 0
                  s.step1[index] = selectedItem
                  selectedOption[index] = selectedItem; //não começa com 0
                  console.log("selectedOption",selectedOption)
                });
                
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item
              }}
            /> }
            {/* <TextInput
              {...register(`test.${index}.descricao`, { required: true })}
            /> */}
            {/* <SelectBox
              label={item.id}
              options={K_OPTIONS}
              width="100%"
              //value={undefined==item ? selectedTeam : selectedTeam[`${item.id}`] }
              value={selectedTeam}
              onChange={onChange(item.id)}
              hideInputFilter={true}
              //{...register(`test.${item.id}.descricao`, { required: true })}
            /> */}
            {/* <Controller
              render={({ field }) => <TextInput {...field} />}
              name={`test.${index}.criticidadeMinima`}
              control={control}
            /> */}
            {/* <Button title="Delete" onPress={() => remove(index)}>Del</Button> */}
          </View>
        );
      })}

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
