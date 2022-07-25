import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as screens from './../constants/screens';
import Splash from '../screens/splash';
import Login from '../screens/login';
import SignUp from '../screens/signup';
import TabContainer from './tabNavigation';
import QuestionScreen from '../screens/questions/index';
import HintScreen from '../screens/questions/hint';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screens.SPLASH} component={Splash} />
      <Stack.Screen name={screens.LOGIN} component={Login} />
      <Stack.Screen name={screens.SIGNUP} component={SignUp} />
      <Stack.Screen name={screens.TAB_CONTAINER} component={TabContainer} />
    </Stack.Navigator>
  );
}

export default AppNavigator;