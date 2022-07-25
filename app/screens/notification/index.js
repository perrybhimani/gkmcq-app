import { React, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, FlatList } from 'react-native';
import * as Icons from '../../constants/svg';
import * as Colors from './../../themes/colors';
import * as screens from '../../constants/screens';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from '../../utils/scalingUtils';
import { Header } from '../../components/Header';
import * as Fonts from '../../themes/fonts';
import { SvgXml } from 'react-native-svg';
import { NOTIFICATIONS } from '../../constants/dummyData';
import { notifications } from '../../constants/strings';

export default function NotificationScreen(props) {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <Header
        title={notifications.NOTIFICATION}
        rightIcon={Icons.SETTING}
        rightIconPress={() => navigation.navigate(screens.SETTING, {
          name: idx(userProfileData, (_) => _.name) || '',
          email: idx(userProfileData, (_) => _.email) || '',
          id: userProfileData._id,
        })}
        leftIconPress={() => navigation.goBack()}
      />
      <View style={styles.mainContainer}>
        <Text style={styles.textStyle}>{notifications.TODAY}</Text>
        <FlatList
          data={NOTIFICATIONS}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index}
          renderItem={(item, index) => {
            return (
              <>
                <View style={styles.subContainer}>
                  <View style={styles.subContainerText}>
                    <View style={styles.subContainerStyle}>
                      <Text style={styles.subTextStyle}>{item.item.title}</Text>
                    </View>
                    <View style={styles.closeButtonStyle}>
                      <SvgXml
                        height={responsiveHeight(2.5)}
                        width={responsiveWidth(2.5)}
                        xml={Icons.CLOSE_ICON}
                        fill={Colors.BLACK}
                      />
                    </View>
                  </View>
                  <Text style={styles.subContainerTextStyle}>
                    {item.item.time}
                  </Text>
                </View>
              </>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  scrollContentContainer: {
    paddingBottom: responsiveHeight(15),
    flexGrow: 1,
  },
  textStyle: {
    fontFamily: Fonts.NUNITO_SEMI_BOLD,
    fontSize: responsiveFontSize(1.6),
    marginVertical: responsiveHeight(1),
    // marginBottom: responsiveHeight(2),
    color: Colors.LIGHT_GRAY,
  },
  mainContainer: {
    marginHorizontal: responsiveHeight(3),
    marginTop: responsiveHeight(1),
    borderRadius: responsiveHeight(1),
    backgroundColor: Colors.WHITE,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    paddingVertical: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(4),
  },
  subContainer: {
    // height: responsiveHeight(9),
    borderRadius: responsiveHeight(1),
    backgroundColor: Colors.WHITE,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 6,
    paddingVertical: responsiveHeight(1.5),
    paddingHorizontal: responsiveWidth(4),
    flexDirection: 'column',
    marginHorizontal: responsiveWidth(1),
    marginBottom: responsiveHeight(2),
    marginTop: responsiveHeight(0.5),
  },
  subContainerText: {
    flexDirection: 'row',
  },
  subTextStyle: {
    fontFamily: Fonts.NUNITO_SEMI_BOLD,
    color: Colors.BLACK,
    width: '90%',
    fontSize: responsiveFontSize(1.6),
  },
  subContainerTextStyle: {
    fontFamily: Fonts.NUNITO_SEMI_BOLD,
    color: Colors.LIGHT_GRAY,
    width: responsiveWidth(60),
    marginTop: responsiveHeight(0.5),
    // width: "90%",
    fontSize: responsiveFontSize(1.2),
  },
  subContainerStyle: {
    flex: 10,
  },
  closeButtonStyle: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
