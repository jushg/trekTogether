import React, {useContext, useState} from 'react';
import { Button, Checkbox, Avatar, Headline, Caption, Subheading } from "react-native-paper"
import { StyleSheet,Text, View } from 'react-native'

import Screen from "../component/screen"
import * as Auth from "../../utils/auth"
import {UserContext} from "../../utils/context";

//https://callstack.github.io/react-native-paper/checkbox.html
//https://callstack.github.io/react-native-paper/switch.html
//https://callstack.github.io/react-native-paper/toggle-button.html

export default ({navigation}) => {
  // const [checked1, setChecked1] = useState(true) 
  // const [checked2, setChecked2] = useState(false) //example

  const handleLogout = () => {
    Auth.logout(
      () => {return console.log("logout")},
      (error) => {
        return console.error(error)
      }
    )
  }

  // const userApi = useContext(UserContext);

  return (
    <Screen style={styles.container}>
      <View style={{alignItems:"center", alignSelf: "stretch"}}>
        <Headline >Profile</Headline>
        <Avatar.Image
          size={100}
          source={{ uri: Auth.getCurrentUser().photoURL }}
        />
        <Subheading style={{fontWeight:"bold"}}>{Auth.getCurrentUser().displayName}</Subheading>
        <Button disabled mode="contained" style={styles.button}>Edit Profile</Button>
        <Caption>Under Development</Caption>

      </View>
      
      {/* <Checkbox.Item
        label="Under Development"
        status={checked1 ? 'checked' : 'unchecked'}
        onPress={() => {
          setChecked1(!checked1);
        }}
      /> */}
      {/* <Checkbox.Item
        label="Under Development"
        status={checked2 ? 'checked' : 'unchecked'}
        onPress={() => {
          setChecked2(!checked2);
        }}
      /> */}
      <Button onPress={handleLogout} style={styles.button} mode="contained">Log Out</Button>
    </Screen>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    paddingTop: 30,
  },
  button: {
    width:"40%",
    borderRadius:25,
    alignItems:"center",
    justifyContent:"center",
    marginTop:20,
  },
  container: {
    flex: 1,
    flexDirection:"column",
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10
  },
});