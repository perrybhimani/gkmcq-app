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
    width: '100%',
    backgroundColor: Colors.WHITE,
    display: 'flex',
    borderRadius: 7,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 13,
  },
  userImage: {
    minWidth: '100%',
    minHeight: '100%',
  },
  userImageContainer: {
    width: responsiveHeight(10),
    height: responsiveHeight(10),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: responsiveHeight(50),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientCircle: {
    backgroundColor: 'white',
    width: '95%',
    height: '95%',
    borderRadius: responsiveHeight(50),
  },
  girlImage: {
    maxWidth: '65%',
    maxHeight: '65%',
  },
  rightContainer: {
    flex: 1,
    marginLeft: 10,
    height: responsiveHeight(7),
  },
  topView: {
    width: '100%',
    height: '60%',
    paddingVertical: '1%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  bottomView: {
    width: '100%',
    height: '40%',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: responsiveHeight(0.7),
  },
  topViewLeft: {
    maxWidth: responsiveHeight(3.5),
  },
  topViewTitle: {
    fontFamily: Fonts.NUNITO_SEMI_BOLD,
    fontSize: responsiveFontSize(1.8),
    marginLeft: responsiveWidth(3),
  },
  topViewRight: {
    marginLeft: responsiveWidth(3),
    maxWidth: responsiveHeight(4),
  },
  progressStatus: {
    fontFamily: Fonts.NUNITO_LIGHT,
    fontSize: responsiveFontSize(1.4),
    marginLeft: responsiveWidth(1.8),
    color: Colors.LIGHT_GRAY,
  },
});
