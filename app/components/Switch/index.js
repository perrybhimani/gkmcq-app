import React from 'react';
import PropTypes from 'prop-types';
import DefaultProps from '../../constants/DefaultProps';
import { Switch } from 'react-native-switch';
import { responsiveHeight } from '../../utils/scalingUtils';
import * as Colors from './../../themes/colors';

export const CustomSwitch = (props) => {
  const { onValueChange, value } = props;

  return (
    <Switch
      value={value}
      renderActiveText={false}
      renderInActiveText={false}
      barHeight={responsiveHeight(1.7)}
      circleSize={responsiveHeight(1.5)}
      circleBorderWidth={2}
      backgroundInactive={Colors.LIGHT_GRAY}
      backgroundActive={Colors.GREEN}
      onValueChange={onValueChange}
      innerCircleStyle={{
        backgroundColor: 'transparent',
      }}
      circleBorderActiveColor={Colors.WHITE}
      circleBorderInactiveColor={Colors.WHITE}
      switchLeftPx={3}
      switchRightPx={3}
    />
  );
};

CustomSwitch.defaultProps = {
  onValueChange: DefaultProps.noop,
};

CustomSwitch.propTypes = {
  onValueChange: PropTypes.func,
};
