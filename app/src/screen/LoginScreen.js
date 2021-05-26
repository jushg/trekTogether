import React ,{useState} from 'react';
import {Button, TextInput} from "react-native-paper";
import { StyleSheet,Text, View} from 'react-native';
import Screen from "../component/screen"

const LoginScreen = () =>{
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [passwordVisible,setPasswordVisible] = useState(false);
  return (
    <Screen style={styles.container}>
      <View style={{flex:2,backgroundColor:"red",justifyContent:"center",alignItems:"center"}}>
        <Text style = {styles.title}>TrekTogether</Text>
      </View>
      <View style={{flex:7,justifyContent:"center",alignItems:"center"}} >
        <TextInput 
        label="Email"
        placeholder="johndoe@gmail.com"
        value={email}
        onChangeText={setEmail}
        style={{marginBottom:10, width:"90%"}}
        autoCapitalize="none"
        />
    
        <TextInput 
        label="Password"
        placeholder="123456"
        value={password}
        onChangeText={setPassword}
        secureTextEntry = {passwordVisible}
        right={<TextInput.Icon name={passwordVisible ? "eye-off" : "eye"} onPress={() => setPasswordVisible((state) => !state)} />}
        style={{marginBottom:10, width:"90%"}}
        autoCapitalize="none"
        />
        
        <Button 
        mode="contained" 
        style={styles.loginBtn}
        >Log In
        </Button>
        <Text style={{marginTop:20}}>Forgot password?</Text>
      </View>
      <View style={{flex:1,backgroundColor:"cyan",justifyContent:"center"}} />
      
  </Screen>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:"column",
      backgroundColor: '#F0F3BD',
      
    },
    title: {
      fontSize: 30,
      paddingTop: 30,
      color:"#05668D"
    },
    loginBtn: {
      width:"90%",
      borderRadius:25,
      height:50,
      alignItems:"center",
      justifyContent:"center",
      marginTop:20,
      backgroundColor:"#02C39A",
    },
  });

export default LoginScreen;