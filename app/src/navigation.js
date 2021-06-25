import React, {useState, useEffect } from 'react';
import { createStackNavigator} from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//Auth Stack Screen
import LoginScreen from "./screen/LoginScreen"
import WelcomeScreen from "./screen/WelcomeScreen"
import SignupScreen from "./screen/SignupScreen"
import SetupScreen from "./screen/SetupScreen"

//Match feature Screen
import MatchScreen from "./screen/MatchScreen"

//Loading ScreenText
import LoadingScreen from './screen/LoadingScreen';

//Dashboard Screen
import PastScreen from "./screen/PastScreen"
import FutureScreen from './screen/FutureScreen'
import SettingScreen from "./screen/SettingScreen"
import AddTripScreen from './screen/AddTripScreen';
//Chat feature Screens
import ChatListScreen from "./screen/ChatListScreen"
import ChatScreen from './screen/ChatScreen';

import * as Auth from "../utils/auth"
import {DashboardHeader, MessengerButtonHeader} from "./component/header"
import { UserContext } from './feature/auth';
import colorConst from './constant/color';
import { IconButton } from 'react-native-paper';

const MainStack = createStackNavigator();

export const MainScreenStack = () => {
  
  const [user,setUser] = useState("loading");
  const changeUserState = () => {
    setUser(Auth.getCurrentUser())
  }
  
  useEffect(() => {
    return Auth.setOnAuthStateChanged(
      (user) => setUser(user),
      () => setUser(null),
    );
  }, []);
  return (
    <UserContext.Provider value={{user, changeUserState}}>
      <MainStack.Navigator >
        {user == null ? (
        <MainStack.Screen name="Auth" component = {AuthScreenStack} options={{headerShown:false}}/>
        ): user === "loading" ?(
          <MainStack.Screen name="loading" component = {LoadingScreen} options={{headerShown:false}}/>
        ):(
          <>
            <MainStack.Screen name="Home" component = {HomeScreenTab} options={{headerShown:false}}/>
            <MainStack.Screen name="Setting" component={SettingScreen} options={{headerStyle: {backgroundColor: colorConst.primary }}} />
            <MainStack.Screen name="Add Trip" component={AddTripScreen} options={{headerStyle: {backgroundColor: colorConst.primary }}}/>
            <MainStack.Screen 
            name="Chat" 
            component = {ChatScreen}
            options={({ navigation, route }) => ({
              headerStyle: {backgroundColor: colorConst.primary },
              headerTitle: route.params.user,
              headerRight: () => (<MessengerButtonHeader/>) })
            }
            />
          </>
        )}
      </MainStack.Navigator>
    </UserContext.Provider>
  )
}


const AuthStack = createStackNavigator();

export const AuthScreenStack = () => {
  return (
    <AuthStack.Navigator initialRouteName={"Login"} >
      <AuthStack.Screen name="Welcome" key = "welcome" component = {WelcomeScreen} options={{headerShown:false}}/>
      <AuthStack.Screen name="Login" key = "login" component = {LoginScreen} options={{headerShown:false}}/>
      <AuthStack.Screen name="Sign Up" key = "signup" component = {SignupScreen} options={{headerStyle: {backgroundColor: colorConst.primary }}}/>
      <AuthStack.Screen name="Setup" key = "setup" component = {SetupScreen} options={{headerShown:false}}/>
    </AuthStack.Navigator>
  )
}

const HomeTab = createMaterialBottomTabNavigator();

export const HomeScreenTab = () => {
  return (
    <HomeTab.Navigator initialRouteName="Home">
      <HomeTab.Screen
        name="Home"
        component={DashboardScreenStack}
        options={
          {
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }
         }
      />
      <HomeTab.Screen
        name="Buddy"
        component={MatchScreen}
        options={{
          tabBarLabel: 'Buddy',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-group" color={color} size={26} />
          ),
        }}
      />
      <HomeTab.Screen
        name="Message"
        component={ChatListScreen}
        options={
          {
            tabBarLabel: 'Message',
            tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="message" color={color} size={26} />
            ),
          }
        }
      />
    </HomeTab.Navigator>
  );
}




const DashboardStack = createStackNavigator();

export const DashboardScreenStack = () => {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen 
      name="Dashboard" 
      component={DashboardScreenTab}
      options={({route, navigation}) => ({
        header: ({ scene, previous, navigation }) => {
          // const { options } = scene.descriptor;
          // const title =
          //   options.headerTitle !== undefined
          //     ? options.headerTitle
          //     : options.title !== undefined
          //     ? options.title
          //     : scene.route.name;
          return (
            <DashboardHeader navigation={navigation} screenname="Setting"/>
          )
        },
      })}/>
    </DashboardStack.Navigator>
  )
}

const DashboardTab = createMaterialTopTabNavigator();

export const DashboardScreenTab = () => {
  return (
    <DashboardTab.Navigator>
      <DashboardTab.Screen 
        name="Future" 
        component={FutureScreen}
        options={{
          tabBarLabel: 'Your plan'
        }}/>
      <DashboardTab.Screen 
        name="Past" 
        component={PastScreen}
        options={{
          tabBarLabel: 'Your journal'
        }}/>
    </DashboardTab.Navigator>
  )
} 