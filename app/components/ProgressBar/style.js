import { Platform, StyleSheet } from "react-native";
import { responsiveHeight } from "../../utils/scalingUtils";
import * as Colors from "../../themes/colors";

export const styles = StyleSheet.create({
  container: (height) => ({
    flex: 1,
    borderColor: Colors.NEVY_BLUE,
    marginVertical: responsiveHeight(1.5),
    borderWidth: 1,
    borderRadius: 25,
    position: "relative",
    height: height ? height : responsiveHeight(0.7),
    backgroundColor: Colors.SKY_BLUE,
    ...Platform.select({
      ios: {
        shadowRadius: 5,
        shadowColor: Colors.BLACK,
        shadowOpacity: 0.2,
        shadowOffset: { width: 2, height: 1 },
        elevation: 3,
      },
      android: {
        elevation: 5,
        shadowRadius: 2,
      },
    }),
  }),
  progress: (width, height) => ({
    width: `${width + 1}%`,
    height: height ? height : responsiveHeight(0.7),
    borderRadius: 25,
    position: "absolute",
    left: -1,
    top: -1,
    ...Platform.select({
      ios: {
        shadowRadius: 5,
        shadowColor: Colors.BLACK,
        shadowOpacity: 0.2,
        shadowOffset: { width: 5, height: 1 },
        elevation: 5,
      },
      android: {
        elevation: 5,
        shadowRadius: 2,
      },
    }),
  }),
});
