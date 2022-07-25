import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
} from 'react-native';

import { SvgXml } from 'react-native-svg';
import { responsiveHeight, responsiveWidth } from '../../utils/scalingUtils';
import * as Colors from '../../themes/colors';
import * as Icons from '../../constants/svg';
import { getTouchableComponent } from './touchable';

class FloatingActionItem extends Component {
  constructor(props) {
    super(props);
    this.animation = new Animated.Value(0);
  }

  componentDidUpdate(prevProps) {
    const { active, animated } = this.props;

    if (prevProps.active !== active && animated) {
      Animated.spring(this.animation, {
        toValue: active ? 1 : 0,
        useNativeDriver: false,
      }).start();
    }
  }

  get distanceToHorizontalEdge() {
    const { distanceToEdge } = this.props;
    return typeof distanceToEdge === 'number'
      ? distanceToEdge
      : distanceToEdge.horizontal;
  }

  get distanceToVerticalEdge() {
    const { distanceToEdge } = this.props;
    return typeof distanceToEdge === 'number'
      ? distanceToEdge
      : distanceToEdge.vertical;
  }

  handleOnPress = () => {
    const { name, onPress } = this.props;
    onPress(name);
  };

  renderText() {
    const {
      elevation,
      text,
      position,
      textProps,
      textContainerStyle,
      shadow,
      icon,
      name,
    } = this.props;

    if (text) {
      return (
        <TouchableOpacity
          key='text'
          style={[
            styles.textContainer,
            styles[`${position}TextContainer`],
            {
              backgroundColor: Colors.WHITE,
              // backgroundColor: 'red',
              paddingHorizontal: responsiveWidth(4),
              elevation: 5 || elevation,
              flexDirection: 'row',
              shadowOffset: {
                height: 5 || elevation,
              },
            },
            shadow,
            textContainerStyle,
          ]}
          onPress={this.handleOnPress}
        >
          <Text
            style={[
              styles.text,
              {
                color: Colors.BLACK,
              },
            ]}
            {...textProps}
          >
            {text}
          </Text>
          <View style={{ marginLeft: responsiveWidth(2) }}>
            {React.isValidElement(icon) ? (
              icon
            ) : (
              <SvgXml style={{ height: '80%', width: '80%' }} xml={icon} />
            )}
          </View>
        </TouchableOpacity>
      );
    }

    return null;
  }

  render() {
    const { position, render, name } = this.props;

    const components = [];
    const distanceToEdgeActionContainer = {};

    const Touchable = getTouchableComponent(false);

    if (position === 'right') {
      components.push(this.renderText());
      distanceToEdgeActionContainer.paddingRight =
        this.distanceToHorizontalEdge + 8;
    } else if (render) {
      components.push(render({ key: name }));
    }

    return (
      <TouchableOpacity
        activeOpacity={0.4}
        style={styles.container}
        onPress={this.handleOnPress}
      >
        <View
          style={[
            styles.actionContainer,
            styles[`${position}ActionContainer`],
            distanceToEdgeActionContainer,
          ]}
        >
          {components}
        </View>
      </TouchableOpacity>
    );
  }
}

FloatingActionItem.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.any,
  name: PropTypes.string.isRequired,
  text: PropTypes.string,
  position: PropTypes.oneOf(['left', 'right', 'center']),
  distanceToEdge: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      vertical: PropTypes.number,
      horizontal: PropTypes.number,
    }),
  ]),
  onPress: PropTypes.func,
};

FloatingActionItem.defaultProps = {
  color: 'transparent',
  distanceToEdge: 30,
  shadow: {
    shadowOpacity: 0.35,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowColor: '#000000',
    shadowRadius: 3,
  },
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    flex: 1,
    flexDirection: 'column',
  },
  actionContainer: {
    marginBottom: responsiveHeight(1.5),
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 0,
    paddingRight: 0,
  },
  textContainer: {
    paddingHorizontal: responsiveWidth(4),
    borderRadius: responsiveHeight(2),
    height: responsiveHeight(4),
    borderRadius: responsiveWidth(10),
    alignItems: 'center',
  },
  rightTextContainer: {
    marginRight: 15,
  },
  text: {
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FloatingActionItem;
