import { Platform, StyleSheet } from "react-native";
import {
  responsiveWidth,
  getResponsiveFontSize,
  responsiveHeight,
} from "../../utils/scalingUtils";
import * as Colors from "./../../themes/colors";
// import * as Fonts from './../../themes/fonts';

export const styles = StyleSheet.create({
  buttonContainer: (disabled, isHollowButton) => ({
    flexDirection: "row",
    backgroundColor: Colors.THICK_PURPLE,
    height: responsiveHeight(7.5),
    borderRadius: 30,
    // borderColor: isHollowButton ? Colors.THEME_ORANGE : undefined,
    // borderWidth: isHollowButton ? 1 : undefined,
    alignItems: "center",
    justifyContent: "center",
    opacity: disabled ? 0.5 : 1,
  }),
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  linearGradient: {
    height: "100%",
    width: "100%",
    borderRadius: 30,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: getResponsiveFontSize(16),
    // fontFamily:
    //   Platform.OS === 'ios'
    //     ? Fonts.IBM_PLEX_SANS_BOLD
    //     : Fonts.IBM_PLEX_SANS_SEMI_BOLD,
    includeFontPadding: false,
    color: Colors.WHITE,
    marginHorizontal: responsiveWidth(2),
  },
  hollowBtnText: {
    color: Colors.BLACK,
  },
});
