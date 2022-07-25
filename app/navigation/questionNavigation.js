import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as screens from './../constants/screens';
import QuestionScreen from '../screens/questions/index';
import HintScreen from '../screens/questions/hint';
import QuestionInformation from '../screens/questions/questionInformation';
import Answer from '../screens/answer';
import DiscussScreen from '../screens/discuss';

const Stack = createNativeStackNavigator();

function QuestionNavigation(props) {
  const setIsBackEffect = (effect) => {
    props.setIsBackEffect(effect);
  };
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={screens.QUESTION_SCREEN}
        // component={QuestionScreen}
      >
        {(props) => (
          <QuestionScreen {...props} setIsBackEffect={setIsBackEffect} />
        )}
      </Stack.Screen>
      <Stack.Screen name={screens.HINT_SCREEN}>
        {(props) => <HintScreen {...props} setIsBackEffect={setIsBackEffect} />}
      </Stack.Screen>
      <Stack.Screen
        name={screens.QUESTION_INFORMATION}
        component={QuestionInformation}
      />
      <Stack.Screen
        name={screens.ANSWER}
        //  component={Answer}
      >
        {(props) => <Answer {...props} setIsBackEffect={setIsBackEffect} />}
      </Stack.Screen>

      <Stack.Screen name={screens.DISCUSS} component={DiscussScreen} />
    </Stack.Navigator>
  );
}

export default QuestionNavigation;
