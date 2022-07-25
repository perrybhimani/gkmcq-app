import React, { useState } from "react";
import { TextInput as Input, View, Text, TouchableOpacity } from "react-native";
// import {SvgXml} from 'react-native-svg';
import { styles } from "./style";
import DefaultProps from "../../constants/DefaultProps";
import PropTypes from "prop-types";
import * as Colors from "./../../themes/colors";
// import * as Fonts from './../../themes/fonts';
import { getResponsiveFontSize } from "../../utils/scalingUtils";
import { SvgXml } from "react-native-svg";

export const TextInput = (props) => {
  const [isPasswordHidden, setisPasswordHidden] = useState(true);
  const {
    title,
    wrapperStyle,
    isPassword,
    inputWrapperStyle,
    placeholderTextColor,
    textInputProps,
    inputStyle,
    showRightIcon,
    rightIcon,
    error,
    isLightMode,
    isHollow,
    showLeftIcon,
    showLeftText,
    leftIcon,
    fillLefticon,
  } = props;

  return (
    <View style={[styles.inputContainer, wrapperStyle]}>
      {title ? (
        <Text style={styles.inputTitle(isLightMode)}>{title}</Text>
      ) : null}
      <View
        style={[styles.inputWrapper(isLightMode, isHollow), inputWrapperStyle]}
      >
        {showLeftIcon ? (
          <View style={styles.lefticon}>
            <SvgXml fill={fillLefticon} width={14} height={14} xml={leftIcon} />
          </View>
        ) : null}
        {showLeftText ? (
          <View style={styles.lefticon}>
            <Text style={styles.leftText(isLightMode)}>{showLeftText}</Text>
          </View>
        ) : null}
        <Input
          returnKeyType="done"
          style={[styles.textInput(isLightMode, isHollow), inputStyle]}
          secureTextEntry={isPassword && isPasswordHidden}
          placeholderTextColor={Colors.THICK_WHITE}
          {...textInputProps}
        />
        {/* {isPassword ? (
          <TouchableOpacity
            style={styles.EYE_ICON}
            onPress={() => setisPasswordHidden(!isPasswordHidden)}>
            <Text
              style={{
                color: Colors.THEME_LIGHT_ORANGE,
                fontSize: getResponsiveFontSize(12),
                // fontFamily: Fonts.IBM_PLEX_SANS_SEMI_BOLD,
              }}>
              {isPasswordHidden ? 'SHOW' : 'HIDE'}
            </Text>
          </TouchableOpacity>
        ) : null} */}
        {showRightIcon ? (
          <View style={styles.EYE_ICON}>
            {/* <SvgXml width={20} height={20} xml={rightIcon} /> */}
          </View>
        ) : null}
      </View>
      {error ? <Text style={styles.errorLabel}>* {error}</Text> : null}
    </View>
  );
};

TextInput.defaultProps = {
  textInputProps: DefaultProps.EMPTY_OBJECT,
  isPassword: false,
  showRightIcon: false,
  showLeftIcon: false,
  isLightMode: false,
  isHollow: false,
  fillLefticon: undefined,
  rightIcon: DefaultProps.EMPTY_STRING,
};

TextInput.propTypes = {
  placeholderTextColor: PropTypes.string,
  fillLefticon: PropTypes.string,
  textInputProps: PropTypes.object,
  isPassword: PropTypes.bool,
  isLightMode: PropTypes.bool,
  isHollow: PropTypes.bool,
  showRightIcon: PropTypes.bool,
  showLeftIcon: PropTypes.bool,
  rightIcon: PropTypes.string,
};
