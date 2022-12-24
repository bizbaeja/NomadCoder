import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  AsyncStorage,
} from "react-native";

import { theme } from "./colors";
import React, { useEffect, useState } from "react";
const STORAGE_KEY = "@toDos";
export default function App() {
  const [working, setWorking] = useState(false);
  const [text, setText] = useState("");
  const [toDos, setTodos] = useState({});
  useEffect(() => {
    loadToDos();
  });
  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload) => setText(payload);
  const saveToDos = async (toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY);
    console.log(s, JSON.parse(s));
  };
  const loadToDos = async () => {
    const s = await AsyncStorage.getItem(STORAGE_KEY);
    console.log(s);
  };

  const addToDo = async () => {
    if (text === "") {
      return;
    }
    //save to do
    const newToDos = { ...toDos, [Date.now()]: { text, working } };
    setTodos(newToDos);
    await saveToDos(newToDos);
    setText("");
  };
  console.log(toDos);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{ ...styles.btnText, color: working ? "white" : theme.grey }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            style={{
              ...styles.btnText,
              color: !working ? "white" : theme.grey,
            }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          onSubmitEditing={addToDo}
          onChangeText={onChangeText}
          placeholderTextColor="grey"
          returnKeyType="done"
          keyboardType="email-address"
          placeholder={working ? "Add a ToDo" : "Where do you want to go?"}
          style={styles.input}
        />
      </View>
      <ScrollView>
        {Object.keys(toDos).map((key) =>
          toDos[key].working === working ? (
            <View style={styles.toDo} key={key}>
              <Text style={styles.toDoText}>{toDos[key].text}</Text>
            </View>
          ) : null
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 100,
  },
  btnText: {
    fontSize: 38,
    fontWeight: "600",
    color: "white",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
    marginVertical: 20,
    fontSize: 18,
  },
  toDo: {
    backgroundColor: theme.toDoBg,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
  },

  toDoText: { color: "white" },
  fontSize: 16,
  fontWeight: "500",
  fontWeight: "600",
});
