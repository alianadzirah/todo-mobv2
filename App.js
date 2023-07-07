import React, { useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Pressable,
  Text,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import Colors from "./components/Colors";

import TaskItem from "./components/TaskItem";
import TaskInput from "./components/TaskInput";
import TaskEdit from "./components/TaskEdit";

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);
  const [keyNum, setKeyNum] = useState(0);
  const [oriEditText, setOriEditText] = useState("");
  //const [edit, showEdit] = useState(false);
  const [editTask, setEditTask] = useState("");

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endAddGoalHandler() {
    setModalIsVisible(false);
  }

  function startEditGoalHandler() {
    setEditVisible(true);
  }

  function endEditGoalHandler() {
    setEditVisible(false);
  }

  function addGoalHandler(enteredGoalText) {
    if (enteredGoalText.trim().length === 0) {
      Alert.alert("Empty Task", "Please insert task!", [
        { text: "NOTED", onPress: () => console.log("NOTED Pressed") },
      ]);
    } else {
      setKeyNum(keyNum + 1);
      setCourseGoals((currentCourseGoals) => [
        ...currentCourseGoals,
        { text: enteredGoalText, id: keyNum },
      ]);
      endAddGoalHandler();
    }
  }

  function deleteGoalHandler(id) {
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  }

  //to get id of content you want to edit
  function editGoalIDHandler(editedGoalID) {
    setEditVisible(!editVisible);
    const editText = courseGoals.filter((goal) => goal.id === editedGoalID);
    console.log(editText[0].text);
    setOriEditText(editText[0].text);
    console.log(courseGoals.filter((goal) => goal.id === editedGoalID));
    console.log("edit task!!" + editedGoalID);
    console.log(courseGoals);
  }

  function editTaskHandler () {
    console.log("Edit text ID: " + keyNum);
    showEdit(false);
    setAnyUndo(true);

    if (editTask !== "") {
      const newTask = courseGoals.map((goal, id) => {
        // id same then update the data with new data (complete) !task.complete to be safe since only true or false
        if (id === keyNum) {
          //setTaskEditData(taskUpdateData);
          return { ...task, text: editTask };
        }

        // if not the same then just send the before change
        return task;
      });
      setToDos(newTask);
      setEditTask("");
      console.log("edited");
    } else {
      showError(true);
      console.log("not edit");
    }

    setEditVisible(!editVisible);
    console.log("Edited text: "+ courseGoals);
  }

  return (
    <>
      <View style={styles.appContainer}>
        <View style={styles.buttonAlign}>
          <View style={styles.titleDesign}>
            <Text style={styles.titleStyle}>YOUR TASK!</Text>
          </View>

          <Pressable
            title="Add New Goal"
            color="#a065ec"
            onPress={startAddGoalHandler}
          >
            <Ionicons name="add-circle" size={60} color="white" />
          </Pressable>
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <TaskInput
          visible={modalIsVisible}
          onAddGoal={addGoalHandler}
          onCancel={endAddGoalHandler}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals}
            renderItem={(itemData) => {
              return (
                <TaskItem
                  text={itemData.item.text}
                  id={itemData.item.id}
                  onDeleteItem={deleteGoalHandler}
                  onEditItem={editGoalIDHandler}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
          />
        </View>
        <TaskEdit
          visible={editVisible}
          text={oriEditText}
          onCancel={endEditGoalHandler}
          onEdit={editTaskHandler}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 50,
    paddingBottom: 30,
    backgroundColor: Colors.primary500,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  bodyContainer: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
    backgroundColor: "white",
  },
  goalsContainer: {
    flex: 4,
  },
  titleDesign: {
    justifyContent: "center",
    alignContent: "center",
  },
  titleStyle: {
    fontSize: 32,
    color: "white",
    fontWeight: "bold",
  },
  buttonAlign: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    marginBottom: 10,
  },
});
