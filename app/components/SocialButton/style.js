import { Platform, StyleSheet } from 'react-native';
import {
  responsiveWidth,
  getResponsiveFontSize,
  responsiveHeight,
} from '../../utils/scalingUtils';
import * as Colors from '../../themes/colors';
// import * as Fonts from './../../themes/fonts';

export const styles = StyleSheet.create({
  buttonContainer: {
    width: responsiveWidth(7),
    height: responsiveWidth(7),
    borderRadius: 22,
  },
  buttonImage: {
    width: '100%',
    height: '100%',
  },
});
