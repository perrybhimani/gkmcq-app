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
import * as Fonts from '../../themes/fonts';

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
    marginBottom: 15,
  },
  userImage: {
    minWidth: '100%',
    minHeight: '100%',
  },
  userImageContainer: {
    width: responsiveHeight(7),
    height: responsiveHeight(7),
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
  },
  userImage: {
    maxWidth: '65%',
    maxHeight: '65%',
    minWidth: '65%',
    minHeight: '65%',
  },
  rightContainer: {
    flex: 1,
    marginLeft: 10,
    height: responsiveHeight(7),
  },
  topView: {
    width: '100%',
    height: '50%',
    paddingVertical: '1%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomView: {
    width: '100%',
    height: '50%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  progressStatus: {
    fontFamily: Fonts.NUNITO_LIGHT,
    fontSize: responsiveFontSize(1.3),
    marginLeft: responsiveWidth(1.8),
    color: Colors.LIGHT_GRAY,
  },
  topViewLeftText: {
    fontFamily: Fonts.NUNITO_MEDIUM,
    fontSize: responsiveFontSize(1.6),
  },
  topViewRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topViewRightText: {
    fontFamily: Fonts.NUNITO_MEDIUM,
    fontSize: responsiveFontSize(1.5),
    marginLeft: 10,
  },
  levelStar: {
    minWidth: responsiveHeight(2),
    minHeight: responsiveHeight(2),
    marginLeft: 5,
  },
});
