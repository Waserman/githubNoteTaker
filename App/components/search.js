import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  TextInput,
  ActivityIndicator
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
  },
  inputError: {
    fontSize: 14,
    fontWeight: "600",
    color: "red"
  }
});
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      isLoading: false,
      error: undefined,
      bio: null
    };
  }
  onUsernameChanged(event) {
    this.setState({
      username: event.nativeEvent.text
    });
  }

  searchInputFocus() {
    this.setState({ username: "" });
  }
  async onSubmit() {
    this.setState({
      isLoading: true
    });
    try {
      const res = await getBio(this.state.username);
      if (!res.message) {
        this.setState({ bio: res, isLoading: false, error: undefined });
      } else {
        this.setState({ error: res.message, isLoading: false });
      }
    } catch (ex) {
      this.setState({ error: ex.message, isLoading: false });
      console.error(ex);
    }
  }

  render() {
    const { isLoading, error } = this.state;
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.captionText}>
          type github username to look for :)
        </Text>
        <TextInput
          placeholder="username..."
          style={styles.input}
          value={this.state.username}
          onFocus={this.searchInputFocus.bind(this)}
          onChange={this.onUsernameChanged.bind(this)}
        />
        {error && <Text style={styles.inputError}>{error}</Text>}
        {!isLoading ? (
          <TouchableHighlight
            style={styles.button}
            onPress={this.onSubmit.bind(this)}
            underlayColor="#B6C2D9"
          >
            <Text style={styles.buttonText}>SUBMIT</Text>
          </TouchableHighlight>
        ) : (
          <ActivityIndicator color="#fff" size="large" />
        )}
      </View>
    );
  }
}
