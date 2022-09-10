import { Platform, StyleSheet } from 'react-native';
import { responsiveWidth, getResponsiveFontSize, responsiveHeight, responsiveFontSize } from '../../utils/scalingUtils';
import * as Colors from '../../themes/colors';
import * as Fonts from '../../themes/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    marginTop: responsiveHeight(4),
    backgroundColor: Colors.SKY_BLUE,
    height: responsiveHeight(45),
    width: responsiveWidth(80),
    alignItems: 'center',
    borderRadius: 40,
  },
  modalIconContainer: {
    position: 'absolute',
    top: responsiveHeight(-10),
    backgroundColor: Colors.THICK_GRAY,
    width: responsiveWidth(50),
    height: responsiveWidth(50),
    borderRadius: responsiveWidth(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTextContainer: {
    marginTop: responsiveHeight(15),
    alignItems: 'center',
  },
  doneButton: {
    flexDirection: 'row',
    // height: responsiveHeight(20),
    borderRadius: responsiveHeight(7.5),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveHeight(1),
    marginHorizontal: responsiveWidth(2),
    width: responsiveWidth(30),
    height: responsiveHeight(6.5),
    fontFamily: Fonts.NUNITO_BOLD,
    backgroundColor: Colors.DARK_ORANGE,
  },
  doneButtonText: {
    textAlign: 'center',
    fontSize: responsiveFontSize(2),
    includeFontPadding: false,
    color: Colors.WHITE,
    marginHorizontal: responsiveWidth(2),
  },
  wrongText: {
    color: Colors.DARK_ORANGE,
    fontFamily: Fonts.NUNITO_BOLD,
    fontSize: responsiveFontSize(3),
  },
  correctText: {
    color: Colors.GREEN,
    fontFamily: Fonts.NUNITO_BOLD,
    fontSize: responsiveFontSize(3),
  },
  subTextStyle: {
    color: Colors.NEVY_BLUE,
    fontFamily: Fonts.NUNITO_REGULAR,
    fontSize: responsiveFontSize(2.2),
    marginVertical: responsiveHeight(2.5),
  },
  correctDoneButton: {
    flexDirection: 'row',
    borderRadius: responsiveHeight(7.5),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveHeight(1),
    width: responsiveWidth(30),
    height: responsiveHeight(6.5),
    fontFamily: Fonts.NUNITO_BOLD,
    backgroundColor: Colors.GREEN,
    marginHorizontal: responsiveWidth(2),
  },
});