import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Alert, Select } from "react-native";
import Constants from "expo-constants";
import SelectBox from 'react-native-multi-selectbox'
import SelectDropdown from 'react-native-select-dropdown'
import { xorBy } from 'lodash'

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
  const jsonCampos = require("../assets/jsonCampos.json");
  const [selectedTeam, setSelectedTeam] = useState([])
  //const data = require('../assets/data.json');
  // keep back arrow from showing
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);
  
  //console.log("jsonCampos", jsonCampos.campos)
  
  const values = jsonCampos.campos
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: WizardStore.useState((s) => s) });

  //console.log("app....")
  //append({ descricao: "appendBill", criticidadeMinima: "appendLuo" })
  
//   useEffect(() => {
//     if (values) {
//         setValue([
//             { name: values.text }, 
//             { phone: values.text }
//         ]);
//     }
// }, [values]);
  //useForm({ defaultValues: async () => await fetch(jsonCampos.myFieldName) })

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

  useEffect(() => {
    
    isFocused &&
      WizardStore.update((s) => {
        replace(jsonCampos.campos);
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

  //append({ descricao: "appendBill", criticidadeMinima: "appendLuo" });
  // useEffect(() => {
  //   isFocused &&
  //     WizardStore.update((s) => {
  //       s.progress = 0;
  //     });
  // }, [isFocused]);
  
  // console.log("fields", fields);
  // function onChange(itemid) {
    
  //   return (val) => {
  //     console.log("itemid", itemid)
  //     console.log("val", val)
  //     let par = { itemid : val.id }
  //     console.log("par", par)
  //     console.log("selectedTeam", selectedTeam)
  //     console.log("selectedTeam[itemid]", selectedTeam[itemid])
  //     setSelectedTeam(val)
  //     //selectedTeam[itemid] = val.id
  //     // if(selectedTeam[itemid]==undefined) {
  //     //   console.log("nao existe para id", itemid)
  //     //   selectedTeam[itemid] = val.id
  //     //   //selectedTeam.push({ itemid : val.id })
  //     //   //setSelectedTeam(par)
  //     // } else {
  //     //   console.log("exite")
  //     //   setSelectedTeam(par)
  //     // }
      
  //   }
  // }
  
  return (
    <View style={styles.container}>
      <ProgressBar
        style={styles.progressBar}
        progress={WizardStore.getRawState().progress}
        color={MD3Colors.primary60}
      />
      <View style={{ paddingHorizontal: 16 }}></View>
      
      {fields.map((item, index) => {
        return (
          <View key={item.id} style={{ paddingHorizontal: 16 }}>
            <Text>{item.descricao}, {item.id}</Text>
            <SelectDropdown
              name={item.id}
              data={countries}
              //rowTextForSelection={item.id}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
                WizardStore.update((s) => {
                  s.username = selectedItem;
                  s[item.id] = selectedItem;
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
            />
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
