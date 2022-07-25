import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import * as Colors from './../../themes/colors';
import * as screens from '../../constants/screens';
import {
  responsiveHeight,
  responsiveWidth,
  deviceWidth,
} from '../../utils/scalingUtils';
import { Header } from '../../components/Header';
import { hint } from '../../constants/strings';
import LinearGradient from 'react-native-linear-gradient';
import { SvgXml } from 'react-native-svg';
import * as Icons from '../../constants/svg';
import { REQUEST_GET_HINT_BY_QUESTION } from '../../redux/actions/questionActions';
import { connect } from 'react-redux';
import CustomLoader from '../../components/CustomLoader';
import RenderHtml from 'react-native-render-html';
import Sound from 'react-native-sound';
import Image from "react-native-fast-image";

function HintScreen(props) {
  const { navigation, route } = props;
  const questionId = route.params.questionId;
  const [loading, setLoading] = useState(false);
  const [hintData, setHintData] = useState({});

  const hintAudios =
    (hintData &&
      hintData.hintInfo &&
      hintData.hintInfo.map((aud) =>
        aud.type === 'audio' ? new Sound(aud.value) : null
      )) ||
    [];
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', async (e) => {
      setLoading(true);
      props.getHintByQuestion(questionId, (res) => {
        if (res.status === 200) {
          setLoading(false);
          setHintData(res?.data);
        } else {
          setHintData({});
          setLoading(false);
        }
      });
    });
    return unsubscribe;
  }, [questionId]);

  const textValue = (item, index) => {
    return (
      <View key={`hint${index}`}>
        <RenderHtml contentWidth={deviceWidth} source={{ html: item.value }} />
      </View>
    );
  };

  const imageValue = (item, index) => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: responsiveHeight(2),
        }}
        key={`hint${index}`}
      >
        <Image
          source={{
            uri: item.value,
          }}
          style={[styles.hintImage]}
          resizeMode={'contain'}
        />
      </View>
    );
  };

  const onPlayHintAudio = (audioIndex) => {
    if (hintAudios[audioIndex]._playing) {
      hintAudios[audioIndex].pause();
    } else {
      hintAudios[audioIndex].play();
    }
    hintAudios.map((aud, index) => index !== audioIndex && aud && aud.pause());
  };

  React.useEffect(() => {
    return () => {
      hintAudios && hintAudios.map((aud, index) => aud && aud.release());
    };
  }, [hintAudios]);

  const audioValue = (item, index) => {
    return (
      <View
        key={`hint${index}`}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: responsiveHeight(2),
        }}
      >
        <TouchableOpacity onPress={() => onPlayHintAudio(index)}>
          <LinearGradient
            start={{ x: 0, y: 2 }}
            end={{ x: 0, y: 0 }}
            style={styles.playIconView}
            colors={['#7444fb', '#245dfa', '#bd2efc']}
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
  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.spinner}>
          <CustomLoader isLoading={loading} />
        </View>
      ) : (
        <ScrollView
          keyboardShouldPersistTaps={'always'}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContentContainer}
        >
          <Header
            title={hint.HINT}
            leftIconPress={() =>
              navigation.navigate(screens.QUESTION_SCREEN, {
                selected: false,
              })
            }
            rightIconPress={() => navigation.navigate(screens.NOTIFICATION)}
          />

          <View style={styles.innerContainer}>
            {hintData.hintInfo &&
              hintData.hintInfo.map((item, index) => {
                if (item.type === 'text') return textValue(item, index);
                else if (item.type === 'image') return imageValue(item, index);
                else if (item.type === 'audio') return audioValue(item, index);
              })}
          </View>
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
    getHintByQuestion: (questionId, callBack) =>
      dispatch({ type: REQUEST_GET_HINT_BY_QUESTION, questionId, callBack }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HintScreen);

const styles = StyleSheet.create({
  spinner: {
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  scrollContentContainer: {
    paddingBottom: responsiveHeight(15),
    flexGrow: 1,
  },
  innerContainer: {
    marginTop: responsiveHeight(2),
    marginHorizontal: responsiveWidth(3),
  },
  playIconView: {
    height: responsiveWidth(10),
    width: responsiveWidth(10),
    borderRadius: responsiveWidth(5),
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 5,
    shadowColor: Colors.BLACK,
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  hintImage: {
    width: '100%',
    height: responsiveHeight(20),
    justifyContent: 'center',
    marginHorizontal: responsiveWidth(3),
  },
});
