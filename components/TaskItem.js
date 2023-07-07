import { StyleSheet, View, Text, Pressable } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "./Colors";
import TaskEdit from "./TaskEdit";

function TaskItem(props) {
  const [isDone, setIsDone] = useState(false);
  //const [modalIsVisible, setModalIsVisible] = useState(false);

  const doneTask = () => {
    if (isDone === true) {
      setIsDone(false);
    } else {
      setIsDone(true);
    }
  };

  return (
    <View style={styles.goalItem}>
      <View style={styles.itemRow}>
        <Pressable
          android_ripple={{ color: "#dddddd" }}
          onPress={doneTask}
          style={({ pressed }) => pressed && styles.pressedItem}
        >
          <Text
            style={[
              { textDecorationLine: isDone ? "line-through" : "none" },
              styles.goalText,
            ]}
          >
            {props.text}
          </Text>
        </Pressable>
        <View style={styles.buttonRow}>
          <Pressable
            onPress={
              props.onEditItem.bind(this, props.id)
              //     () => {
              //   props.startEditGoalHandler();
              //  props.onEditItem.bind(this, props.id);

              // }
            }
          >
            <Ionicons
              name="create"
              marginRight={5}
              size={30}
              color={Colors.primary800}
            />
          </Pressable>
          <Pressable onPress={props.onDeleteItem.bind(this, props.id)}>
            <Ionicons
              name="trash"
              marginRight={15}
              size={30}
              color={Colors.primary600}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default TaskItem;

const styles = StyleSheet.create({
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  goalItem: {
    paddingVertical: 10,
    margin: 8,
    borderRadius: 6,
    backgroundColor: Colors.primary900,
  },
  pressedItem: {
    opacity: 0.5,
  },
  goalText: {
    marginLeft: 10,
    fontSize: 24,
    color: "grey",
    padding: 8,
  },
});
