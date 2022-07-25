import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as screens from '../constants/screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  deviceWidth,
  isIphoneXorAbove,
  responsiveHeight,
  responsiveWidth,
} from '../utils/scalingUtils';
import * as Colors from '../themes/colors';
import { SvgXml } from 'react-native-svg';
import * as Icons from '../constants/svg';
import Leaderboard from '../screens/leaderboard';
import ProfileScreen from '../screens/profile';
import AppName from '../screens/appname';
import NotificationScreen from '../screens/notification';
import SettingScreen from '../screens/settings';
import LevelScreen from '../screens/appname/levelScreen';
import QuestionNavigation from './questionNavigation';
import { resetRoute } from '../utils/navigationUtils';

const tabHideOptions = {
  tabBarButton: () => null,
  tabBarVisible: false,
};

const AppTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: responsiveHeight(6.5) + 10,
        backgroundColor: Colors.SKY_BLUE,
        elevation: 0,
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: deviceWidth - 40,
          backgroundColor: Colors.NEVY_BLUE,
          borderRadius: responsiveHeight(60),
          height: responsiveHeight(6.5),
          paddingLeft: responsiveWidth(4),
          paddingRight: responsiveWidth(4),
          marginBottom:
            Platform.OS === 'ios' ? responsiveHeight(2) : responsiveHeight(0),
          paddingTop: responsiveHeight(1),
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];

          const isFocused = state.index === index;

          const onPress = (e) => {
            e.preventDefault();
            resetRoute(navigation, route.name);
          };

          const menuIcon = () => {
            return route.name === 'LEADERBOARD'
              ? Icons.LEADERBOARD
              : route.name === 'APPNAME'
              ? Icons.APPS
              : Icons.PROFILE;
          };

          if (
            route.name === 'LEADERBOARD' ||
            route.name === 'APPNAME' ||
            route.name === 'PROFILE'
          )
            return (
              <TouchableOpacity
                accessibilityRole='button'
                accessibilityStates={isFocused ? ['selected'] : []}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                key={route.key}
              >
                {isFocused ? (
                  <View style={styles.indicatorFocusedContainer}>
                    <SvgXml xml={menuIcon()} style={styles.tabIcon} />
                    <View style={styles.indicatorFocusedStyle} />
                  </View>
                ) : (
                  <View style={styles.indicatorFocusedContainer}>
                    <SvgXml xml={menuIcon()} style={styles.tabIcon} />
                  </View>
                )}
              </TouchableOpacity>
            );
        })}
      </View>
    </View>
  );
};

const Tab = createBottomTabNavigator();
function TabContainer(props) {
  const [isBackEffect, setIsBackEffect] = useState(false);
  return (
    <>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: responsiveHeight(6.5) + 10,
          backgroundColor: Colors.BLACK,
          zIndex: isBackEffect ? 2 : 0,
          opacity: 0.6,
        }}
      />

      <Tab.Navigator
        initialRouteName={screens.APPNAME}
        tabBar={(props) => <AppTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen name={screens.LEADERBOARD} component={Leaderboard} />
        <Tab.Screen name={screens.APPNAME} component={AppName} />
        <Tab.Screen name={screens.PROFILE} component={ProfileScreen} />
        <Tab.Screen
          options={tabHideOptions}
          name={screens.NOTIFICATION}
          component={NotificationScreen}
        />
        <Tab.Screen
          options={tabHideOptions}
          name={screens.SETTING}
          component={SettingScreen}
        />
        <Tab.Screen
          options={tabHideOptions}
          name={screens.LEVEL_SCREEN}
          component={LevelScreen}
        />
        <Tab.Screen
          options={tabHideOptions}
          name={screens.QUESTION_NAVIGATION}
          children={() => (
            <QuestionNavigation setIsBackEffect={setIsBackEffect} />
          )}
        />
      </Tab.Navigator>
    </>
  );
}
export default TabContainer;

const styles = StyleSheet.create({
  tabIcon: {
    maxWidth: responsiveHeight(2.2),
  },
  indicatorFocusedContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:
      Platform.OS === 'ios'
        ? isIphoneXorAbove()
          ? responsiveHeight(2)
          : 0
        : 0,
    marginBottom:
      Platform.OS === 'ios'
        ? isIphoneXorAbove()
          ? 0
          : responsiveHeight(2)
        : responsiveHeight(1.5),
  },
  indicatorFocusedStyle: {
    width: responsiveHeight(0.6),
    height: responsiveHeight(0.6),
    backgroundColor: Colors.SKY_BLUE,
    marginTop: responsiveHeight(0.5),
    borderRadius: 50,
  },
});
