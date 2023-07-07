import { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  Image,
  SafeAreaView,
} from "react-native";
import Colors from "./Colors";

function TaskEdit(props) {
  const [enteredGoalText, setEnteredGoalText] = useState(props.text);
  //const [textt, onChangeText] = useState('Useless Text');

  function goalInputHandler(enteredText, id) {
    setEnteredGoalText(enteredText);
  }
  
  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/cat1.gif")}
        />

        <TextInput
          style={styles.textInput}
          //placeholder={props.text}
          //onChangeText={setEnteredGoalText}
          //value={enteredGoalText}
          onChangeText={text => setEnteredGoalText(text)}
          value={props.text}
        />

        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title="Cancel"
              onPress={props.onCancel}
              color={Colors.primary800}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Edit Task"
              onPress={props.onEdit}
              color={Colors.primary600}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default TaskEdit;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: Colors.primary500,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  image: {
    width: 200,
    height: 200,
    margin: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: Colors.primary700,
    backgroundColor: Colors.primary700,
    color: "#120438",
    borderRadius: 15,
    width: "100%",
    marginRight: 8,
    padding: 16,
    fontSize: 22,
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
  },
  button: {
    width: 100,
    fontSize: 20,
    marginHorizontal: 8,
  },
});
