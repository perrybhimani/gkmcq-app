import { Platform, TouchableOpacity, TouchableNativeFeedback } from 'react-native';

export function getTouchableComponent(useNativeFeedback = true) {
  if (useNativeFeedback === true && Platform.OS === 'android') {
    return TouchableNativeFeedback;
  }
  return TouchableOpacity;
}

export function getRippleProps(color, useNativeFeedback = true) {
  // less than API 21 don't support Ripple
  if (useNativeFeedback === true && Platform.OS === 'android' && Platform.Version >= 21) {
    return {
      background: TouchableNativeFeedback.Ripple((color, -30), true),
    };
  }
  return {};
}
