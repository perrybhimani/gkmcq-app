import React from "react";
import { View, StyleSheet, Text } from "react-native";
import * as screens from "../../constants/screens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  isIphoneXorAbove,
  responsiveHeight,
  responsiveWidth,
} from "../../utils/scalingUtils";
import * as Colors from "./../../themes/colors";
import { SvgXml } from "react-native-svg";
import * as Icons from "../../constants/svg";
import Leaderboard from "../leaderboard";
import ProfileScreen from "../profile/index";

const Tab = createBottomTabNavigator();
function TabContainer(props) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 10,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: Colors.NEVY_BLUE,
          borderRadius: responsiveHeight(60),
          height: responsiveHeight(6.5),
          paddingLeft: responsiveHeight(4),
          paddingRight: responsiveHeight(4),
          marginBottom:
            Platform.OS === "ios" ? responsiveHeight(2) : responsiveHeight(0),
          paddingTop: responsiveHeight(1),
        },
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <View style={styles.indicatorFocusedContainer}>
                <SvgXml xml={Icons.LEADERBOARD} style={styles.tabIcon} />
                <View style={styles.indicatorFocusedStyle} />
              </View>
            ) : (
              <View style={styles.indicatorFocusedContainer}>
                <SvgXml xml={Icons.LEADERBOARD} style={styles.tabIcon} />
              </View>
            );
          },
        }}
        name={screens.LEADERBOARD}
        component={Leaderboard}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <View style={styles.indicatorFocusedContainer}>
                <SvgXml xml={Icons.APPS} style={styles.tabIcon} />
                <View style={styles.indicatorFocusedStyle} />
              </View>
            ) : (
              <View style={styles.indicatorFocusedContainer}>
                <SvgXml xml={Icons.APPS} style={styles.tabIcon} />
              </View>
            );
          },
        }}
        name={screens.APPNAME}
        component={ProfileScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <View style={styles.indicatorFocusedContainer}>
                <SvgXml xml={Icons.PROFILE} style={styles.tabIcon} />
                <View style={styles.indicatorFocusedStyle} />
              </View>
            ) : (
              <View style={styles.indicatorFocusedContainer}>
                <SvgXml xml={Icons.PROFILE} style={styles.tabIcon} />
              </View>
            );
          },
        }}
        name={screens.PROFILE}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}
export default TabContainer;

const styles = StyleSheet.create({
  tabIcon: {
    maxWidth: responsiveHeight(2.2),
  },
  indicatorFocusedContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop:
      Platform.OS === "ios"
        ? isIphoneXorAbove()
          ? responsiveHeight(2)
          : 0
        : 0,
    marginBottom:
      Platform.OS === "ios"
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
    borderRadius: responsiveHeight(2.5),
  },
});
