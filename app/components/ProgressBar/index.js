import React from "react";
import { View } from "react-native";
import { styles } from "./style";
import LinearGradient from "react-native-linear-gradient";

export const ProgressBar = (props) => {
  const { width, height } = props;

  return (
    <View style={styles.container(height)}>
      <LinearGradient
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        colors={["#543DFA", "#F47676", "#FFD857"]}
        style={[styles.progress(width, height)]}
      />
    </View>
  );
};
