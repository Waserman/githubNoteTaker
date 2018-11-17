import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  TextInput
} from "react-native";
import { getBio } from "../utils/api";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 15,
    marginTop: 65,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#4D7EA8",
    alignContent: "center",
    alignItems: "center"
  },
  captionText: {
    color: "#B6C2D9",
    fontSize: 16,
    textAlign: "center"
  },
  input: {
    margin: 10,
    color: "#fff",
    fontSize: 22,
    textAlign: "center",
    minWidth: 200
  },
  button: {
    width: 200,
    padding: 5
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    width: 200,
    color: "#ececec"
  }
});
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      loading: false,
      error: undefined
    };
  }
  onUsernameChanged(event) {
    this.setState({
      username: event.nativeEvent.text
    });
  }

  async onSubmit() {
    this.setState({
      loading: true
    });
    try {
      const data = await getBio(this.state.username);
      console.log(data);
    } catch (ex) {
      console.log(ex);
    }
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.captionText}>
          type github username to look for :)
        </Text>
        <TextInput
          placeholder="username..."
          style={styles.input}
          value={this.state.username}
          onChange={this.onUsernameChanged.bind(this)}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={this.onSubmit.bind(this)}
          underlayColor="#B6C2D9"
        >
          <Text style={styles.buttonText}>SUBMIT</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
