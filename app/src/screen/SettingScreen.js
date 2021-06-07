import React, { useState }  from 'react'
import { Button, Checkbox } from "react-native-paper"
import { StyleSheet,Text, View, StatusBar } from 'react-native'

import Screen from "../component/screen"
import * as Auth from "../../api/auth"
import {CommonActions} from "@react-navigation/native";

//https://callstack.github.io/react-native-paper/checkbox.html
//https://callstack.github.io/react-native-paper/switch.html
//https://callstack.github.io/react-native-paper/toggle-button.html

export default ({navigation}) => {
  const [checked1, setChecked1] = useState(false) //example
  const [checked2, setChecked2] = useState(false) //example

  const handleLogout = () => {
    Auth.logout(
      () => navigation.dispatch(CommonActions.reset({
        index: 0,
        routes: [{
          name: "Login",
          // params: { name: user.displayName }
        }]
      })),
      (error) => {
        return console.error(error)
      }
    )
  }

  return (
    <Screen style={styles.container}>
      <Text style={styles.title}>Setting Screen</Text>
      <Text>Change your user preferences and app settings here</Text>
      <Checkbox.Item
        label="Item 1"
        status={checked1 ? 'checked' : 'unchecked'}
        onPress={() => {
          setChecked1(!checked1);
        }}
      />
      <Checkbox.Item
        label="Item 2"
        status={checked2 ? 'checked' : 'unchecked'}
        onPress={() => {
          setChecked2(!checked2);
        }}
      />
      <Button onPress={() => navigation.navigate('Home')}>Back to Profile</Button>
      <Button onPress={handleLogout} style={styles.button}>Log Out</Button>
    </Screen>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    paddingTop: 30,
    color:"#05668D"
  },
  button: {
    width:"70%",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:20,
    // backgroundColor:"#028090",
  },
  container: {
    flex: 1,
    flexDirection:"column",
    // backgroundColor: '#F0F3BD',
    alignItems: 'center',
    justifyContent: 'center',
  },
});