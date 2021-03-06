import React, {useState, useEffect} from 'react';
import { createStackNavigator} from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Keyboard} from "react-native";
import {IconButton} from "react-native-paper";

//Auth Stack Screen
import LoginScreen from "./screen/LoginScreen"
import WelcomeScreen from "./screen/WelcomeScreen"
import SignupScreen from "./screen/SignupScreen"
import SetupProfileScreen from "./screen/SetupProfileScreen"
import ForgotPasswordScreen from './screen/ForgotPasswordScreen';

//Match Buddy Screen
import MatchScreen from "./screen/MatchScreen"

//Loading Screen
import LoadingScreen from './screen/LoadingScreen';

//Dashboard Screen
import PastScreen from "./screen/PastScreen"
import FutureScreen from './screen/FutureScreen'
import SettingScreen from "./screen/SettingScreen"
import AddTripScreen from './screen/AddTripScreen';
import InvitationsScreen from "./screen/InvitationsScreen";

//Chat Screens
import ChatListScreen from "./screen/ChatListScreen"
import ChatScreen from './screen/ChatScreen';

//Journal Screens
import PhotoCarouselScreen from "./screen/PhotoCarouselScreen";
import JournalScreen from "./screen/JournalScreen";
import EditJournalPhotoScreen from "./screen/EditJournalPhotoScreen";
import EditJournalTextScreen from "./screen/EditJournalTextScreen";

//Edit Profile Screen
import EditProfileScreen from "./screen/EditProfileScreen";


import * as Auth from "../utils/auth"
import {UserContext} from '../utils/context';
import {DashboardHeader, MessengerButtonHeader} from "./component/header"
import { DashboardFAB } from './component/fab';
import colorConst from './constant/color';
import EditTripScreen from './screen/EditTripScreen';


const RootStack = createStackNavigator();

export const RootScreenStack = () => {
  return (
      <RootStack.Navigator mode="modal" initialRouteName={"Main"}>
        <RootStack.Screen name="Main" component={MainScreenStack} options={{ headerShown: false }} />
        <RootStack.Screen name="Photo Carousel" component={PhotoCarouselScreen}
                          options={{headerTitle: "View photos", headerBackTitle: "Back"}}
        />
      </RootStack.Navigator>
  );
}

const MainStack = createStackNavigator();

export const MainScreenStack = () => {
  
  const [user,setUser] = useState("loading");
  const changeUserState = () => {
    setUser(Auth.getCurrentUser())
  }

  // const {user, changeUserState} = useContext(UserContext);

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

            <MainStack.Screen name="Setting" component={SettingScreen}
              options={{
                headerTitle: "Settings",
                headerStyle: {backgroundColor: colorConst.primary },
                headerTintColor: colorConst.textHeader}}
            />

            <MainStack.Screen name={"Edit Profile"} component={EditProfileScreen}
              options={{
                headerStyle: {backgroundColor: colorConst.primary },
                headerTintColor: colorConst.textHeader}}
            />

            <MainStack.Screen name="Add Trip" component={AddTripScreen}
              options={{
                headerStyle: {backgroundColor: colorConst.primary },
                headerTintColor: colorConst.textHeader}}
            />

            <MainStack.Screen name={"Invitations"} component={InvitationsScreen}
              options={{
                headerStyle: {backgroundColor: colorConst.primary },
                headerTintColor: colorConst.textHeader
              }}
            />

            <MainStack.Screen name="Chat" component = {ChatScreen}
              options={({ navigation, route }) => ({
                headerStyle: {backgroundColor: colorConst.primary },
                headerTitle: route.params.otherName,
                headerTintColor: colorConst.textHeader,
                headerRight: () => (
                  <MessengerButtonHeader
                    navigation={navigation}
                    otherName={route.params.otherName}
                    otherID={route.params.otherID}/>
                ) })
              }
            />

            <MainStack.Screen name={"View Journal"} component={JournalScreen}
              options={({navigation, route}) => ({
                headerStyle: {backgroundColor: colorConst.primary },
                headerTintColor: colorConst.textHeader,
                // headerRight: () =>
                //   <EditJournalButton
                //     navigation={navigation}
                //     // journal={route.params.journal}
                //     trip={route.params.trip}
                //   />
              })}
            />

            <MainStack.Screen name={"Edit Photos"} component={EditJournalPhotoScreen}
              options={{
                headerBackTitle: "Back",
                headerStyle: {backgroundColor: colorConst.primary },
                headerTintColor: colorConst.textHeader}}
            />

            <MainStack.Screen name={"Edit Trip"} component={EditTripScreen}
              options={{
                headerStyle: {backgroundColor: colorConst.primary },
                headerTintColor: colorConst.textHeader,
              }}
            />

            <MainStack.Screen name={"Edit Text"} component={EditJournalTextScreen}
              options={() => ({
                headerBackTitle: "Back",
                headerStyle: {backgroundColor: colorConst.primary },
                headerTintColor: colorConst.textHeader,
                headerRight: () => <IconButton icon={'check-circle'} color={colorConst.textHeader} size={27} onPress={Keyboard.dismiss}/>
              })}
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
      <AuthStack.Screen name="Sign Up" key = "signup" component = {SignupScreen} 
        options={{
          headerStyle: {backgroundColor: colorConst.primary },
          headerTintColor:colorConst.textHeader}}/>
      <AuthStack.Screen name="Reset Password" key = "resetpassword" component = {ForgotPasswordScreen} 
        options={{
          headerStyle: {backgroundColor: colorConst.primary },
          headerTintColor:colorConst.textHeader}}/>
      <AuthStack.Screen name="Setup" key = "setup" component = {SetupProfileScreen} options={{headerShown:false}}/>
    </AuthStack.Navigator>
  )
}

const HomeTab = createMaterialBottomTabNavigator();

export const HomeScreenTab = () => {
  return (
    <HomeTab.Navigator
      // shifting={true}
      initialRouteName="Home"
      // activeColor= {colorConst.accent}
    >    
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
        name="Messages"
        component={ChatListScreen}
        options={
          {
            tabBarLabel: 'Messages',
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

export const DashboardScreenStack = ({navigation}) => {
  return (
    <>
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
            <DashboardHeader navigation={navigation} />
          )
        },
      })}/>
    </DashboardStack.Navigator>
    <DashboardFAB navigation={navigation}/>
    </>
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
          tabBarLabel: 'Your plans'
        }}/>
      <DashboardTab.Screen 
        name="Past" 
        component={PastScreen}
        options={{
          tabBarLabel: 'Your journals'
        }}/>
    </DashboardTab.Navigator>
  )
} 