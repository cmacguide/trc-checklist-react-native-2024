import React, { useEffect } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import Constants from "expo-constants";

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

export default function LoginScreen({ navigation }) {
  const mock = require("../assets/mock.json");
  //const data = require('../assets/data.json');
  // keep back arrow from showing
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      test: [{ firstName: "Bill", lastName: "Luo" }],
    },
    mode: "onChange",
  });
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

  useEffect(() => {
    isFocused &&
      WizardStore.update((s) => {
        s.progress = 0;
      });
  }, [isFocused]);

  console.log("fields", fields);
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
            <TextInput
              {...register(`test.${index}.firstName`, { required: true })}
            />

            <Controller
              render={({ field }) => <TextInput {...field} />}
              name={`test.${index}.lastName`}
              control={control}
            />
            <Button title="Delete" onPress={() => remove(index)} />
          </View>
        );
      })}

      <Button
        title="append"
        mode="outlined"
        style={styles.button}
        onPress={() => {
          append({ firstName: "appendBill", lastName: "appendLuo" });
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
            firstName: "prependFirstName",
            lastName: "prependLastName",
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
            firstName: "insertFirstName",
            lastName: "insertLastName",
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
          replace([
            {
              firstName: "test1",
              lastName: "test1",
            },
            {
              firstName: "test2",
              lastName: "test2",
            },
          ])
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
            test: [{ firstName: "Bill", lastName: "Luo" }],
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
