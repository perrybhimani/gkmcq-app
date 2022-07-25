import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import * as Icons from '../../constants/svg';
import * as Colors from './../../themes/colors';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
  isIphoneXorAbove,
} from '../../utils/scalingUtils';
import * as screens from '../../constants/screens';
import * as Fonts from '../../themes/fonts';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import { logoutStrings, profile } from '../../constants/strings';
import CircularProgress from '../../components/ProgressCircle/CircularProgress';
import { clearToken, clearUser } from '../../utils/storageUtils';
import { resetRoute } from '../../utils/navigationUtils';
import { connect } from 'react-redux';
import {
  REQUEST_GET_USER_PROFILE,
  REQUEST_GET_DAILY_STREAK,
  REQUEST_GET_LEARNING_PROGRESS,
} from '../../redux/actions/userActions';
import CustomLoader from '../../components/CustomLoader';
import { GRAPH_TIME_PERIODS } from '../../utils/commonUtils';
import Image from 'react-native-fast-image';
import idx from 'idx';
import TimePeriodGraph from '../../components/TimePeriodGraph';
import { REQUEST_GET_SELECTED_TOPICID } from '../../redux/actions/questionActions';
import UserAvatar from 'react-native-user-avatar';

function ProfileScreen(props) {
  const { navigation } = props;
  const [selectMonth, setSelectMonth] = useState(moment().format('MMMM'));
  const [userProfileData, setUserProfileData] = useState([]);
  const [profileLoading, setProfileLoading] = useState(true);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState(
    GRAPH_TIME_PERIODS[0].key
  );
  const [dailyStreakLoading, setDailyStreakLoading] = useState(true);
  const [learningProgressLoading, setLearningProgressLoading] = useState(true);
  const [dailyStreakData, setDailyStreakData] = useState({});
  const [datesOfMonth, setDatesOfMonth] = useState([]);
  const [learningProgress, setLearningProgress] = useState([]);
  const [userName, setUserName] = useState('');

  const handleGetDailyStreak = (date) => {
    props.getDailyStreak(date, (res) => {
      setDailyStreakLoading(false);
      if (res.status === 200) {
        setDailyStreakData(res.data);
      }
    });
  };

  const handleSetDatesOfMonth = (date) => {
    setDailyStreakLoading(true);
    const now = date ? new Date(date) : new Date();
    const tempDatesOfMonths = getAllDaysInMonth(
      now.getFullYear(),
      now.getMonth()
    );
    setDatesOfMonth(tempDatesOfMonths);
    handleGetDailyStreak(moment(now).format('YYYY-MM-DD'));
  };

  useEffect(() => {
    setProfileLoading(true);
    const unsubscribe = props.navigation.addListener('focus', async (e) => {
      const currentMonth = moment().format('MMMM');
      const time = GRAPH_TIME_PERIODS[0].key;
      setSelectMonth(currentMonth);
      props.getUserProfile((res) => {
        setProfileLoading(false);
        if (res.status === 200) {
          setUserProfileData(res?.data);
          setUserName(res?.data?.name);
        }
      });
      handleSetDatesOfMonth();
      setSelectedTimePeriod(GRAPH_TIME_PERIODS[0].key);
      props.getLearningProgress(time, (res) => {
        if (res.status === 200) {
          setLearningProgress(res?.data);
          setLearningProgressLoading(false);
        }
      });
    });
    return unsubscribe;
  }, [props.navigation]);

  const onPressLogout = () => {
    const { navigation } = props;
    return Alert.alert(
      logoutStrings.LOGOUT,
      logoutStrings.WANT_TO_LOGOUT,
      [
        {
          text: 'No',
        },
        {
          text: 'Yes',
          onPress: async () => {
            await clearToken();
            await clearUser();
            resetRoute(navigation, screens.LOGIN);
          },
        },
      ],
      { cancelable: false }
    );
  };
console.log(userProfileData)
  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={{
            position: 'absolute',
            top:
              Platform.OS === 'ios' ? responsiveHeight(5) : responsiveHeight(2),
            right: responsiveWidth(2),
          }}
          onPress={() => {
            onPressLogout();
          }}
        >
          <Text
            style={{ color: Colors.SKY_BLUE, fontSize: responsiveFontSize(2) }}
          >
            Logout
          </Text>
        </TouchableOpacity>
        <View style={styles.headerInnerContainer} />
        <View style={styles.headerViewContainer}>
          {/* <View style={{ flex: 4 }}>
            <View style={styles.profileImageCircleStyle}>
            </View>
          </View> */}
          <View
            style={{
              flex: 8,
              marginTop: responsiveHeight(1),
            }}
          >
            <View style={styles.profileTextView}>
              <UserAvatar
                size={75}
                name={userProfileData.name}
                bgColors={[Colors.SKY_BLUE, Colors.DARK_YELLOW]}
              />
              <Text style={styles.profileNameText}>{userProfileData.name}</Text>

              {/* <View style={styles.editIcon}>
                <TouchableOpacity
                  onPress={() => {
                    if (userProfileData && userProfileData._id)
                      navigation.navigate(screens.EDIT_PROFILE, {
                        name: idx(userProfileData, (_) => _.name) || '',
                        email: idx(userProfileData, (_) => _.email) || '',
                        id: userProfileData._id,
                      });
                  }}
                >
                  <SvgXml
                    width={responsiveWidth(3.5)}
                    height={responsiveHeight(2)}
                    xml={Icons.EDIT}
                  />
                </TouchableOpacity>
              </View> */}
            </View>
            {/* <Text style={styles.subTextStyle}>Beginner</Text> */}
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.settingIconStyle}>
              <TouchableOpacity
                onPress={() => {
                  if (userProfileData && userProfileData._id)
                    navigation.navigate(screens.SETTING, {
                      name: idx(userProfileData, (_) => _.name) || '',
                      email: idx(userProfileData, (_) => _.email) || '',
                      id: userProfileData._id,
                    });
                }}
              >
                <SvgXml
                  width={responsiveWidth(5)}
                  height={responsiveHeight(5)}
                  xml={Icons.SETTING}
                  fill={Colors.SKY_BLUE}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const noOnGoingTopic = (data) => {
    return (
      <View style={styles.noTopicContainer}>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.noTopicTitleText}>{profile.ONGOING_TITLE}</Text>
          {/* <Text style={styles.noTopicSubText}>{profile.ONGOING_TEXT}</Text> */}
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data}
            keyExtractor={(item, index) => index}
            renderItem={(item, index) => {
              return (
                <TouchableOpacity
                  style={styles.noOngoingTopicTouchArea}
                  onPress={async () => {
                    await props.getSelectedTopicId(item.item.topicId);
                    await navigation.navigate(screens.QUESTION_NAVIGATION, {
                      screen: screens.QUESTION_SCREEN,
                      params: { selected: true },
                    });
                  }}
                >
                  <View style={styles.topicBorder}>
                    <Image
                      style={styles.noTopicIcon}
                      source={{
                        uri: item?.item?.topicImage,
                      }}
                    />
                  </View>

                  <Text style={styles.noTopicText}>{item.item.topicName}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    );
  };

  const onGoingTopic = (data) => {
    return (
      <>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          keyExtractor={(item, index) => index}
          renderItem={(item, index) => {
            return (
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={[styles.onGoingTopicContainer, { elevation: 0 }]}
                colors={['#245dfa', '#7444fb', '#bd2efc']}
              >
                <TouchableOpacity
                  style={styles.noOngoingTopicTouchArea}
                  onPress={async () => {
                    await props.getSelectedTopicId(item.item.topicId);
                    await navigation.navigate(screens.QUESTION_NAVIGATION, {
                      screen: screens.QUESTION_SCREEN,
                      params: { selected: true },
                    });
                  }}
                >
                  <CircularProgress
                    style={{ transform: [{ scaleX: -1 }] }}
                    size={60}
                    width={5.5}
                    fill={item.item.progress}
                    rotation={360}
                    tintColor={Colors.GREEN}
                  >
                    {() => (
                      <View style={styles.onGoingtopicBorder}>
                        <Image
                          style={styles.noTopicIcon}
                          source={{
                            uri: item?.item?.topicImage,
                          }}
                        />
                      </View>
                    )}
                  </CircularProgress>
                </TouchableOpacity>
                <View style={styles.onGoingInnerContainer}>
                  <Text style={styles.onGoingTitleText}>
                    {item.item.topicName}
                  </Text>
                  <Text style={styles.onGoingSubTitleText}>{`${Math.round(
                    item.item.progress
                  )}% Completed`}</Text>
                </View>
              </LinearGradient>
            );
          }}
        />
      </>
    );
  };
  // const barChart = () => {
  //   const changeTracking = async (time) => {
  //     setSelectedTimePeriod(time);
  //     props.getLearningProgress(time, (res) => {
  //       setProfileLoading(false);
  //       if (res.status === 200) {
  //         setLearningProgress(res?.data);
  //         setLearningProgressLoading(false);
  //       }
  //     });
  //   };

  //   const renderTimePeriod = () => {
  //     return (
  //       <View style={styles.timePeriodContainer}>
  //         {GRAPH_TIME_PERIODS.map((el, index) => {
  //           const isSelected = el.key === selectedTimePeriod;
  //           const { title, key } = el;
  //           return (
  //             <TouchableOpacity
  //               style={{ display: 'flex', alignItems: 'center' }}
  //               key={index}
  //               onPress={() => changeTracking(key)}
  //             >
  //               <Text style={styles.timePeriod(isSelected)}>{title}</Text>
  //               <View style={styles.selectedLine(isSelected)} />
  //             </TouchableOpacity>
  //           );
  //         })}
  //       </View>
  //     );
  //   };
  //   const dataKey = 'totalQuestions';
  //   return (
  //     <View style={styles.learningProgressContainer}>
  //       <View style={{ flexDirection: 'row' }}>
  //         <Text style={styles.learningProgressText}>
  //           {profile.LEARNING_PROGRESS}
  //         </Text>
  //         {renderTimePeriod()}
  //       </View>
  //       {learningProgressLoading ? (
  //         <View style={styles.streaksSubText}>
  //           <ActivityIndicator color={Colors.BRIGHT_BLUE} size={'small'} />
  //         </View>
  //       ) : (
  //         <TimePeriodGraph
  //           dataKey={dataKey}
  //           dataType={selectedTimePeriod}
  //           categoryData={learningProgress}
  //           showBarChart
  //         />
  //       )}
  //     </View>
  //   );
  // };
  const getAllDaysInMonth = (year, month) => {
    const date = new Date(year, month, 1);

    const dates = [];

    while (date.getMonth() === month) {
      const newDate = moment(date).format('YYYY-MM-DD');
      dates.push(newDate.toString());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const dailyStreak = () => {
    return (
      <View
        style={[
          styles.noTopicContainer,
          { paddingVertical: responsiveHeight(1) },
        ]}
      >
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.dailyStreakTextView}>
            <Text style={styles.streaksTitleText}>{profile.STREAK}</Text>
            {dailyStreakData.hotStreak && (
              <SvgXml xml={Icons.TITLE} style={styles.streaksIconStyle} />
            )}
          </View>
          {dailyStreakData.hotStreak && (
            <View style={styles.monthTextView}>
              <TouchableOpacity
                style={styles.monthArrowView}
                onPress={() => {
                  const previousMonth = moment()
                    .month(selectMonth)
                    .subtract(1, 'month')
                    .startOf('month')
                    .format('MMMM');
                  setSelectMonth(previousMonth);
                  const date = moment()
                    .month(selectMonth)
                    .set('date', 1)
                    .subtract(1, 'month');
                  handleSetDatesOfMonth(date);
                }}
              >
                <SvgXml
                  xml={Icons.LEFT_BACK}
                  fill={Colors.BLACK}
                  height={responsiveHeight(1)}
                  width={responsiveWidth(1)}
                />
              </TouchableOpacity>
              <Text style={styles.monthText}>{selectMonth}</Text>
              <TouchableOpacity
                style={styles.monthArrowView}
                onPress={() => {
                  const nextMonth = moment()
                    .month(selectMonth)
                    .add(1, 'month')
                    .startOf('month')
                    .format('MMMM');
                  setSelectMonth(nextMonth);
                  const date = moment()
                    .month(selectMonth)
                    .set('date', 1)
                    .add(1, 'month');
                  handleSetDatesOfMonth(date);
                }}
              >
                <SvgXml
                  xml={Icons.RIGHT_BACK}
                  fill={Colors.BLACK}
                  height={responsiveHeight(1)}
                  width={responsiveWidth(1)}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
        {/* No any streaks */}
        {dailyStreakLoading ? (
          <View style={styles.streaksSubText}>
            <ActivityIndicator color={Colors.BRIGHT_BLUE} size={'small'} />
          </View>
        ) : dailyStreakData.streak &&
          dailyStreakData.streak.length === 0 &&
          !dailyStreakLoading ? (
          <Text style={styles.streaksSubText}>
            {!dailyStreakData.hotStreak
              ? 'Gain your knowledge daily to maintain your streak!'
              : 'Oops! No streaks this month!'}
          </Text>
        ) : (
          <FlatList
            data={datesOfMonth || []}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index}
            renderItem={(item, index) => {
              return (
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={[
                    styles.dailyStreakInnerContainer,
                    {
                      elevation: 0,
                      opacity:
                        dailyStreakData.streak &&
                        dailyStreakData.streak.includes(item.item)
                          ? 1
                          : 0.5,
                    },
                  ]}
                  colors={['#245dfa', '#7444fb', '#bd2efc']}
                >
                  <Text
                    style={{
                      fontFamily: Fonts.NUNITO_REGULAR,
                      fontSize: responsiveFontSize(1.4),
                      color: Colors.WHITE,
                    }}
                  >
                    {moment(item.item).format('D')}
                  </Text>
                  <SvgXml
                    xml={Icons.FIRE}
                    style={{ marginTop: responsiveHeight(0.5) }}
                  />
                </LinearGradient>
              );
            }}
          />
        )}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {profileLoading ? (
        <View style={styles.spinner}>
          <CustomLoader isLoading={profileLoading} />
        </View>
      ) : (
        <ScrollView
          keyboardShouldPersistTaps={'always'}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContentContainer}
        >
          {renderHeader()}
          {/* <View style={styles.myCoursesTextView}>
            <Text style={styles.myCoursesText}>{profile.COURSES}</Text>
            <SvgXml xml={Icons.TITLE} style={styles.titleIcon} />
          </View> */}
          <View style={styles.onGoingView}>
            {/* <View style={styles.noTopicInnerContainer}>
              <Text style={styles.onGoingText}>{profile.ONGOING}</Text>
              <View style={styles.onGoingLine} />
            </View> */}
            {/* <View style={{ flex: 8 }}>
              <TouchableOpacity style={styles.leaderBoardView}>
                <Text
                  style={styles.leaderBoardText}
                  onPress={() => resetRoute(navigation, screens.LEADERBOARD)}
                >
                  {profile.LEADERBOARD}
                </Text>
                <SvgXml xml={Icons.FORWARD_ARROW} />
              </TouchableOpacity>
            </View> */}
          </View>
          {/* NO ON GOING TOPIC // ON GOING TOPIC */}
          <View style={styles.onTopicStyle}>
            {!userProfileData.ongoing
              ? noOnGoingTopic(userProfileData.userProgress)
              : onGoingTopic(userProfileData.userProgress)}
          </View>
          {/* {barChart()} */}

          <View style={styles.onTopicStyle}>{dailyStreak()}</View>
          {/* </View> */}
        </ScrollView>
      )}
    </View>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserProfile: (callBack) =>
      dispatch({ type: REQUEST_GET_USER_PROFILE, callBack }),
    getDailyStreak: (date, callBack) =>
      dispatch({ type: REQUEST_GET_DAILY_STREAK, date, callBack }),
    getLearningProgress: (timePeriod, callBack) =>
      dispatch({ type: REQUEST_GET_LEARNING_PROGRESS, timePeriod, callBack }),
    getSelectedTopicId: (topicId) =>
      dispatch({ type: REQUEST_GET_SELECTED_TOPICID, topicId }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

const styles = StyleSheet.create({
  onGoingtopicBorder: {
    width: '100%',
    height: '100%',
    borderRadius: responsiveHeight(50),
    borderWidth: 3,
    borderColor: Colors.LIGHT_BLUE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topicBorder: {
    width: responsiveWidth(16),
    height: responsiveWidth(16),
    marginHorizontal: responsiveWidth(3),
    borderRadius: responsiveHeight(50),
    borderWidth: 3,
    borderColor: Colors.LIGHT_BLUE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noTopicIcon: {
    width: '100%',
    height: '100%',
    borderRadius: responsiveHeight(50),
    borderColor: Colors.THICK_GRAY,
    transform: [{ scaleX: -1 }],
  },
  spinner: {
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.SKY_BLUE,
  },
  scrollContentContainer: {
    paddingBottom: responsiveHeight(15),
    flexGrow: 1,
  },
  headerContainer: {
    width: responsiveWidth(100),
    height: Platform.OS === 'ios' ? responsiveHeight(20) : responsiveHeight(15),
    backgroundColor: Colors.NEVY_BLUE,
    display: 'flex',
  },
  headerInnerContainer: {
    zIndex: 0,
    width: '25%',
    height: Platform.OS === 'ios' ? '100%' : '60%',
    left: '36.5%',
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? '-83%' : '-45%',
    // borderTopLeftRadius: responsiveHeight(70),
    // borderTopRightRadius: responsiveHeight(70),
    backgroundColor: Colors.SKY_BLUE,
    transform: [{ scaleX: 5.5 }, { scaleY: 1 }],
  },
  headerViewContainer: {
    marginTop:
      Platform.OS === 'ios' ? responsiveHeight(6) : responsiveHeight(1.5),
    marginBottom: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(4),
    width: '100%',
    alignItems: 'center',
  },
  profileImageCircleStyle: {
    height: responsiveHeight(11),
    width: responsiveHeight(11),
    borderRadius: responsiveHeight(5.5),
    justifyContent: 'center',
    alignItems: 'center',
    top: Platform.OS === 'ios' ? responsiveHeight(-2.5) : responsiveHeight(-3),
    position: 'absolute',
    backgroundColor: Colors.SKY_BLUE,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  profileNameText: {
    marginLeft: responsiveWidth(2),
    marginTop: responsiveHeight(2.5),
    fontFamily: Fonts.NUNITO_MEDIUM,
    fontSize: responsiveFontSize(2.5),
    color: Colors.SKY_BLUE,
  },
  profileTextView: {
    flexDirection: 'row',
  },
  editIcon: {
    marginLeft: responsiveWidth(2),
    marginTop: responsiveHeight(1),
  },
  settingIconStyle: {
    marginLeft: responsiveWidth(4.5),
    marginTop: responsiveHeight(2),
  },
  subTextStyle: {
    fontFamily: Fonts.NUNITO_REGULAR,
    color: '#CECFE8',
    fontSize: responsiveFontSize(1.6),
    marginTop: responsiveHeight(3),
  },
  titleIcon: {
    maxWidth: responsiveWidth(11),
    marginLeft: responsiveWidth(3.5),
  },
  myCoursesTextView: {
    marginLeft: responsiveWidth(6),
    marginTop: responsiveHeight(1.5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  myCoursesText: {
    fontFamily: Fonts.NUNITO_SEMI_BOLD,
    color: Colors.BLACK,
    fontSize: responsiveFontSize(2.5),
  },
  onGoingView: {
    marginHorizontal: responsiveWidth(6),
    flexDirection: 'row',
  },
  onGoingText: {
    color: Colors.BLACK,
    fontFamily: Fonts.NUNITO_SEMI_BOLD,
    textAlign: 'center',
    fontSize: responsiveFontSize(1.8),
    marginTop: responsiveHeight(0.5),
  },
  onGoingLine: {
    backgroundColor: Colors.BLUE,
    marginTop: responsiveHeight(0.5),
    borderWidth: 0.5,
    marginHorizontal: responsiveWidth(5),
    width: responsiveWidth(8),
  },
  leaderBoardView: {
    borderColor: Colors.PURPLE,
    borderWidth: 1,
    borderRadius: responsiveHeight(2),
    height: responsiveHeight(4),
    marginLeft: responsiveWidth(40),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  leaderBoardText: {
    color: Colors.BLACK,
    fontFamily: Fonts.NUNITO_REGULAR,
    textAlign: 'right',
    fontSize: responsiveFontSize(1.5),
    marginRight: responsiveWidth(1),
  },
  onTopicStyle: {
    zIndex: 1,
    marginTop: responsiveHeight(2),
  },
  noTopicContainer: {
    marginHorizontal: responsiveWidth(4),
    width: '92%',
    borderRadius: responsiveHeight(1),
    backgroundColor: Colors.SKY_BLUE,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.22,
    shadowRadius: 5.46,
    elevation: 9,
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(2),
  },
  noTopicInnerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  noOngoingTopicTouchArea: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  noTopicTitleText: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: Fonts.NUNITO_MEDIUM,
    paddingBottom: responsiveHeight(2)
  },
  noTopicSubText: {
    marginTop: responsiveHeight(0.5),
    width: '60%',
    textAlign: 'center',
    fontSize: responsiveFontSize(1.4),
    fontFamily: Fonts.NUNITO_MEDIUM,
    marginBottom: responsiveHeight(1),
  },
  noTopicText: {
    marginTop: responsiveHeight(0.8),
    fontFamily: Fonts.NUNITO_MEDIUM,
    fontSize: responsiveFontSize(1.4),
    color: Colors.THICK_GRAY
  },
  onGoingTopicContainer: {
    width: responsiveWidth(42),
    height:
      Platform.OS === 'ios'
        ? isIphoneXorAbove()
          ? responsiveHeight(17.5)
          : responsiveHeight(20)
        : responsiveHeight(18),
    marginHorizontal: responsiveWidth(4),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: responsiveWidth(3),
  },
  onGoingInnerContainer: {
    backgroundColor: Colors.SKY_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(2),
    width: responsiveWidth(35),
    height: responsiveHeight(6),
    borderRadius: responsiveWidth(2),
  },
  onGoingTitleText: {
    fontSize: responsiveFontSize(2),
    fontFamily: Fonts.NUNITO_SEMI_BOLD,
    color: Colors.BLACK,
  },
  onGoingSubTitleText: {
    marginTop: responsiveHeight(0.5),
    fontSize: responsiveFontSize(1.3),
    fontFamily: Fonts.NUNITO_REGULAR,
    color: Colors.LIGHT_GRAY,
  },
  streaksTitleText: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: Fonts.NUNITO_SEMI_BOLD,
    color: Colors.BLACK,
  },
  streaksSubText: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: Fonts.NUNITO_REGULAR,
    color: Colors.BLACK,
    marginTop: responsiveHeight(2),
    textAlign: 'center',
    paddingHorizontal: responsiveWidth(5),
    paddingBottom: 10,
  },
  streaksIconStyle: {
    maxHeight: responsiveHeight(3),
    maxWidth: responsiveWidth(7.5),
    marginLeft: responsiveWidth(3),
  },
  dailyStreakTextView: {
    flex: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  monthTextView: {
    flex: 1.8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  monthArrowView: {
    height: responsiveHeight(2),
    width: responsiveWidth(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthText: {
    color: Colors.BLACK,
    width: responsiveWidth(14),
    textAlign: 'center',
    fontFamily: Fonts.NUNITO_REGULAR,
    fontSize: responsiveFontSize(1.2),
  },
  dailyStreakInnerContainer: {
    marginTop: responsiveHeight(1),
    width: responsiveWidth(10),
    height: isIphoneXorAbove() ? responsiveHeight(7) : responsiveHeight(8),
    marginLeft: responsiveWidth(1),
    marginRight: responsiveWidth(1.8),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: responsiveWidth(3),
  },
  chartStyle: {
    marginTop: responsiveHeight(2),
    marginLeft: -responsiveWidth(3),
  },
  learningProgressText: {
    fontFamily: Fonts.NUNITO_SEMI_BOLD,
    color: Colors.BLACK,
    fontSize: responsiveFontSize(2),
    flex: 2,
  },
  timePeriodContainer: {
    marginBottom: responsiveHeight(1),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timePeriod: (isSelected) => ({
    color: isSelected ? Colors.BLUE : Colors.LIGHT_GRAY,
    fontSize: responsiveFontSize(1.1),
    marginHorizontal: responsiveWidth(1),
    fontFamily: Fonts.NUNITO_MEDIUM,
    paddingBottom: responsiveHeight(0.5),
  }),
  selectedLine: (isSelected) => ({
    width: isSelected ? '40%' : 0,
    height: responsiveHeight(0.1),
    backgroundColor: Colors.BLUE,
    alignItems: 'center',
  }),
  learningProgressContainer: {
    marginHorizontal: responsiveWidth(4),
    marginTop: responsiveWidth(4),
    width: '92%',
    borderRadius: responsiveHeight(1),
    backgroundColor: Colors.WHITE,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.22,
    shadowRadius: 5.46,
    elevation: 9,
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(5),
  },
});
