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

function LevelTitleCompoent(props) {
  return (
    <View style={styles.titleComponentContainer}>
      <View style={styles.starIconContainer}>
        <SvgXml style={styles.starIcon} xml={Icons.LEVEL_STAR} />
      </View>
      <Text style={styles.titleText}>{props.title}</Text>
    </View>
  );
}

function TopicComponent(props) {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        position: 'absolute',
        left:
          props.position === 'center'
            ? responsiveWidth(48) - responsiveWidth(17 - 4.25)
            : props.position === 'left'
            ? !props.isCenter
              ? (responsiveWidth(48) - responsiveWidth(17 - 4.25)) / 2
              : 15
            : !props.isCenter
            ? responsiveWidth(71.25) - responsiveWidth(71.25) / 4
            : responsiveWidth(77.4) - responsiveWidth(4.25) - 15,
      }}
      onPress={async () => {
        if (props.progress < 100 && props.totalQuestion !== 0) {
          await props.getSelectedTopicId(props.topicId);
          await props.navigation.navigate(screens.QUESTION_NAVIGATION, {
            screen: screens.QUESTION_SCREEN,
            params: { selected: true },
          });
        }
      }}
    >
      <CircularProgress
        style={{ transform: [{ scaleX: -1 }], alignSelf: 'center' }}
        size={responsiveWidth(20)}
        width={4}
        fill={props.progress}
        rotation={360}
        tintColor={Colors.GREEN}
        padding={1}
      >
        {() => (
          <View style={styles.topic}>
            <Image
              style={styles.topicImage}
              source={{
                uri: props.image,
              }}
            />
          </View>
        )}
      </CircularProgress>
      <Text style={styles.topicName}>{props.name}</Text>
    </TouchableOpacity>
  );
}

function LevelScreen(props) {
  const [loading, setLoading] = useState(true);
  const [userProgressData, setUserProgressData] = useState([]);
  const selected = props?.route ? props?.route?.params?.selected : null;
  const section = props?.route ? props?.route?.params?.section : null;
  useEffect(() => {
    setLoading(true);
    const unsubscribe = props.navigation.addListener('focus', async (e) => {
      props.getUserProgress(section, (res) => {
        setLoading(false);
        if (res.status === 200) {
          setUserProgressData(res?.data);
        }
      });
    });
    return unsubscribe;
  }, [props.navigation, selected]);
  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps={'always'}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContentContainer}
      >
        <Header
          title='Select Level'
          // leftIcon={Icons.BOOK}
          leftIconPress={() => props.navigation.navigate(screens.APPNAME)}
          rightIconPress={() => props.navigation.navigate(screens.NOTIFICATION)}
        />
        {loading ? (
          <View style={styles.indicatorView}>
            <ActivityIndicator color={Colors.BRIGHT_BLUE} size={'large'} />
          </View>
        ) : (
          <View style={styles.innerContainer}>
            {userProgressData.map((userProgress, index) => (
              <View key={`userProgress${index}`} style={{ width: '100%' }}>
                <LevelTitleCompoent
                  title={`Level ${userProgress.topicLevel}${
                    userProgress.topicLevelName
                      ? ` - ${userProgress.topicLevelName}`
                      : ''
                  }`}
                />
                {userProgress.userProgress.map((progress, index) => {
                  const isCenter = progress.some(
                    (value) => value.topicPosition === 'center'
                  );
                  return (
                    <View
                      key={`progress${index}`}
                      style={styles.topicsContainer}
                    >
                      <View style={styles.topicsRowContainer}>
                        {progress.map((pro, index) => (
                          <TopicComponent
                            key={pro.topicId}
                            isCenter={isCenter}
                            position={pro.topicPosition}
                            name={pro.topicName}
                            progress={pro.progress}
                            image={pro.topicImage}
                            navigation={props.navigation}
                            topicId={pro.topicId}
                            getSelectedTopicId={props.getSelectedTopicId}
                            totalQuestion={pro.totalQuestion}
                          />
                        ))}
                      </View>
                    </View>
                  );
                })}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserProgress: (section, callBack) =>
      dispatch({ type: REQUEST_GET_USER_PROGRESS, section, callBack }),
    getSelectedTopicId: (topicId) =>
      dispatch({ type: REQUEST_GET_SELECTED_TOPICID, topicId }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LevelScreen);

const styles = StyleSheet.create({
  indicatorView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.SKY_BLUE,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.SKY_BLUE,
  },
  scrollContentContainer: {
    paddingBottom: responsiveHeight(15),
    flexGrow: 1,
  },
  innerContainer: {
    paddingHorizontal: responsiveWidth(5),
    marginTop: 3,
    alignItems: 'center',
  },
  leftIcon: {
    minWidth: responsiveWidth(15),
    minHeight: responsiveWidth(15),
    maxWidth: responsiveWidth(15),
    maxHeight: responsiveWidth(15),
    position: 'absolute',
    top: ' -70%',
  },
  titleComponentContainer: {
    width: '100%',
    height: responsiveHeight(6),
    borderRadius: responsiveHeight(50),
    borderWidth: 1,
    borderColor: Colors.BLACK,
    paddingHorizontal: responsiveHeight(7.6),
    justifyContent: 'center',
    marginBottom: 10,
    backgroundColor: Colors.LIGHT_BLACK
  },
  starIconContainer: {
    position: 'absolute',
    left: -0.2,
    top: responsiveHeight(-0.3),
    height: responsiveHeight(6.3),
    backgroundColor: Colors.BLACK,
    width: responsiveHeight(6.3),
    borderRadius: responsiveHeight(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    height: '100%',
  },
  starIcon: {
    minWidth: '65%',
    minHeight: '65%',
    maxWidth: '65%',
    maxHeight: '65%',
    // position: 'absolute',
    // top: ' -100%',
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
    fontFamily: Fonts.NUNITO_MEDIUM,
    fontSize: responsiveFontSize(1.7),
    color: Colors.THICK_WHITE
  },
  topicsContainer: {
    paddingTop: responsiveHeight(2),
    width: '100%',
  },
  topicsRowContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    minHeight: responsiveWidth(20),
    // alignItems: 'center',
  },
  topic: {
    width: '100%',
    height: '100%',
    borderRadius: responsiveHeight(50),
    borderWidth: responsiveWidth(0.6),
    borderColor: Colors.LIGHT_BLACK,
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
