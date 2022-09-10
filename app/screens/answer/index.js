import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import * as Colors from "./../../themes/colors";
import * as screens from "../../constants/screens";
import {
  deviceWidth,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "../../utils/scalingUtils";
import { Header } from "../../components/Header";
import LinearGradient from "react-native-linear-gradient";
import { SvgXml } from "react-native-svg";
import * as Icons from "../../constants/svg";
import * as Fonts from "../../themes/fonts";
import { Option } from "../../constants/strings";
import WrongAnswerModal from "../../components/Modal/WrongAnswerModal";
import { Button } from "../../components/Button";
import CorrectAnswerModal from "../../components/Modal/CorrectAnswerModal";
import { connect } from "react-redux";
import { REQUEST_GET_SELECTED_QUESTIONID } from "../../redux/actions/questionActions";
import RenderHtml from "react-native-render-html";
import Sound from "react-native-sound";
import Image from "react-native-fast-image";

function Answer(props) {
  const { navigation, route } = props;
  const headerTitle = route.params.title;
  const optionData = route.params.data;
  const questionType = route.params.questionType;
  const correctAnswer = route?.params?.answer;
  const [visible, setVisible] = React.useState(false);

  const promptAudios =
    (optionData &&
      optionData.prompt &&
      optionData.prompt.map((aud) =>
        aud.type === "audio" ? new Sound(aud.value) : null
      )) ||
    [];

  // useEffect(() => {
  //   props.setIsBackEffect(true);
  // }, []);

  useEffect(() => {
    return () => {
      promptAudios && promptAudios.map((aud, index) => aud && aud.release());
    };
  }, [promptAudios]);

  const onPlayPromptAudio = (audioIndex) => {
    if (promptAudios[audioIndex]._playing) {
      promptAudios[audioIndex].pause();
    } else {
      promptAudios[audioIndex].play();
    }
    promptAudios.map(
      (aud, index) => index !== audioIndex && aud && aud.pause()
    );
  };

  const textValue = (item, index) => {
    return (
      <View key={`prompt${index}`}>
        <RenderHtml contentWidth={deviceWidth} source={{ html: item.value }} />
      </View>
    );
  };

  const imageValue = (item, index) => {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: responsiveHeight(2),
        }}
        key={`prompt${index}`}
      >
        <Image
          source={{
            uri: item.value,
          }}
          resizeMode={"contain"}
          style={styles.promptImage}
        />
      </View>
    );
  };

  const onNextQuestion = async () => {
    const questionsIds = props.questionList?.questionIds || [];
    const questionIndex =
      props.questionId &&
      questionsIds.findIndex((id) => id === props.questionId);
    await props.getSelectedQestionId(
      questionsIds[questionIndex ? questionIndex : 1]
    );
    await navigation.navigate(screens.QUESTION_SCREEN, {
      selected: true,
    });
  };

  const nextQuestionDisabled = () => {
    const questionsIds = props.questionList?.questionIds || [];
    if (questionsIds.length === 1) return true;
    else if (props.questionId) {
      const questionIndex = questionsIds.findIndex(
        (id = id === props.questionId)
      );
      if (questionsIds.length === questionIndex) return true;
      else return false;
    }
    return false;
  };

  const modalView = () => {
    if (
      questionType === "Ranking" ||
      questionType === "Mix and Match" ||
      questionType === "Ranking (Audio)"
    ) {
      return optionData.submittedAnswer.toString() ===
        correctAnswer.toString() ? (
        <CorrectAnswerModal
          display={visible}
          onPress={() => {
            props.setIsBackEffect(false);
            setVisible(false);
          }}
        />
      ) : (
        <WrongAnswerModal
          display={visible}
          onPress={() => {
            props.setIsBackEffect(false);
            setVisible(false);
          }}
        />
      );
    } else {
      return optionData?.correctAnswer ? (
        <CorrectAnswerModal
          display={visible}
          onPress={() => {
            props.setIsBackEffect(false);
            setVisible(false);
          }}
        />
      ) : (
        <WrongAnswerModal
          display={visible}
          onPress={() => {
            props.setIsBackEffect(false);
            setVisible(false);
          }}
        />
      );
    }
  };

  const audioValue = (item, index) => {
    return (
      <View
        key={`prompt${index}`}
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: responsiveHeight(2),
        }}
      >
        <TouchableOpacity onPress={() => onPlayPromptAudio(index)}>
          <LinearGradient
            start={{ x: 0, y: 2 }}
            end={{ x: 0, y: 0 }}
            style={styles.playIconView}
            colors={["#7444fb", "#245dfa", "#bd2efc"]}
          >
            <SvgXml
              xml={Icons.PLAY}
              height={responsiveWidth(4)}
              width={responsiveWidth(4)}
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  };
console.log("visible", visible)
  return (
    <View style={styles.container}>
      {visible && (
        <View
          style={{
            position: "absolute",
            bottom: responsiveHeight(6.5) + 10,
            left: 0,
            right: 0,
            top: 0,
            backgroundColor: Colors.BLACK,
            zIndex: 1,
            opacity: 0.6,
          }}
        />
      )}
      <ScrollView
        keyboardShouldPersistTaps={"always"}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContentContainer}
      >
        <Header
          title={headerTitle}
          leftIconPress={() => navigation.goBack()}
          rightIconPress={() => navigation.navigate(screens.NOTIFICATION)}
        />
        {modalView()}
        {/* <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={[styles.innerContainer, { elevation: 0 }]}
          colors={["#bd2efc", "#245dfa", "#245dfa"]}
        >
          <View style={styles.iconView}>
            {optionData.correctAnswer ? (
              <SvgXml
                height={responsiveHeight(32)}
                width={responsiveWidth(75)}
                xml={Icons.CORRECT_ANS}
              />
            ) : (
              <SvgXml
                height={responsiveHeight(25)}
                width={responsiveWidth(60)}
                xml={Icons.WRONG_ANS}
              />
            )}
          </View>
          <View style={styles.textContainer}>
            {(questionType === "MCQ" ||
              (questionType === "MCQ (Image)" && optionData.imageName) ||
              (questionType === "MCQ (Audio)" && optionData.audioName)) && (
              <Text style={styles.questionText}>
                {questionType === "MCQ"
                  ? optionData.option
                  : questionType === "MCQ (Image)"
                  ? optionData.imageName
                  : questionType === "MCQ (Audio)"
                  ? optionData.audioName
                  : null}
              </Text>
            )}
            <View>
              {optionData?.prompt?.length ? (
                optionData?.prompt?.map((item, index) => {
                  if (item.type === "text") return textValue(item, index);
                  else if (item.type === "image")
                    return imageValue(item, index);
                  else if (item.type === "audio")
                    return audioValue(item, index);
                })
              ) : (
                <Text style={styles.dataText}>
                  {questionType === "Ranking" ||
                  questionType === "Mix and Match" ||
                  questionType === "Ranking (Audio)"
                    ? optionData.submittedAnswer.toString() ===
                      correctAnswer.toString()
                      ? "Yay, you got it right!"
                      : "Not quite there...maybe try again?"
                    : optionData.correctAnswer
                    ? "Yay, you got it right!"
                    : "Not quite there...maybe try again?"}
                </Text>
              )}
            </View>
          </View>
        </LinearGradient> */}
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <TouchableOpacity
            style={styles.goBackButton}
            onPress={() => {
              navigation.navigate(screens.QUESTION_SCREEN, {
                selected: false,
              });
            }}
          >
            <Text style={styles.buttonText}>{Option.GO_BACK}</Text>
          </TouchableOpacity>
          <Button
            title={Option.NEXT_QUESTION}
            wrapperStyle={styles.nextButton}
            titleStyle={styles.doneButtonText}
            onPress={() => onNextQuestion()}
            disabled={nextQuestionDisabled()}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const mapStateToProps = (state) => {
  const { questionReducer } = state;
  const { questionId, questionList } = questionReducer;
  return { questionId, questionList };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSelectedQestionId: (questionId) =>
      dispatch({ type: REQUEST_GET_SELECTED_QUESTIONID, questionId }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Answer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.SKY_BLUE,
  },
  scrollContentContainer: {
    paddingBottom: responsiveHeight(10),
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
    marginHorizontal: responsiveWidth(4),
    borderRadius: responsiveHeight(2),
    alignItems: "center",
  },
  iconView: {
    height: responsiveHeight(32),
    width: responsiveHeight(32),
    borderRadius: responsiveHeight(16),
    backgroundColor: Colors.SKY_BLUE,
    marginVertical: responsiveHeight(2),
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginHorizontal: responsiveWidth(4),
    marginBottom: responsiveHeight(2),
    borderRadius: responsiveHeight(4),
    width: deviceWidth - responsiveWidth(16),
    backgroundColor: "white",
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1),
  },
  goBackButton: {
    borderWidth: responsiveWidth(0.2),
    width: (deviceWidth - responsiveWidth(12)) / 2,
    height: responsiveHeight(5.5),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: responsiveWidth(7),
    marginHorizontal: responsiveWidth(3),
    marginVertical: responsiveHeight(1),
    borderColor: Colors.PURPLE,
  },
  nextButton: {
    width: (deviceWidth - responsiveWidth(12)) / 2,
    height: responsiveHeight(5.5),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: responsiveWidth(7),
    marginHorizontal: responsiveWidth(3),
    marginVertical: responsiveHeight(1),
  },
  buttonText: {
    color: Colors.LIGHT_GRAY,
    fontFamily: Fonts.NUNITO_MEDIUM,
    fontSize: responsiveFontSize(1.8),
  },
  questionText: {
    marginTop: responsiveHeight(1.5),
    fontFamily: Fonts.NUNITO_BOLD,
    fontSize: responsiveFontSize(2),
    textAlign: "left",
  },
  playIconView: {
    height: responsiveWidth(10),
    width: responsiveWidth(10),
    borderRadius: responsiveWidth(5),
    justifyContent: "center",
    alignItems: "center",
  },
  dataText: {
    color: Colors.LIGHT_GRAY,
    fontFamily: Fonts.NUNITO_REGULAR,
    fontSize: responsiveFontSize(1.8),
    marginTop: responsiveHeight(1),
  },
  doneButtonText: {
    fontSize: responsiveFontSize(1.6),
    includeFontPadding: false,
    color: Colors.WHITE,
    marginHorizontal: responsiveWidth(2),
  },
  promptImage: {
    width: "100%",
    height: responsiveHeight(20),
    justifyContent: "center",
    marginHorizontal: responsiveWidth(3),
  },
});
