import React from 'react';
import { Provider as PaperProvider , DefaultTheme as PaperDefaultTheme } from "react-native-paper";
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import { NavigationContainer,  DefaultTheme as NavigationDefaultTheme,} from "@react-navigation/native";

//import testing screen here
import {AuthScreenStack, DashboardScreenTab, HomeScreenTab} from "./src/navigation"
import TestScreen from "./src/screen/LoginScreen"

//import permanent object here
import LoadingScreen  from './src/screen/LoadingScreen';
import {getPersistor,getStore} from "./store/store"


const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
  },
};


export default function App() {
  const store = getStore();
  const persistor = getPersistor();
  return (
      <ReduxProvider store={store}>
        <PersistGate persistor={persistor} loading={LoadingScreen}>
        <PaperProvider theme={CombinedDefaultTheme}>
          <NavigationContainer theme={CombinedDefaultTheme}>
            {/* <AuthScreenStack/> */}
            {/* <HomeScreenTab/> */}
            <TestScreen/>
          </NavigationContainer>
        </PaperProvider>
        </PersistGate>
      </ReduxProvider>
        
      
  );
}