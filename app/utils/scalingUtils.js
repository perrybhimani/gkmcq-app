import {Dimensions, Platform, Text, TextInput} from 'react-native';
import DeviceInfo from 'react-native-device-info';

const {height, width} = Dimensions.get('window');

export const responsiveHeight = h => height * (h / 100);

export const deviceHeight = height;

export const deviceWidth = width;

export const isPad = DeviceInfo.isTablet();

export const responsiveWidth = w => width * (w / 100);

export const responsiveFontSize = f =>
  Math.sqrt(height * height + width * width) * (f / 100);

export function getBaseLineWidth() {
  if (Platform.OS === 'ios') {
    return 375;
  } else {
    return 320;
  }
}

export function getResponsiveFontSize(fontSize) {
  if (fontSize) {
    let size = fontSize;
    const [shortDimension, longDimension] =
      width < height ? [width, height] : [height, width];
    const guidelineBaseWidth = getBaseLineWidth();
    const scale = size => (shortDimension / guidelineBaseWidth) * size;
    return Math.round(size + (scale(size) - size) * 0.5);
  }
  return 17;
}

export function isIphoneXorAbove() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 896 ||
      dimen.width === 896 ||
      dimen.height === 844 ||
      dimen.width === 390)
  );
}

export function isIphoneX() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 || dimen.width === 812)
  );
}

export function ifIphoneX(iphoneXStyle, regularStyle) {
  if (isIphoneX()) {
    return iphoneXStyle;
  }
  return regularStyle;
}

export function disableFontScaling() {
  if (Text.defaultProps == null) Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;
  if (TextInput.defaultProps == null) TextInput.defaultProps = {};
  TextInput.defaultProps.allowFontScaling = false;
}
