import React from 'react';
import { View, Image, StyleSheet, ScrollView, Text } from 'react-native';
import * as Colors from '../../themes/colors';
import { Header } from '../../components/Header';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/scalingUtils';
import * as Fonts from '../../themes/fonts';
import * as screens from '../../constants/screens';
import LinearGradient from 'react-native-linear-gradient';
import { SvgXml } from 'react-native-svg';
import * as Icons from '../../constants/svg';

const AudioButton = () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: responsiveHeight(2),
      }}
    >
      <LinearGradient
        start={{ x: 0, y: 2 }}
        end={{ x: 0, y: 0 }}
        style={styles.playIconView}
        colors={['#7444fb', '#245dfa', '#bd2efc']}
      >
        <SvgXml
          xml={Icons.PLAY}
          height={responsiveWidth(3)}
          width={responsiveWidth(3)}
        />
      </LinearGradient>
    </View>
  );
};

export default function QuestionInformation(props) {
  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps={'always'}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContentContainer}
      >
        <Header
          title='Tempo Marking'
          leftIconPress={() =>
            props.navigation.navigate(screens.QUESTION_SCREEN, {
              selected: false,
            })
          }
          rightIconPress={() => props.navigation.navigate(screens.NOTIFICATION)}
        />
        <View
          style={{
            flex: 1,
            marginHorizontal: responsiveWidth(4),
          }}
        >
          <Text style={styles.infoText}>
            A temp marking is a word or a phrase you can normally find at the
            beginning of the sheet music of a piece, which
            <Text style={styles.colorText}>
              {' '}
              gives you the composer's idea of how fast the music should feel.
            </Text>
            {'\n\n'}How fast a piece of music feels depends en number of
            factors, not rust veep This can include things like texture.
            complexity, how the beats are chvgled and the list go on..
            {'\n\n'}Your will excounter more tempo markings in other exceropts
            or questions while using this app but the meanings for all the
            opeions in this particular question are:
          </Text>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={['#245dfa', '#7444fb', '#bd2efc']}
            style={styles.bottomInfoContainer}
          >
            <View style={styles.bottomInfoInnerContainer}>
              <AudioButton />
              <Text style={styles.infoText}>
                <Text style={styles.optionTitle}>Moderato: </Text>A medium speed
                (MOD-er-AH-toe). Check out this video for an example piece
                played in Moderato.{'\n\n'}
                <Text style={styles.optionTitle}>Andante: </Text>A medium slow
                tempo (an-DON-tay). Check out this video for an example piece
                played in Andante.{'\n\n'}
                <Text style={styles.optionTitle}>Allegro Vivace: </Text>A fast
                and lively tempo. Checkout this video for an example piece
                played in Allegro
              </Text>
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
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
  infoText: {
    color: Colors.LIGHT_GRAY,
    fontFamily: Fonts.NUNITO_REGULAR,
    fontSize: responsiveFontSize(1.8),
  },
  colorText: {
    color: Colors.ORANGE,
  },
  bottomInfoContainer: {
    borderRadius: responsiveWidth(5),
    marginTop: responsiveHeight(2),
  },
  bottomInfoInnerContainer: {
    backgroundColor: Colors.WHITE,
    borderRadius: responsiveWidth(5),
    margin: responsiveWidth(4.5),
    padding: responsiveWidth(4.5),
  },
  playIconView: {
    height: responsiveWidth(8),
    width: responsiveWidth(8),
    borderRadius: responsiveWidth(5),
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 5,
    shadowColor: Colors.BLACK,
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  optionTitle: {
    color: Colors.BRIGHT_BLUE,
  },
});
