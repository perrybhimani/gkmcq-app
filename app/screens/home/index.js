import React from 'react';
import { View, Text, Button } from 'react-native';
import * as screens from '../../constants/screens';
import { resetRoute } from '../../utils/navigationUtils';

export default function Home({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        onPress={() => resetRoute(navigation, screens.LOGIN)}
        title='Logout'
        color='#841584'
        style={{
          alignItems: 'center',
          backgroundColor: '#DDDDDD',
          padding: 10,
        }}
      />
    </View>
  );
}
