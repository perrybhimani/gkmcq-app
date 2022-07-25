import { StyleSheet } from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
  getResponsiveFontSize,
  responsiveFontSize,
} from '../../utils/scalingUtils';
import * as Fonts from './../../themes/fonts';
import * as Colors from './../../themes/colors';

export const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: responsiveHeight(2),
  },
  inputWrapper: (isLightMode, isHollow) => ({
    // borderWidth: 1,
    // borderColor: isLightMode ? Colors.WHITE : Colors.GREYISH_BLACK_BACK,
    borderRadius: 40,
    height: responsiveHeight(5.5),
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.THICK_GRAY,
  }),
  inputTitle: (isLightMode) => ({
    fontSize: responsiveFontSize(1.6),
    fontFamily: Fonts.NUNITO_REGULAR,
    includeFontPadding: false,
    marginBottom: responsiveHeight(1.2),
    color: isLightMode ? Colors.WHITE : Colors.BLACK,
  }),
  leftText: (isLightMode) => ({
    fontSize: getResponsiveFontSize(15),
    fontFamily: Fonts.NUNITO_REGULAR,
    includeFontPadding: false,
    color: isLightMode ? Colors.WHITE : Colors.BLACK,
  }),
  errorLabel: {
    marginTop: responsiveHeight(0.5),
    fontSize: getResponsiveFontSize(12),
    fontFamily: Fonts.NUNITO_REGULAR,
    includeFontPadding: false,
    color: Colors.RED_ACTIVE,
  },
  textInput: (isLightMode, isHollow) => ({
    fontSize: responsiveFontSize(1.4),
    fontFamily: Fonts.NUNITO_REGULAR,
    color: Colors.THICK_WHITE,
    includeFontPadding: false,
    padding: 0,
    margin: 0,
    paddingHorizontal: 8,
    flex: 1,
  }),
  EYE_ICON: {
    marginRight: 16,
  },
  lefticon: {
    marginLeft: 14,
  },
  showText: {
    color: Colors.THEME_LIGHT_ORANGE,
    fontSize: getResponsiveFontSize(12),
    // fontFamily: Fonts.IBM_PLEX_SANS_SEMI_BOLD,
  },
});
