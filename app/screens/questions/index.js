import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import * as Colors from './../../themes/colors';
import * as screens from '../../constants/screens';
import {
  deviceWidth,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/scalingUtils';
import { Header } from '../../components/Header';
import { ProgressBar } from '../../components/ProgressBar';
import * as Fonts from '../../themes/fonts';
import { SvgXml } from 'react-native-svg';
import * as Icons from '../../constants/svg';
import LinearGradient from 'react-native-linear-gradient';
import FloatingAction from '../../components/FloatingAction/FloatingAction';
import {
  REQUEST_GET_QUESTION_BY_ID,
  REQUEST_LIST_QUESTIONS,
  REQUEST_SUBMIT_QUESTION,
} from '../../redux/actions/questionActions';
import { connect } from 'react-redux';
import CustomLoader from '../../components/CustomLoader';
import moment from 'moment';
import Sound from 'react-native-sound';
import { Option } from '../../constants/strings';
import { Button } from '../../components/Button';
import { resetRoute } from '../../utils/navigationUtils';
// import DraggableFlatList from 'react-native-draggable-dynamic-flatlist';
import Image from 'react-native-fast-image';
// import Draggable from '../../components/DragAndDrop/Draggable';

const actions = [
  {
    text: 'Home',
    icon: Icons.HOME,
    name: 'Home',
  },
  {
    text: 'Skip Excerpt',
    icon: (
      <View
        style={{
          backgroundColor: Colors.PURPLE,
          width: 16,
          height: 16,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: responsiveHeight(50),
        }}
      >
        <SvgXml style={{ marginLeft: 1 }} xml={Icons.WHITE_PLAY} />
      </View>
    ),
    name: 'Skip Excerpt',
  },
  {
    text: 'Skip Question',
    icon: (
      <View
        style={{
          backgroundColor: Colors.ORANGE,
          width: 16,
          height: 16,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: responsiveHeight(50),
        }}
      >
        <SvgXml xml={Icons.WHITE_BACK_ARROW} />
      </View>
    ),
    name: 'Skip Question',
  },
  {
    text: 'Discussion',
    icon: (
      <View
        style={{
          backgroundColor: Colors.GREEN,
          width: 16,
          height: 16,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: responsiveHeight(50),
        }}
      >
        <SvgXml xml={Icons.FEEDBACK_ICON} />
      </View>
    ),
    name: 'Feedback',
  },
];

function QuestionScreen(props) {
  const { navigation, route } = props;
  const [loading, setLoading] = React.useState(true);
  const [questions, setQuestions] = React.useState({});
  const [questionToDisplay, setQuestionToDisplay] = React.useState({});
  const [enableScrollViewScroll, setEnableScrollViewScroll] =
    React.useState(true);
  const [submitRanking, setSubmitRanking] = React.useState([]);
  const selected = route.params ? route.params.selected : false;

  const [optionAudios, setOptionAudios] = React.useState([]);
  const [audio, setAudio] = React.useState(null);
  const [selectedOption, setselectedOption] = React.useState('')

  React.useEffect(() => {
    if (questionToDisplay.type === 'Ranking (Audio)')
      setOptionAudios(
        submitRanking.map((aud) => (aud.option ? new Sound(aud.option) : null))
      );
  }, [submitRanking]);

  React.useEffect(() => {
    if (questionToDisplay && questionToDisplay?.audio)
      setAudio(new Sound(questionToDisplay.audio));
    if (
      (submitRanking && questionToDisplay.type === 'MCQ (Audio)') ||
      questionToDisplay.type === 'Mix and Match'
    )
      setOptionAudios(
        questionToDisplay.options.map((aud) =>
          aud.option ? new Sound(aud.option) : null
        )
      );
  }, [questionToDisplay]);

  // const optionAudios =
  //   (questionToDisplay.options &&
  //     (questionToDisplay.type === 'MCQ (Audio)' ||
  //       questionToDisplay.type === 'Mix and Match' ||
  //       questionToDisplay.type === 'Ranking (Audio)') &&
  //     questionToDisplay.options.map((aud) =>
  //       aud.option ? new Sound(aud.option) : null
  //     )) ||
  //   [];

  // React.useEffect(() => {
  //   return () => {
  //     audio && audio.release();
  //   };
  // }, [audio]);

  const pauseAllAudio = () => {
    audio && audio.pause();
    optionAudios && optionAudios.map((aud, index) => aud && aud.pause());
  };

  const submitQuestion = (item) => {
    let submitData = [];
    if (
      questionToDisplay.type === 'Ranking' ||
      questionToDisplay.type === 'Ranking (Audio)'
    ) {
      questionToDisplay.options.map((e) => submitData.push(e.option));
    } else {
      questionToDisplay.options.map((e) => submitData.push(e.matchOption));
    }
    if (
      questionToDisplay.type === 'Ranking' ||
      questionToDisplay.type === 'Mix and Match' ||
      questionToDisplay.type === 'Ranking (Audio)'
    ) {
      const data = {
        topicId: props.selectedTopicId,
        questionId: questionToDisplay._id,
        submittedAnswer: item === undefined ? submitData : item,
        submitDate: moment(),
      };
      props.submitQuestion(data, (resp) => {
        console.log('resp5555', resp);
      });
      navigation.navigate(screens.ANSWER, {
        answer: questionToDisplay.answer,
        data: data,
        title: questionToDisplay.title,
        questionType: questionToDisplay.type,
      });
    } else {
      console.log('item', item)
      const data = {
        topicId: props.selectedTopicId,
        questionId: questionToDisplay._id,
        submittedAnswer: [item.option],
        submitDate: moment(),
      };
      props.submitQuestion(data, (resp) => {
        console.log('resp2233', resp);
      });
      navigation.navigate(screens.ANSWER, {
        data: item,
        title: questionToDisplay.title,
        questionType: questionToDisplay.type,
      });
    }
  };

  const componentsName = () => {
    if (
      questionToDisplay.type === 'MCQ' ||
      questionToDisplay.type === 'Ranking'
    ) {
      return (
        <>
          <Text style={[styles.composerNameText, { textAlign: 'center' }]}>
            {questionToDisplay.composerName}
          </Text>
        </>
      );
    }
  };

  const progressBar = () => {
    if (
      questionToDisplay.type === 'MCQ' ||
      questionToDisplay.type === 'Ranking'
    ) {
      return (
        <>
          <ProgressBar width={questionProgress} height={responsiveHeight(1)} />
        </>
      );
    }
  };

  const audioPlay = () => {
    if (
      questionToDisplay.type === 'MCQ' ||
      questionToDisplay.type === 'Ranking' ||
      questionToDisplay.type === 'MCQ (Image)' ||
      questionToDisplay.type === 'Ranking (Audio)' ||
      questionToDisplay.type === 'Tapping Rhythm' ||
      questionToDisplay.type === 'MCQ (Audio)'
    ) {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {questionToDisplay.audio && (
            <>
              <View
                style={{
                  flex: 3,
                  alignItems: 'flex-end',
                }}
              >
                <TouchableOpacity
                  style={styles.stopIconView}
                  onPress={() => onPauseQuestionAudio()}
                >
                  <SvgXml style={styles.iconHeightWidth} xml={Icons.STOP} />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 2.5, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => onPlayQuestionAudio()}>
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.playIconView}
                    colors={['#245dfa', '#7444fb', '#bd2efc']}
                  >
                    <SvgXml style={styles.iconHeightWidth} xml={Icons.PLAY} />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </>
          )}
          <View
            style={{
              flex: 3,
              alignItems: questionToDisplay.audio ? 'flex-start' : 'center',
            }}
          >
            <TouchableOpacity
              style={styles.stopIconView}
              onPress={() => {
                navigation.navigate(screens.QUESTION_INFORMATION);
                pauseAllAudio();
              }}
            >
              <SvgXml style={styles.iconHeightWidth} xml={Icons.INFO} />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  const titleAndImage = () => {
    if (
      questionToDisplay.type === 'MCQ' ||
      questionToDisplay.type === 'Ranking' ||
      questionToDisplay.type === 'MCQ (Audio)' ||
      questionToDisplay.type === 'Mix and Match' ||
      questionToDisplay.type === 'MCQ (Image)' ||
      questionToDisplay.type === 'Ranking (Audio)' ||
      questionToDisplay.type === 'Tapping Rhythm'
    ) {
      return (
        <>
          <Text style={styles.questionText}>
            {questionToDisplay.questionTitle}
          </Text>
          {questionToDisplay.image ? (
            <Image
              source={{
                uri: questionToDisplay.image,
              }}
              resizeMode={'contain'}
              style={styles.imageStyle}
            />
          ) : null}
        </>
      );
    }
  };

  const onPlayOptionAudio = (audioIndex) => {
    if (optionAudios[audioIndex]._playing) {
      optionAudios[audioIndex].pause();
    } else {
      optionAudios[audioIndex].play();
    }
    audio && audio.pause();
    optionAudios.map(
      (aud, index) => index !== audioIndex && aud && aud.pause()
    );
  };

  // React.useEffect(() => {
  //   return () => {
  //     optionAudios && optionAudios.map((aud, index) => aud && aud.release());
  //   };
  // }, [optionAudios]);

  const option = () => {
    if (
      questionToDisplay.type === 'MCQ' ||
      questionToDisplay.type === 'MCQ (Audio)'
    ) {
      return (
        <View style={styles.optionInnerContainer}>
          {questionToDisplay &&
            questionToDisplay.options &&
            questionToDisplay.options.map((item, index) => {
              return (
                <View
                  style={{
                    marginBottom:
                      questionToDisplay.type === 'MCQ (Audio)'
                        ? responsiveHeight(2)
                        : 0,
                  }}
                  key={index}
                >
                  {questionToDisplay.type === 'MCQ (Audio)' && (
                    <View style={{ marginLeft: responsiveWidth(3) }}>
                      <Text style={styles.fillInTheBlankText}>
                        {`${index + 1}. ${item.audioName}`}
                      </Text>
                    </View>
                  )}
                  <TouchableOpacity
                    style={styles.optionView(
                      questionToDisplay.type === 'MCQ (Audio)'
                    )}
                    // onPress={() => submitQuestion(item)}
                    onPress={async () => await setselectedOption(item)}
                  >
                    {questionToDisplay.type === 'MCQ' && (
                      <Text style={styles.optionText}>{item.option}</Text>
                    )}
                    {questionToDisplay.type === 'MCQ (Audio)' && (
                      <TouchableOpacity
                        style={styles.playOptionIconView}
                        onPress={() => onPlayOptionAudio(index)}
                      >
                        <LinearGradient
                          start={{ x: 0, y: 0 }}
                          end={{ x: 0, y: 1 }}
                          style={[styles.playOptionIconView, { marginLeft: 0 }]}
                          colors={["#543DFA", "#F47676", "#FFD857"]}
                        >
                          <SvgXml
                            xml={Icons.PLAY}
                            height={responsiveHeight(4)}
                            width={responsiveWidth(3)}
                          />
                        </LinearGradient>
                      </TouchableOpacity>
                    )}
                  </TouchableOpacity>
                </View>
              );
            })}
          {saveAndCancelButton()}
        </View>
      );
    }
  };

  const saveAndCancelButton = () => {
    let answerArray = [];
    submitRanking.forEach((item) => {
      if (questionToDisplay.type === 'Mix and Match') {
        answerArray.push(item.matchOption);
      } else if (
        questionToDisplay.type === 'Ranking' ||
        questionToDisplay.type === 'Ranking (Audio)'
      ) {
        answerArray.push(item.option);
      }
    });
    return (
      <View style={{ flexDirection: 'row' }}>
        {/* <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => navigation.navigate(screens.APPNAME)}
        >
          <Text style={styles.optionText}>{Option.CANCEL}</Text>
        </TouchableOpacity> */}
        <Button
          onPress={() => {
            navigation.navigate(screens.APPNAME)
          }}
          title={Option.CANCEL}
          wrapperStyle={styles.buttonStyle}
          titleStyle={[styles.optionText, { color: Colors.BLACK }]}
        />
        <Button
          onPress={() => {
            submitQuestion(answerArray);
          }}
          title={Option.SUBMIT}
          wrapperStyle={styles.buttonStyle}
          titleStyle={[styles.optionText, { color: Colors.BLACK }]}
        />
      </View>
    );
  };

  const rankingOption = ({ item, index, move, moveEnd }) => {
    if (questionToDisplay.type === 'Mix and Match') {
      return (
        <TouchableOpacity
          key={index}
          onLongPress={move}
          onPressOut={moveEnd}
          style={[
            styles.buttonStyle,
            {
              width: responsiveWidth(30),
              marginVertical: responsiveHeight(1.5),
            },
          ]}
        >
          <Text style={styles.optionText}>{item.matchOption}</Text>
        </TouchableOpacity>
      );
    } else if (questionToDisplay.type === 'Ranking') {
      return (
        <TouchableOpacity
          key={index}
          style={styles.rankingButtonView}
          onLongPress={move}
          onPressOut={moveEnd}
        >
          <Text style={styles.rankingButtonText}>{item.option}</Text>
        </TouchableOpacity>
      );
    } else if (questionToDisplay.type === 'Ranking (Audio)') {
      return (
        <TouchableOpacity
          style={styles.rankingAudioOption}
          key={index}
          onLongPress={move}
          onPressOut={moveEnd}
        >
          <Text
            style={
              ([styles.fillInTheBlankText],
              { marginBottom: responsiveHeight(1) })
            }
          >
            {item.audioName}
          </Text>
          <TouchableOpacity
            style={styles.playOptionIconView}
            onPress={() => onPlayOptionAudio(index)}
          >
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={[
                styles.playOptionIconView,
                { marginVertical: responsiveHeight(1) },
              ]}
              colors={['#bd2efc', '#7444fb', '#245dfa']}
            >
              <SvgXml
                xml={Icons.PLAY}
                height={responsiveHeight(4)}
                width={responsiveWidth(3)}
              />
            </LinearGradient>
          </TouchableOpacity>
        </TouchableOpacity>
      );
    }
  };
  const rankTheOption = () => {
    if (questionToDisplay.type === 'Ranking') {
      return (
        <>
          <Text style={[styles.composerNameText, { marginHorizontal: 13 }]}>
            {Option.RANK_THE_OPTION}
          </Text>
          <View
            style={{
              flex: 1,
            }}
            onStartShouldSetResponderCapture={() => {
              setEnableScrollViewScroll(false);
              if (enableScrollViewScroll === false) {
                setEnableScrollViewScroll(true);
              }
            }}
          >
            {/* <DraggableFlatList
              data={submitRanking}
              renderItem={rankingOption}
              keyExtractor={(item, index) => index}
              onMoveEnd={(nextOrder) => {
                setSubmitRanking(nextOrder.data);
              }}
            /> */}
            {saveAndCancelButton()}
          </View>
        </>
      );
    }
  };

  const fillInTheBlanks = () => {
    if (questionToDisplay.type === 'Fill in the blanks') {
      return (
        <View
          style={styles.optionInnerContainer}
          onStartShouldSetResponderCapture={() => {
            setEnableScrollViewScroll(false);
            if (enableScrollViewScroll === false) {
              setEnableScrollViewScroll(true);
            }
          }}
        >
          <View style={{ marginHorizontal: responsiveWidth(2) }}>
            <Text style={styles.composerNameText}>
              {Option.FILL_IN_THE_BLANK}
            </Text>
            <Text
              style={[
                styles.fillInTheBlankText,
                {
                  lineHeight: responsiveHeight(5),
                  marginHorizontal: responsiveWidth(2),
                },
              ]}
            >
              {questionToDisplay.questionTitle}
            </Text>
          </View>
          {questionToDisplay.options.map((item, index) => {
            return (
              <View key={index}>
                <View
                  style={[
                    styles.fillInTheBlankOption,
                    {
                      backgroundColor: item.isSelected
                        ? Colors.THICK_BLUE
                        : 'transport',
                      borderWidth: 0,
                    },
                  ]}
                >
                  {item.isSelected && (
                    <Text style={styles.fillInTheBlankOptionText}>
                      {item.option}
                    </Text>
                  )}
                </View>
                <View
                  style={[
                    styles.fillInTheBlankOption,
                    { borderWidth: 0, position: 'absolute' },
                  ]}
                >
                  {/* <Draggable
                    data={item}
                    onPressIn={() => {
                      const newData = {
                        ...questionToDisplay,
                        options: questionToDisplay.options.map((opt, ind) => {
                          if (opt._id === item._id) {
                            return {
                              ...opt,
                              isSelected: true,
                            };
                          } else {
                            return {
                              ...opt,
                            };
                          }
                        }),
                      };
                      setQuestionToDisplay(newData);
                    }}
                  /> */}
                </View>
              </View>
            );
          })}
        </View>
      );
    }
  };

  const mixAndMatch = () => {
    if (questionToDisplay.type === 'Mix and Match') {
      return (
        <View
          style={{
            marginHorizontal: responsiveWidth(20),
          }}
          onStartShouldSetResponderCapture={() => {
            setEnableScrollViewScroll(false);
            if (enableScrollViewScroll === false) {
              setEnableScrollViewScroll(true);
            }
          }}
        >
          <Text
            style={[
              styles.composerNameText,
              { marginLeft: responsiveWidth(2) },
            ]}
          >
            {Option.MIX_AND_MATCH}
          </Text>
          <View
            style={{
              marginLeft: responsiveWidth(2),
              flexDirection: 'row',
            }}
          >
            <View
              style={{
                flexDirection: 'column',
                flex: 8,
              }}
            >
              {questionToDisplay?.options?.map((item, index) => {
                return (
                  <View key={index}>
                    <Text style={styles.fillInTheBlankText}>
                      {item.audioName}
                    </Text>
                    <TouchableOpacity onPress={() => onPlayOptionAudio(index)}>
                      <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={[
                          styles.playOptionIconView,
                          { marginVertical: responsiveHeight(1) },
                        ]}
                        colors={['#bd2efc', '#7444fb', '#245dfa']}
                      >
                        <SvgXml
                          xml={Icons.PLAY}
                          height={responsiveHeight(4)}
                          width={responsiveWidth(3)}
                        />
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
            <View style={{ flex: 5 }}>
              {/* <DraggableFlatList
                data={submitRanking}
                renderItem={rankingOption}
                keyExtractor={(item, index) => index}
                onMoveEnd={(nextOrder) => {
                  setSubmitRanking(nextOrder.data);
                }}
              /> */}
            </View>
          </View>
          {saveAndCancelButton()}
        </View>
      );
    }
  };

  const MCQImage = () => {
    if (questionToDisplay.type === 'MCQ (Image)') {
      return (
        <View style={[styles.optionInnerContainer]}>
          {questionToDisplay.options.map((item, index) => {
            return (
              <View key={`optionImage${index}`}>
                {item.option ? (
                  <TouchableOpacity onPress={() => submitQuestion(item)}>
                    <Image
                      source={{
                        uri: item.option,
                      }}
                      resizeMode={'contain'}
                      style={styles.MCQImage}
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
            );
          })}
        </View>
      );
    }
  };

  const rankingAudio = () => {
    if (questionToDisplay.type === 'Ranking (Audio)') {
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}
          onStartShouldSetResponderCapture={() => {
            setEnableScrollViewScroll(false);
            if (enableScrollViewScroll === false) {
              setEnableScrollViewScroll(true);
            }
          }}
        >
          <Text style={[styles.composerNameText, { marginHorizontal: 13 }]}>
            {Option.RANK_THE_OPTION}
          </Text>
          {/* <DraggableFlatList
            data={submitRanking}
            renderItem={rankingOption}
            keyExtractor={(item, index) => index}
            onMoveEnd={(nextOrder) => {
              setSubmitRanking(nextOrder.data);
            }}
          /> */}
          <View style={{ flex: 1 }}>{saveAndCancelButton()}</View>
        </View>
      );
    }
  };

  const tapping = () => {
    if (questionToDisplay.type === 'Tapping Rhythm') {
      return (
        <View style={styles.tapContainer}>
          <TouchableOpacity style={styles.thirdTapCircle}>
            <View style={styles.secondTapCircle}>
              <View style={styles.firstTapCircle}>
                <Text style={styles.tapText}>Tap</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  };

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', async (e) => {
      if (selected) {
        setLoading(true);
        props.listQuestion(props.selectedTopicId, (res) => {
          if (res.status === 200) {
            const questionsData = res?.data;
            setQuestions(res?.data);
            props.getQuestionById(questionsData.questionIds[0], (res) => {
              if (res.status === 200) {
                setQuestionToDisplay(res?.data);
                const result = res?.data?.options
                  ?.map((value) => ({ value, sort: Math.random() }))
                  ?.sort((a, b) => a.sort - b.sort)
                  ?.map(({ value }) => value);
                setSubmitRanking(result);
                setLoading(false);
              } else {
                setQuestionToDisplay({});
                setLoading(false);
              }
            });
          } else {
            setLoading(false);
          }
        });
      }
    });
    return unsubscribe;
  }, [selected, props.selectedTopicId]);

  const questionProgress =
    (questions.submittedQuestion * 100) / questions.submittedQuestion;

  const onPlayQuestionAudio = () => {
    audio.play();
    optionAudios && optionAudios.map((aud, index) => aud && aud.pause());
  };

  const onPauseQuestionAudio = () => {
    audio.pause();
  };

  return (
    <View
      style={styles.container}
      onStartShouldSetResponderCapture={() => {
        setEnableScrollViewScroll(true);
      }}
    >
      {loading ? (
        <View style={styles.spinner}>
          <CustomLoader isLoading={loading} />
        </View>
      ) : (
        <>
          {/* <FloatingAction
            actions={actions}
            onPressItem={(name) => {
              pauseAllAudio();
              console.log(`selected button: ${name}`);
              if (name === 'Home') resetRoute(navigation, screens.APPNAME);
              else if (name === 'Feedback')
                navigation.navigate(screens.DISCUSS, {
                  questionId: questionToDisplay._id,
                });
            }}
            setIsBackEffect={props.setIsBackEffect}
          /> */}
          {/* {questionToDisplay.hint && (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(screens.HINT_SCREEN, {
                  questionId: questionToDisplay._id,
                });
                pauseAllAudio();
              }}
              style={styles.hintIconView}
            >
              <SvgXml style={styles.hintIconStyle} xml={Icons.HINT} />
              <View style={styles.hintTextView}>
                <Text style={styles.hintText}>Hint</Text>
              </View>
            </TouchableOpacity>
          )} */}
          <ScrollView
            keyboardShouldPersistTaps={'always'}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContentContainer}
            nestedScrollEnabled={true}
            scrollEnabled={enableScrollViewScroll}
          >
            <Header
              title={questionToDisplay.title}
              leftIconPress={() => resetRoute(navigation, screens.PROFILE)}
              rightIconPress={() =>
                resetRoute(navigation, screens.NOTIFICATION)
              }
            />
            {/* <View>{componentsName()}</View> */}
            <View style={{ marginHorizontal: responsiveHeight(3) }}>
              {progressBar()}
              {titleAndImage()}
            </View>
            {/* <View style={{ alignItems: 'center' }}>{audioPlay()}</View> */}
            <View style={{ alignItems: 'center' }}>{option()}</View>
            {/* <View style={{ alignItems: 'center' }}>{rankTheOption()}</View>
            <View style={{ alignItems: 'center' }}>{fillInTheBlanks()}</View>
            <View style={{ alignItems: 'center' }}>{mixAndMatch()}</View> */}
            <View style={{ alignItems: 'center' }}>{MCQImage()}</View>
            {/* <View style={{ alignItems: 'center' }}>{rankingAudio()}</View>
            <View style={{ alignItems: 'center' }}>{tapping()}</View> */}
          </ScrollView>
        </>
      )}
    </View>
  );
}

const mapStateToProps = (state) => {
  const { questionReducer } = state;
  const { questionList, selectedTopicId, questionId } = questionReducer;
  return { questionList, selectedTopicId, questionId };
};

const mapDispatchToProps = (dispatch) => {
  return {
    listQuestion: (topicId, callBack) =>
      dispatch({ type: REQUEST_LIST_QUESTIONS, topicId, callBack }),
    getQuestionById: (questionId, callBack) =>
      dispatch({ type: REQUEST_GET_QUESTION_BY_ID, questionId, callBack }),
    submitQuestion: (data, callBack) =>
      dispatch({ type: REQUEST_SUBMIT_QUESTION, data, callBack }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.SKY_BLUE,
  },
  spinner: {
    height: '100%',
  },
  scrollContentContainer: {
    paddingBottom: responsiveHeight(15),
    flexGrow: 1,
  },
  composerNameText: {
    color: Colors.LIGHT_GRAY,
    fontFamily: Fonts.NUNITO_REGULAR,
    fontSize: responsiveFontSize(1.8),
    marginVertical: responsiveHeight(2),
  },
  questionText: {
    textAlign: 'center',
    marginTop: responsiveHeight(1.5),
    fontFamily: Fonts.NUNITO_BOLD,
    fontSize: responsiveFontSize(2),
    color: Colors.LIGHT_BLACK
  },
  imageStyle: {
    height: responsiveHeight(20),
    width: '80%',
    marginHorizontal: responsiveWidth(10),
    marginVertical: responsiveHeight(2),
    alignItems: 'center',
  },
  stopIconView: {
    height: responsiveWidth(8),
    width: responsiveWidth(8),
    borderRadius: responsiveWidth(4),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.ROCK_BLUE,
  },
  playIconView: {
    height: responsiveWidth(12),
    width: responsiveWidth(12),
    borderRadius: responsiveWidth(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconHeightWidth: {
    height: '100%',
    width: '100%',
  },
  shadowIcon: {
    height: '100%',
    width: '100%',
    shadowRadius: 5,
    shadowColor: Colors.BLACK,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  selectedOptionView: {
    shadowRadius: 5,
    shadowColor: Colors.BLACK,
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 10 },
    elevation: 5,
    width: (deviceWidth - responsiveWidth(13)) / 2,
    height: responsiveHeight(5.5),
    justifyContent: 'center',
    borderRadius: responsiveWidth(7),
    marginHorizontal: responsiveWidth(3),
    marginVertical: responsiveHeight(1),
  },
  optionView: (isMcqAudio) => ({
    borderWidth: responsiveWidth(0.2),
    width: (deviceWidth - responsiveWidth(13)) / 2,
    height: !isMcqAudio ? responsiveHeight(5.5) : 'auto',
    justifyContent: 'center',
    borderRadius: responsiveWidth(7),
    marginHorizontal: responsiveWidth(3),
    marginVertical: responsiveHeight(1),
    borderColor: Colors.NEVY_BLUE,
    padding: isMcqAudio ? responsiveWidth(2.5) : 0,
  }),
  buttonStyle: {
    borderWidth: responsiveWidth(0.2),
    width: (deviceWidth - responsiveWidth(13)) / 2,
    height: responsiveHeight(5.5),
    justifyContent: 'center',
    borderRadius: responsiveWidth(7),
    marginHorizontal: responsiveWidth(3),
    marginVertical: responsiveHeight(5),
    borderColor: '#F47676',
  },
  optionText: {
    color: Colors.BLACK,
    textAlign: 'center',
    fontFamily: Fonts.NUNITO_MEDIUM,
    fontSize: responsiveFontSize(1.8),
  },
  hintIconView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: Platform.OS ? responsiveHeight(9) : responsiveHeight(7.5),
    alignSelf: 'center',
    left: 10,
    zIndex: 1,
  },
  hintIconStyle: {
    zIndex: 1,
    maxWidth: responsiveWidth(14),
    maxHeight: responsiveWidth(14),
  },
  optionInnerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: responsiveHeight(1.5),
  },
  hintTextView: {
    zIndex: 0,
    backgroundColor: Colors.YELLOW,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    borderTopRightRadius: responsiveWidth(3),
    marginLeft: -17,
    marginTop: -5.5,
  },
  hintText: {
    fontFamily: Fonts.NUNITO_REGULAR,
    fontSize: responsiveFontSize(1.6),
  },
  playOptionIconView: {
    height: responsiveWidth(8),
    width: responsiveWidth(8),
    borderRadius: responsiveWidth(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  fillInTheBlankText: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: Fonts.NUNITO_MEDIUM,
    color: Colors.BLACK,
  },
  fillInTheBlankOptionText: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: Fonts.NUNITO_SEMI_BOLD,
    color: Colors.WHITE,
  },
  fillInTheBlankOption: {
    borderColor: Colors.PURPLE,
    borderWidth: 0.5,
    width: (deviceWidth - responsiveWidth(13)) / 2,
    height: responsiveHeight(5.5),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveWidth(7),
    marginHorizontal: responsiveWidth(2),
    marginVertical: responsiveHeight(1),
  },
  rankingOption: {
    borderWidth: responsiveWidth(0.2),
    width: deviceWidth - responsiveWidth(13),
    height: responsiveHeight(5.5),
    justifyContent: 'center',
    borderRadius: responsiveWidth(7),
    marginHorizontal: responsiveWidth(3),
    marginVertical: responsiveHeight(1),
    borderColor: Colors.PURPLE,
  },
  MCQImage: {
    borderWidth: responsiveWidth(0.5),
    width: (deviceWidth - responsiveWidth(13)) / 2,
    height: responsiveHeight(15),
    justifyContent: 'center',
    marginHorizontal: responsiveWidth(3),
    marginVertical: responsiveHeight(1),
    borderColor: Colors.PURPLE,
  },
  rankingAudioOption: {
    borderWidth: responsiveWidth(0.2),
    width: deviceWidth - responsiveWidth(8),
    height: responsiveHeight(12),
    justifyContent: 'center',
    borderRadius: responsiveWidth(12),
    marginHorizontal: responsiveWidth(3),
    marginVertical: responsiveHeight(1),
    borderColor: Colors.PURPLE,
    paddingLeft: responsiveWidth(5),
  },
  tapContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: responsiveHeight(25),
  },
  firstTapCircle: {
    backgroundColor: Colors.FIRST_TAP_CIRCLE,
    height: responsiveHeight(10),
    width: responsiveHeight(10),
    borderRadius: responsiveHeight(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondTapCircle: {
    backgroundColor: Colors.SECOND_TAP_CIRCLE,
    height: responsiveHeight(12),
    width: responsiveHeight(12),
    borderRadius: responsiveHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  thirdTapCircle: {
    backgroundColor: Colors.THIRD_TAP_CIRCLE,
    height: responsiveHeight(14),
    width: responsiveHeight(14),
    borderRadius: responsiveHeight(7),
    justifyContent: 'center',
    alignItems: 'center',
  },
  tapText: {
    fontFamily: Fonts.NUNITO_MEDIUM,
    fontSize: responsiveFontSize(1.8),
    color: Colors.WHITE,
  },
  rankingButtonView: {
    borderWidth: responsiveWidth(0.2),
    width: deviceWidth - responsiveWidth(13),
    height: responsiveHeight(5.5),
    justifyContent: 'center',
    borderRadius: responsiveWidth(7),
    marginHorizontal: responsiveWidth(5),
    marginVertical: responsiveHeight(1),
    borderColor: Colors.PURPLE,
  },
  rankingButtonText: {
    color: Colors.BLACK,
    textAlign: 'center',
    fontFamily: Fonts.NUNITO_MEDIUM,
    fontSize: responsiveFontSize(1.8),
  },
});
