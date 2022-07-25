import React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import * as Colors from '../../themes/colors';
import PropTypes from 'prop-types';

const CustomLoader = (props) => {
  return props.isLoading ? (
    <ActivityIndicator
      animating={props.isLoading}
      size='large'
      style={styles.activityIndicator(props.isLoading)}
      color={Colors.BRIGHT_BLUE}
    />
  ) : null;
};

CustomLoader.defaultProps = {
  isLoading: false,
};

CustomLoader.propTypes = {
  isLoading: PropTypes.bool,
};

export default CustomLoader;

const styles = StyleSheet.create({
  activityIndicator: (isLoading) => ({
    flex: 1,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: isLoading ? 99 : null,
    backgroundColor: isLoading ? Colors.TRANSPARENT_BLACK : null,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  }),
});
