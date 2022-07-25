import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './style';
import { SvgXml } from 'react-native-svg';
import * as Icons from '../../constants/svg';
import { ProgressBar } from '../ProgressBar';

export const LeaderboardOtherLevel = (props) => {
  const progress = (100 * props?.get ?? 0) / props.total;
  return (
    <View style={styles.container}>
      <View style={styles.userImageContainer}>
        <SvgXml style={styles.circle} xml={Icons.CIRCLE} />
        <SvgXml style={styles.userImage} xml={props.userImage} />
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.topView}>
          <Text style={styles.topViewLeftText}>{props.name}</Text>
          <View style={styles.topViewRightContainer}>
            <SvgXml style={styles.levelStar} xml={Icons.LEVEL_STAR} />
            <SvgXml style={styles.levelStar} xml={Icons.LEVEL_STAR} />
            <Text style={styles.topViewRightText}>Level {props.level}</Text>
          </View>
        </View>
        <View style={styles.bottomView}>
          <ProgressBar width={progress} />
          <Text style={styles.progressStatus}>
            {props?.get ?? 0}/{props.total} Completed
          </Text>
        </View>
      </View>
    </View>
  );
};
