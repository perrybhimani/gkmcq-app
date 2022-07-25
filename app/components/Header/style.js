import { Platform, StyleSheet } from 'react-native';
import {
  responsiveWidth,
  getResponsiveFontSize,
  responsiveHeight,
  deviceWidth,
  deviceHeight,
  responsiveFontSize,
} from '../../utils/scalingUtils';
import * as Colors from '../../themes/colors';
import * as Fonts from './../../themes/fonts';

export const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(100),
    height: responsiveHeight(14),
    backgroundColor: Colors.NEVY_BLUE,
    display: 'flex',
  },
  bottomBorder: {
    zIndex: 0,
    width: '25%',
    height: '100%',
    left: '36.5%',
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? '-83%' : '-70%',
    backgroundColor: Colors.SKY_BLUE,
    transform: [{ scaleX: 5.5 }, { scaleY: 1 }],
  },
  viewContainer: {
    marginTop:
      Platform.OS === 'ios' ? responsiveHeight(6) : responsiveHeight(3),
    marginBottom: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(4),
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontFamily: Fonts.NUNITO_SEMI_BOLD,
    color: Colors.SKY_BLUE,
    fontSize: responsiveFontSize(2),
  },
  icon: {
    minWidth: responsiveWidth(5),
    minHeight: responsiveWidth(5),
  },
});
