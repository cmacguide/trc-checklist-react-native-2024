import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Alert, Select } from "react-native";
import Constants from "expo-constants";
import SelectBox from 'react-native-multi-selectbox'
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

export default function LoginScreen({ navigation }) {
  const jsonCampos = require("../assets/jsonCampos.json");
  const [selectedTeam, setSelectedTeam] = useState({})
  //const data = require('../assets/data.json');
  // keep back arrow from showing
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);
  console.log("jsonCampos", jsonCampos.campos)
  const values = jsonCampos.campos
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      test: [{ descricao: "Bill", criticidadeMinima: "Luo" }],
    },
    mode: "onChange",
  });
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
      rules: {
        minLength: 4,
      },
    });

  let renderCount = 0;

  console.log("errors", errors);

  const onSubmit = (data) => console.log("data", data);
  const isFocused = useIsFocused();

  //append({ descricao: "appendBill", criticidadeMinima: "appendLuo" });
  // useEffect(() => {
  //   isFocused &&
  //     WizardStore.update((s) => {
  //       s.progress = 0;
  //     });
  // }, [isFocused]);
  
  // console.log("fields", fields);
  function onChange() {
    return (val) => setSelectedTeam(val)
  }
  return (
    <View onSubmit={handleSubmit(onSubmit)} style={styles.container}>
      <ProgressBar
        style={styles.progressBar}
        progress={WizardStore.getRawState().progress}
        color={MD3Colors.primary60}
      />
      <View style={{ paddingHorizontal: 16 }}>
        <Text>Field Array</Text>
        <Text>
          The following demo allow you to delete, append, prepend items
        </Text>
        <Text>Render Count: {renderCount}</Text>
      </View>
      <View style={{ paddingHorizontal: 16 }}></View>

      {fields.map((item, index) => {
        return (
          <View key={item.id} style={{ paddingHorizontal: 16 }}>
            <Text>{item.descricao}</Text>
            {/* <TextInput
              {...register(`test.${index}.descricao`, { required: true })}
            /> */}
            <SelectBox
              label="Nota"
              options={K_OPTIONS}
              width="10%"
              value={selectedTeam}
              onChange={onChange()}
              hideInputFilter={true}
            />
            {/* <Controller
              render={({ field }) => <TextInput {...field} />}
              name={`test.${index}.criticidadeMinima`}
              control={control}
            /> */}
            <Button title="Delete" onPress={() => remove(index)} />
          </View>
        );
      })}

      <Button
        title="append"
        mode="outlined"
        style={styles.button}
        onPress={() => {
          append({ descricao: "appendBill", criticidadeMinima: "appendLuo" });
        }}
      >
        append
      </Button>

      <Button
        title="prepend"
        mode="outlined"
        style={styles.button}
        onPress={() =>
          prepend({
            descricao: "prependdescricao",
            criticidadeMinima: "prependcriticidadeMinima",
          })
        }
      >
        prepend
      </Button>

      {/* <Button
        title="insert at"
        mode="outlined"
        style={styles.button}
        onPress={() =>
          insert(parseInt(2, 10), {
            descricao: "insertdescricao",
            criticidadeMinima: "insertcriticidadeMinima",
          })
        }
      >
        insert at
      </Button> */}

      {/* <Button
        title="swap"
        mode="outlined"
        style={styles.button}
        onPress={() => swap(1, 2)}
      >
        swap
      </Button>

      <Button
        title="move"
        mode="outlined"
        style={styles.button}
        onPress={() => move(1, 2)}
      >
        move
      </Button> */}

      <Button
        title="replace"
        mode="outlined"
        style={styles.button}
        onPress={() =>
          replace(jsonCampos.campos)
          // replace([
          //   {
          //     descricao: "test1",
          //     criticidadeMinima: "test1",
          //   },
          //   {
          //     descricao: "test2",
          //     criticidadeMinima: "test2",
          //   },
          // ])
        }
      >
        replace
      </Button>

      <Button
        title="remove at"
        mode="outlined"
        style={styles.button}
        onPress={() => remove(1)}
      >
        remove at
      </Button>

      <Button
        title="reset"
        mode="outlined"
        style={styles.button}
        onPress={() =>
          reset({
            test: [{ descricao: "Bill", criticidadeMinima: "Luo", criticidadeAuferida: "" }],
          })
        }
      >
        reset
      </Button>

      <Button
        title="Submit"
        mode="outlined"
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
      >
        Submit
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
