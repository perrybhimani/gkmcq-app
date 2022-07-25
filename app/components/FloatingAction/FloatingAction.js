import React, { Component } from 'react'; // eslint-disable-line
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  View,
} from 'react-native';

import FloatingActionItem from './FloatingActionItem';
import { SvgXml } from 'react-native-svg';
import * as Icons from '../../constants/svg';
import * as Colors from '../../themes/colors';

import {
  isIphoneX,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/scalingUtils';

const DEVICE_WIDTH = Dimensions.get('window').width;

class FloatingAction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      shouldRender: props.visible ? true : false,
      closeButtonShow: false,
    };

    this.mainBottomAnimation = new Animated.Value(this.distanceToVerticalEdge);
    this.actionsBottomAnimation = new Animated.Value(
      30 + this.distanceToVerticalEdge + 8
    );
    this.animation = new Animated.Value(0);
    this.actionsAnimation = new Animated.Value(0);
    this.visibleAnimation = new Animated.Value(props.visible ? 0 : 1);
    /*
     * this animation will fix an error on ReactNative (Android) where
     * interpolations with 0 and 1 don't work as expected.
     */
    this.fadeAnimation = new Animated.Value(props.visible ? 1 : 0);
  }

  componentDidUpdate(prevProps) {
    const { visible } = this.props;

    if (prevProps.visible !== visible) {
      if (visible) {
        this.setState({ shouldRender: true });
        Animated.parallel([
          Animated.spring(this.visibleAnimation, {
            toValue: 0,
            useNativeDriver: false,
          }),
          Animated.spring(this.fadeAnimation, {
            toValue: 1,
            useNativeDriver: false,
          }),
        ]).start();
      }
      if (!visible) {
        Animated.parallel([
          Animated.spring(this.visibleAnimation, {
            toValue: 1,
            useNativeDriver: false,
          }),
          Animated.spring(this.fadeAnimation, {
            toValue: 0,
            useNativeDriver: false,
          }),
        ]).start(() => this.setState({ shouldRender: false }));
      }
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

  onKeyboardShow = (e) => {
    const { height } = e.endCoordinates;

    Animated.parallel([
      Animated.spring(this.actionsBottomAnimation, {
        bounciness: 0,
        toValue:
          this.distanceToVerticalEdge + 80 + height - (isIphoneX() ? 40 : 0),
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.spring(this.mainBottomAnimation, {
        bounciness: 0,
        toValue: this.distanceToVerticalEdge + height - (isIphoneX() ? 40 : 0),
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start();
  };

  getIcon = () => {
    return (
      <View style={styles.iconContainer}>
        <SvgXml style={{ height: '100%', width: '100%' }} xml={Icons.OPTION} />
      </View>
    );
  };

  getClose = () => {
    return (
      <View style={styles.iconContainer}>
        <SvgXml
          height={responsiveHeight(2.5)}
          width={responsiveWidth(4)}
          style={{ marginBottom: 6 }}
          xml={Icons.CLOSE_ICON_WHITE}
          fill={'black'}
        />
      </View>
    );
  };

  reset = () => {
    const { onClose } = this.props;
    this.setState({ closeButtonShow: false });

    this.updateState(
      {
        active: false,
      },
      () => {
        if (onClose) {
          onClose();
        }
      }
    );
  };

  animateButton = () => {
    const { floatingIcon, animated, onPressMain, onOpen, setIsBackEffect } =
      this.props;
    const { active } = this.state;

    if (onPressMain) {
      onPressMain(!active);
    }
    setIsBackEffect(!active);

    if (!active) {
      if (!floatingIcon) {
        if (animated) {
          Animated.spring(this.animation, {
            toValue: 1,
            useNativeDriver: false,
          }).start();
        }
      }

      if (animated) {
        this.setState({ closeButtonShow: true });

        Animated.spring(this.actionsAnimation, {
          toValue: 1,
          useNativeDriver: false,
        }).start();
      }

      this.updateState(
        {
          active: true,
        },
        () => {
          if (onOpen) {
            onOpen();
          }
        }
      );
    } else {
      this.reset();
    }
  };

  updateState = (nextState, callback) => {
    const { onStateChange } = this.props;
    const { active } = this.state;

    this.setState(nextState, () => {
      if (callback) {
        callback();
      }
      if (onStateChange) {
        onStateChange({
          isActive: active,
        });
      }
    });
  };

  handlePressItem = (itemName) => {
    console.log('handlePressItem');
    const { onPressItem } = this.props;

    if (onPressItem) {
      onPressItem(itemName);
    }
    this.reset();
  };

  renderMainButton() {
    const { position } = this.props;

    let animatedVisibleView;
    let animatedViewStyle;

    const propStyles = {
      bottom: this.mainBottomAnimation,
    };

    if (['left', 'right'].indexOf(position) > -1) {
      propStyles[position] = this.distanceToHorizontalEdge;
    }
    return (
      <Animated.View
        style={[
          styles.buttonContainer,
          styles[`${position}Button`],
          propStyles,
          animatedVisibleView,
        ]}
        accessible
        accessibilityLabel='Floating Action Button'
      >
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          {this.state.closeButtonShow && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.reset();
                this.animateButton();
              }}
            >
              <View style={[styles.buttonTextContainer, animatedViewStyle]}>
                {this.getClose()}
              </View>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.button} onPress={this.animateButton}>
            <View style={[styles.buttonTextContainer, animatedViewStyle]}>
              {this.getIcon()}
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }

  renderActions() {
    const { actions, position, animated } = this.props;
    const { active } = this.state;

    if (!actions || actions.length === 0) {
      return undefined;
    }

    let animatedActionsStyle;

    if (animated) {
      animatedActionsStyle = {
        opacity: this.actionsAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
      };
    } else {
      animatedActionsStyle = { opacity: active ? 1 : 0 };
    }

    const actionsStyles = [
      styles.actions,
      styles[`${position}Actions`],
      animatedActionsStyle,
      {
        bottom: this.actionsBottomAnimation,
      },
    ];

    if (active) {
      actionsStyles.push(styles[`${position}ActionsVisible`]);
    }

    return (
      <Animated.View style={actionsStyles} pointerEvents='box-none'>
        {actions.map((action) => {
          return (
            <FloatingActionItem
              paddingTopBottom={8}
              distanceToEdge={30}
              key={action.name}
              {...action}
              position={position}
              active={active}
              onPress={(itemName) => {
                this.handlePressItem(itemName);
                this.animateButton();
              }}
              name={action.name}
            />
          );
        })}
      </Animated.View>
    );
  }

  render() {
    const { active, shouldRender } = this.state;
    const { visible } = this.props;

    if (!shouldRender && !visible) {
      return null;
    }

    return (
      <>
        <Animated.View
          pointerEvents='box-none'
          style={[styles.overlay, { backgroundColor: 'transparent' }]}
        >
          {active}
          {this.renderActions()}
          {this.renderMainButton()}
        </Animated.View>
        {active && (
          <View
            style={{
              position: 'absolute',
              bottom: responsiveHeight(6.5) + 10,
              left: 0,
              right: 0,
              top: 0,
              backgroundColor: Colors.BLACK,
              zIndex: 2,
              opacity: 0.6,
            }}
          />
        )}
      </>
    );
  }
}

FloatingAction.propTypes = {
  animated: PropTypes.bool,
  distanceToEdge: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      vertical: PropTypes.number,
      horizontal: PropTypes.number,
    }),
  ]),
  visible: PropTypes.bool,
  position: PropTypes.oneOf(['right', 'left', 'center']),
};

FloatingAction.defaultProps = {
  visible: true,
  position: 'right',
  distanceToEdge: 30,
  animated: true,
};

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  actions: {
    marginBottom: responsiveHeight(1.5),
    position: 'absolute',
    bottom: 85,
    zIndex: 10,
  },
  rightActions: {
    alignItems: 'flex-end',
    right: -1000,
  },
  rightActionsVisible: {
    right: responsiveWidth(-4),
  },
  leftActionsVisible: {
    left: 0,
  },
  overlay: {
    position: 'absolute',
    bottom: responsiveHeight(6.5) - 17,
    left: 0,
    right: -18,
    top: 0,
    elevation: 0,
    zIndex: 3,
  },
  buttonContainer: {
    overflow: Platform.OS === 'ios' ? 'visible' : 'hidden',
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  button: {
    zIndex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Platform.OS === 'ios' ? responsiveHeight(2) : 0,
  },
  buttonTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FloatingAction;
