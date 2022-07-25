import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { styles } from './style';
import PropTypes from 'prop-types';
import DefaultProps from '../../constants/DefaultProps';
import { SvgXml } from 'react-native-svg';
import * as Icons from '../../constants/svg';

const ActionButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <SvgXml style={[styles.icon, props.iconStyle]} xml={props.icon} />
    </TouchableOpacity>
  );
};

export const Header = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.bottomBorder} />
      <View style={styles.viewContainer}>
        <ActionButton
          onPress={props.leftIconPress}
          icon={props.leftIcon ? props.leftIcon : Icons.BACK_ARROW}
          iconStyle={props.leftIconStyle}
        />
        <Text style={[styles.title, props.titleStyle && props.titleStyle]}>
          {props.title}
        </Text>
        <ActionButton
          onPress={props.rightIconPress}
          icon={props.rightIcon ? props.rightIcon : Icons.BELL_ICON}
          iconStyle={props.rightIconStyle}
        />
      </View>
    </View>
  );
};

Header.defaultProps = {
  leftIconPress: DefaultProps.noop,
  rightIconPress: DefaultProps.noop,
  title: DefaultProps.EMPTY_STRING,
};

Header.propTypes = {
  leftIconPress: PropTypes.func,
  rightIconPress: PropTypes.func,
  title: PropTypes.string,
};
