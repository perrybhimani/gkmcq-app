import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import * as screens from '../../constants/screens';
import * as Colors from './../../themes/colors';
import { Header } from '../../components/Header';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  isIphoneXorAbove,
} from '../../utils/scalingUtils';
import { leaderboard } from '../../constants/strings';
import * as Fonts from './../../themes/fonts';
import { LeaderboardOtherLevel } from '../../components/LeaderboardOtherLevel';
import { LEVEL_BOY_IMAGE, LEVEL_GIRL_IMAGE } from '../../constants/svg';
import { TIME_PERIODS } from '../../utils/commonUtils';
import { LeaderboardLevel1 } from '../../components/LeaderboardLevel1';
import {
  REQUEST_GET_LEADER_BOARD_DATA,
  REQUEST_GET_LEARNING_PROGRESS,
} from '../../redux/actions/userActions';
import { connect } from 'react-redux';
import moment from 'moment';
import { profile } from '../../constants/strings';
import { GRAPH_TIME_PERIODS } from '../../utils/commonUtils';
import TimePeriodGraph from '../../components/TimePeriodGraph';
import CustomLoader from '../../components/CustomLoader';

function Leaderboard(props) {
  const [getLeaderboardLoading, setGetLeaderboardLoading] = useState(true);
  const [leaderBoardData, setLeaderBoardData] = useState([]);

  const [selectedTimePeriod, setSelectedTimePeriod] = useState(
    GRAPH_TIME_PERIODS[0].key
  );
  const [learningProgressLoading, setLearningProgressLoading] = useState(true);
  const [learningProgress, setLearningProgress] = useState([]);

  const handleGetLeaderboardData = (timePeriod) => {
    props.getLeaderboardData(timePeriod, (res) => {
      setGetLeaderboardLoading(false);
      setLeaderBoardData(res?.data);
    });
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', async (e) => {
      setGetLeaderboardLoading(true);
      const time = GRAPH_TIME_PERIODS[0].key;
      setSelectedTimePeriod(GRAPH_TIME_PERIODS[0].key);
      props.getLearningProgress(time, (res) => {
        if (res.status === 200) {
          setLearningProgress(res?.data);
          setLearningProgressLoading(false);
        }
      });
      handleGetLeaderboardData(TIME_PERIODS[0].key);
    });
    return unsubscribe;
  }, [props.navigation]);

  let currentUser = leaderBoardData.find((e) => e.currentUser === true);

  const barChart = () => {
    const changeTracking = async (time) => {
      setSelectedTimePeriod(time);
      props.getLearningProgress(time, (res) => {
        if (res.status === 200) {
          setLearningProgress(res?.data);
          setLearningProgressLoading(false);
        }
      });
    };

    const renderTimePeriod = () => {
      return (
        <View style={styles.timePeriodContainer}>
          {GRAPH_TIME_PERIODS.map((el, index) => {
            const isSelected = el.key === selectedTimePeriod;
            const { title, key } = el;
            return (
              <TouchableOpacity
                style={{ display: 'flex', alignItems: 'center' }}
                key={index}
                onPress={() => changeTracking(key)}
              >
                <Text style={styles.timePeriod(isSelected)}>{title}</Text>
                <View style={styles.selectedLine(isSelected)} />
              </TouchableOpacity>
            );
          })}
        </View>
      );
    };
    const dataKey = 'totalQuestions';
    return (
      <View>
        <Text style={styles.learningProgressText}>
          {profile.LEARNING_PROGRESS}
        </Text>
        <View style={styles.learningProgressContainer}>
          <View style={{ flexDirection: 'row' }}>{renderTimePeriod()}</View>
          {learningProgressLoading ? (
            <View style={styles.streaksSubText}>
              <ActivityIndicator color={Colors.NEVY_BLUE} size={'small'} />
            </View>
          ) : (
            <TimePeriodGraph
              dataKey={dataKey}
              dataType={selectedTimePeriod}
              categoryData={learningProgress}
              showBarChart
            />
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {leaderBoardData.length === 0 && getLeaderboardLoading ? (
        <View style={styles.spinner}>
          <CustomLoader
            isLoading={leaderBoardData.length === 0 && getLeaderboardLoading}
          />
        </View>
      ) : (
        <ScrollView
          keyboardShouldPersistTaps={'always'}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContentContainer}
        >
          <Header
            title={leaderboard.LEADERBOARD}
            leftIconPress={() => props.navigation.navigate(screens.PROFILE)}
            rightIconPress={() =>
              props.navigation.navigate(screens.NOTIFICATION)
            }
          />
          {leaderBoardData && leaderBoardData.length > 0 ? (
            <View style={styles.innerContainer}>
              {currentUser ? (
                <LeaderboardLevel1 currentUser={currentUser} />
              ) : null}
            </View>
          ) : null}
          {barChart()}
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
    getLeaderboardData: (timePeriod, callBack) =>
      dispatch({ type: REQUEST_GET_LEADER_BOARD_DATA, timePeriod, callBack }),
    getLearningProgress: (timePeriod, callBack) =>
      dispatch({ type: REQUEST_GET_LEARNING_PROGRESS, timePeriod, callBack }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.SKY_BLUE,
  },
  spinner: {
    height: '100%',
  },
  scrollContentContainer: {
    // paddingBottom: responsiveHeight(15),
    flexGrow: 1,
  },
  innerContainer: {
    flex: 0,
    paddingHorizontal: 18,
    marginBottom: responsiveHeight(6),
    marginTop: responsiveHeight(1.5),
  },
  boardTabContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: responsiveHeight(2),
  },
  boardTitle: {
    color: Colors.BLACK,
    fontFamily: Fonts.NUNITO_LIGHT,
    fontSize: responsiveFontSize(1.5),
  },
  otherLevelContainer: {
    width: '100%',
    // paddingVertical: 8,
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
    // marginHorizontal:
    //   Platform.OS === 'ios' ? responsiveWidth(3) : responsiveWidth(2),
    height: responsiveHeight(0.1),
    backgroundColor: Colors.BLUE,
    alignItems: 'center',
  }),
  timePeriodContainer: {
    marginBottom: responsiveHeight(1),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  myCoursesText: {
    fontFamily: Fonts.NUNITO_SEMI_BOLD,
    color: Colors.BLACK,
    fontSize: responsiveFontSize(2.5),
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
  learningProgressText: {
    fontFamily: Fonts.NUNITO_SEMI_BOLD,
    color: Colors.BLACK,
    marginLeft: responsiveWidth(4),
    fontSize: responsiveFontSize(2.5),
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
