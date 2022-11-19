import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import * as Colors from '../../themes/colors';
import { Header } from '../../components/Header';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/scalingUtils';
import * as Fonts from '../../themes/fonts';
import * as Icons from '../../constants/svg';
import { SvgXml } from 'react-native-svg';
import CircularProgress from '../../components/ProgressCircle/CircularProgress';
import * as screens from '../../constants/screens';
import { connect } from 'react-redux';
import { REQUEST_GET_USER_PROGRESS } from '../../redux/actions/userActions';
import { REQUEST_GET_SELECTED_TOPICID } from '../../redux/actions/questionActions';
import Image from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

function AppName(props) {
  let { navigation } = props;

  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps={'always'}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContentContainer}
      >
        <Header
          title='Select Level'
          leftIcon={Icons.GLOBE}
          leftIconStyle={styles.leftIcon}
          rightIconPress={() => props.navigation.navigate(screens.NOTIFICATION)}
        />
        <View style={styles.circleContainer}>
          <View style={styles.userImageContainer}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(screens.LEVEL_SCREEN, {
                  selected: true,
                  section: 'Kids',
                })
              }
            >
              <LinearGradient
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
                colors={[Colors.NEVY_BLUE, Colors.SKY_BLUE]}
                style={styles.instagramButton}
              >
                <Text style={styles.titleText}>KIDS</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={styles.circleContainer}>
            <View style={styles.userImageContainer}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(screens.LEVEL_SCREEN, {
                    selected: true,
                    section: 'Adults',
                  })
                }
              >
                <LinearGradient
                  start={{ x: 0, y: 1 }}
                  end={{ x: 0, y: 0 }}
                  colors={[Colors.NEVY_BLUE, Colors.SKY_BLUE]}
                  style={styles.instagramButton}
                >
                  <Text style={styles.titleText}>ADULTS</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* )} */}
      </ScrollView>
    </View>
  );
}

export default AppName;

const styles = StyleSheet.create({
  bookIcon: {
    minWidth: responsiveWidth(15),
    minHeight: responsiveWidth(15),
    maxWidth: responsiveWidth(15),
    maxHeight: responsiveWidth(15),
    paddingLeft: -responsiveWidth(10),
  },
  instagramButton: {
    height: responsiveHeight(15),
    width: responsiveWidth(32),
    borderRadius: responsiveHeight(15),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.SKY_BLUE,
  },
  touchStyle: {
    height: responsiveHeight(5),
    backgroundColor: 'red',
  },
  titleIcon: {
    minWidth: responsiveWidth(15),
    minHeight: responsiveWidth(15),
    maxWidth: responsiveWidth(15),
    maxHeight: responsiveWidth(15),
  },
  circleContainer: {
    width: '100%',
    backgroundColor: Colors.SKY_BLUE,
    display: 'flex',
    borderRadius: 7,
    // shadowColor: Colors.BLACK,
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowOpacity: 0.32,
    // shadowRadius: 5.46,
    // elevation: 9,
    paddingVertical: responsiveHeight(5),
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 13,
  },
  userImageContainer: {
    width: responsiveHeight(19),
    height: responsiveHeight(19),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.SKY_BLUE,
  },

  circle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: responsiveHeight(50),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContentContainer: {
    paddingBottom: responsiveHeight(15),
    flexGrow: 1,
  },
  innerContainer: {
    paddingHorizontal: responsiveWidth(5),
    // marginTop: 3,
    alignItems: 'center',
    // marginBottom: 30,
    height: responsiveWidth(80),
  },
  leftIcon: {
    minWidth: responsiveWidth(12),
    minHeight: responsiveWidth(12),
    maxWidth: responsiveWidth(12),
    maxHeight: responsiveWidth(12),
    position: 'absolute',
    top: ' -90%',
  },
  titleComponentContainer: {
    width: '100%',
    height: responsiveHeight(6),
    borderRadius: responsiveHeight(50),
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY,
    paddingHorizontal: responsiveHeight(7.6),
    justifyContent: 'center',
    marginBottom: 10,
  },
  starIconContainer: {
    position: 'absolute',
    left: -0.2,
    top: responsiveHeight(-0.3),
    height: responsiveHeight(6.3),
    backgroundColor: Colors.NEVY_BLUE,
    width: responsiveHeight(6.3),
    borderRadius: responsiveHeight(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    height: '100%',
  },
  starIcon: {
    minWidth: '55%',
    minHeight: '55%',
  },
  topicImage: {
    width: '100%',
    height: '100%',
    transform: [{ scaleX: -1 }],
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: responsiveHeight(50),
  },
  titleText: {
    fontFamily: Fonts.NUNITO_BOLD,
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },
  topicsContainer: {
    paddingTop: responsiveHeight(2),
    width: '100%',
  },
  topicsRowContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    minHeight: responsiveWidth(40),
    // alignItems: 'center',
  },
  topic: {
    width: '100%',
    height: '100%',
    borderRadius: responsiveHeight(50),
    borderWidth: 3,
    borderColor: Colors.NEVY_BLUE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topicName: {
    color: Colors.BLACK,
    fontFamily: Fonts.NUNITO_SEMI_BOLD,
    fontSize: responsiveFontSize(1.4),
    width: 70,
    textAlign: 'center',
  },
});
