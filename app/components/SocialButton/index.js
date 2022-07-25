import React from 'react';
import { TouchableOpacity } from 'react-native';
import { styles } from './style';
import PropTypes from 'prop-types';
import DefaultProps from '../../constants/DefaultProps';
import { SvgXml } from 'react-native-svg';

export const SocialButton = (props) => {
  const { onPress, wrapperStyle, icon } = props;

  return (
    <TouchableOpacity
      style={[styles.buttonContainer, wrapperStyle]}
      onPress={() => {
        if (onPress) {
          onPress();
        }
      }}
    >
      <SvgXml style={styles.buttonImage} xml={icon} />
    </TouchableOpacity>
  );
};

SocialButton.defaultProps = {
  onPress: DefaultProps.noop,
};

SocialButton.propTypes = {
  onPress: PropTypes.func,
};
