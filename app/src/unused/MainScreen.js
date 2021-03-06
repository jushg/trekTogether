import React, { useEffect } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { CommonActions } from "@react-navigation/native";

import Screen from "../component/screen";

import * as Authentication from "../../utils/auth";

export default ({ navigation }) => {
  useEffect(() => {
    return Authentication.setOnAuthStateChanged(
      () => navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: "Home" }] })),
      () => navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: "Login" }] })),
    );
  }, []);

  return (
    <Screen style={styles.screen}>
      <ActivityIndicator animating size="large" color="black" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    flex: 1
  }
});