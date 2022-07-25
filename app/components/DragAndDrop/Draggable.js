import React from "react";
import {
  View,
  Text,
  PanResponder,
  Animated,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import PropTypes from "prop-types";
import {
  deviceWidth,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "../../utils/scalingUtils";
import * as Colors from "./../../themes/colors";
import * as Fonts from "./../../themes/fonts";

function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}

export default function Draggable(props) {
  const {
    data,
    renderSize,
    shouldReverse,
    disabled,
    onPressIn,
    x,
    y,
    minX,
    minY,
    maxX,
    maxY,
  } = props;
  const pan = React.useRef(new Animated.ValueXY());
  const offsetFromStart = React.useRef({ x: 0, y: 0 });
  const childSize = React.useRef({ x: renderSize, y: renderSize });
  const startBounds = React.useRef();
  const isDragging = React.useRef(false);

  const getBounds = React.useCallback(() => {
    const left = x + offsetFromStart.current.x;
    const top = y + offsetFromStart.current.y;
    return {
      left,
      top,
      right: left + childSize.current.x,
      bottom: top + childSize.current.y,
    };
  }, [x, y]);

  const shouldStartDrag = React.useCallback(
    (gs) => {
      return !disabled && (Math.abs(gs.dx) > 2 || Math.abs(gs.dy) > 2);
    },
    [disabled]
  );

  const onPanResponderGrant = React.useCallback(
    (e, gestureState) => {
      startBounds.current = getBounds();
      isDragging.current = true;
      if (!shouldReverse) {
        pan.current.setOffset(offsetFromStart.current);
        pan.current.setValue({ x: 0, y: 0 });
      }
    },
    [getBounds, shouldReverse]
  );

  const handleOnDrag = React.useCallback(
    (e, gestureState) => {
      const { dx, dy } = gestureState;
      const { top, right, left, bottom } = startBounds.current;
      const far = 999999999;
      const changeX = clamp(
        dx,
        Number.isFinite(minX) ? minX - left : -far,
        Number.isFinite(maxX) ? maxX - right : far
      );
      const changeY = clamp(
        dy,
        Number.isFinite(minY) ? minY - top : -far,
        Number.isFinite(maxY) ? maxY - bottom : far
      );
      pan.current.setValue({ x: changeX, y: changeY });
    },
    [maxX, maxY, minX, minY]
  );

  const panResponder = React.useMemo(() => {
    return PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        shouldStartDrag(gestureState),

      onMoveShouldSetPanResponderCapture: (_, gestureState) =>
        shouldStartDrag(gestureState),
      onPanResponderGrant,
      onPanResponderMove: Animated.event([], {
        listener: handleOnDrag,
        useNativeDriver: false,
      }),
    });
  }, [handleOnDrag, onPanResponderGrant, shouldStartDrag]);

  React.useEffect(() => {
    const curPan = pan.current;
    if (!shouldReverse) {
      curPan.addListener((c) => (offsetFromStart.current = c));
    }
    return () => {
      curPan.removeAllListeners();
    };
  }, [shouldReverse]);

  const touchableContent = () => {
    if (data.isSelected) {
      return (
        <View style={styles.selectedView}>
          <Text style={[styles.text, { color: Colors.WHITE }]}>
            {data.option}
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.optionContainer}>
          <Text style={styles.text}>{data.option}</Text>
        </View>
      );
    }
  };

  const handleOnLayout = React.useCallback((event) => {
    const { height, width } = event.nativeEvent.layout;
    childSize.current = { x: width, y: height };
  }, []);
  return (
    <View>
      <Animated.View
        {...panResponder.panHandlers}
        style={pan.current.getLayout()}
      >
        <TouchableOpacity
          onLayout={handleOnLayout}
          disabled={disabled}
          onPressIn={onPressIn}
        >
          {touchableContent()}
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

Draggable.defaultProps = {
  shouldReverse: false,
  disabled: false,
  debug: false,
  onPressIn: () => {},
  x: 0,
  y: 0,
};

Draggable.propTypes = {
  shouldReverse: PropTypes.bool,
  disabled: PropTypes.bool,
  debug: PropTypes.bool,
  onPressIn: PropTypes.func,
  x: PropTypes.number,
  y: PropTypes.number,
  minX: PropTypes.number,
  minY: PropTypes.number,
  maxX: PropTypes.number,
  maxY: PropTypes.number,
};

const styles = StyleSheet.create({
  text: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: Fonts.NUNITO_SEMI_BOLD,
    color: Colors.BLACK,
  },
  test: { backgroundColor: "red" },
  debugView: {
    backgroundColor: "#ff000044",
    position: "absolute",
    borderColor: "#fced0ecc",
    borderWidth: 4,
  },
  selectedView: {
    width: "auto",
    paddingHorizontal: responsiveWidth(2),
    borderRadius: responsiveWidth(7),
    backgroundColor: Colors.THICK_BLUE,
    alignItems: "baseline",
  },
  optionContainer: {
    borderColor: Colors.PURPLE,
    borderWidth: 0.5,
    width: (deviceWidth - responsiveWidth(13)) / 2,
    height: responsiveHeight(5.5),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: responsiveWidth(7),
    marginHorizontal: responsiveWidth(2),
    marginVertical: responsiveHeight(1),
  },
});
