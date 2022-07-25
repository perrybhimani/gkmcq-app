import { StyleSheet } from 'react-native';
import * as Colors from '../themes/colors';
import * as Fonts from '../themes/fonts';
import {
  getResponsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils/scalingUtils';

export const commonStyles = StyleSheet.create({
  container: () => ({
    flex: 1,
    backgroundColor: Colors.BLUE,
  }),
  centerContainer: (isBlack = false) => ({
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: isBlack ? Colors.BLACK : Colors.THEME_BLUE,
  }),
  FLEX_ROW_CENTER: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  FLEX_COLUMN_CENTER: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  FLEX_ROW_SPACE_BETWEEN: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  FLEX_ROW_SPACE_AROUND: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  // SEMI_BOLD_34: {
  //   fontFamily: Fonts.IBM_PLEX_SANS_SEMI_BOLD,
  //   fontSize: getResponsiveFontSize(34),
  //   color: Colors.WHITE,
  // },
  // SEMI_BOLD_30: {
  //   fontFamily: Fonts.IBM_PLEX_SANS_SEMI_BOLD,
  //   fontSize: getResponsiveFontSize(30),
  //   color: Colors.WHITE,
  // },
  // SEMI_BOLD_24: {
  //   fontFamily: Fonts.IBM_PLEX_SANS_SEMI_BOLD,
  //   fontSize: getResponsiveFontSize(24),
  //   color: Colors.WHITE,
  // },
  // SEMI_BOLD_14: {
  //   fontFamily: Fonts.IBM_PLEX_SANS_SEMI_BOLD,
  //   fontSize: getResponsiveFontSize(14),
  // },
  // SEMI_BOLD_12: {
  //   fontFamily: Fonts.IBM_PLEX_SANS_SEMI_BOLD,
  //   fontSize: getResponsiveFontSize(12),
  // },
  // BOLD_14_WHITE: {
  //   fontFamily: Fonts.IBM_PLEX_SANS_BOLD,
  //   fontSize: getResponsiveFontSize(14),
  //   color: Colors.WHITE,
  // },
  BOLD_15_BLACK: {
    fontFamily: Fonts.NUNITO_BOLD,
    fontSize: getResponsiveFontSize(15),
    color: Colors.BLACK,
  },
  BOLD_18_BLACK: {
    fontFamily: Fonts.NUNITO_BOLD,
    fontSize: getResponsiveFontSize(18),
    color: Colors.BLACK,
  },
  // REGULAR_12_WHITE: {
  //   fontFamily: Fonts.IBM_PLEX_SANS_REGULAR,
  //   fontSize: getResponsiveFontSize(12),
  //   includeFontPadding: false,
  //   color: Colors.WHITE,
  // },
  // REGULAR_13_WHITE: {
  //   fontFamily: Fonts.IBM_PLEX_SANS_REGULAR,
  //   fontSize: getResponsiveFontSize(13),
  //   includeFontPadding: false,
  //   color: Colors.WHITE,
  // },
  // REGULAR_14_WHITE: {
  //   fontFamily: Fonts.IBM_PLEX_SANS_REGULAR,
  //   fontSize: getResponsiveFontSize(14),
  //   includeFontPadding: false,
  //   color: Colors.WHITE,
  // },
  REGULAR_16_BLACK: {
    fontFamily: Fonts.NUNITO_REGULAR,
    fontSize: getResponsiveFontSize(16),
    includeFontPadding: false,
    color: '#4B4B4B',
  },
  // REGULAR_16_WHITE: {
  //   fontFamily: Fonts.IBM_PLEX_SANS_REGULAR,
  //   fontSize: getResponsiveFontSize(16),
  //   includeFontPadding: false,
  //   color: Colors.WHITE,
  // },
  // REGULAR_22_WHITE: {
  //   fontFamily: Fonts.IBM_PLEX_SANS_REGULAR,
  //   fontSize: getResponsiveFontSize(22),
  //   includeFontPadding: false,
  //   color: Colors.WHITE,
  // },
  // REGULAR_20_WHITE: {
  //   fontFamily: Fonts.IBM_PLEX_SANS_REGULAR,
  //   fontSize: getResponsiveFontSize(20),
  //   includeFontPadding: false,
  //   color: Colors.WHITE,
  // },
  // SEMI_BOLD_16_BLACK: {
  //   fontFamily: Fonts.IBM_PLEX_SANS_SEMI_BOLD,
  //   fontSize: getResponsiveFontSize(16),
  //   includeFontPadding: false,
  //   color: Colors.BLACK,
  // },
  // TITLE_TEXT: color => ({
  //   fontFamily: Fonts.IBM_PLEX_SANS_BOLD,
  //   fontSize: getResponsiveFontSize(15),
  //   includeFontPadding: false,
  //   color: color ? color : Colors.LIGHT_BLUE,
  // }),
  // ERROR_TEXT: {
  //   fontFamily: Fonts.IBM_PLEX_SANS_REGULAR,
  //   fontSize: getResponsiveFontSize(14),
  //   marginTop: responsiveHeight(2),
  //   color: Colors.RED_ACTIVE,
  //   includeFontPadding: false,
  // },
  rowAlignCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flex1: {
    flex: 1,
  },
});
