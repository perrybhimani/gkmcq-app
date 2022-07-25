import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './style';
import { SvgXml } from 'react-native-svg';
import * as Icons from '../../constants/svg';
import { ProgressBar } from '../ProgressBar';
import LinearGradient from 'react-native-linear-gradient';
import Image from "react-native-fast-image";

export const LeaderboardLevel1 = (props) => {
  let { completeTopic, totalTopics, userId, userProgress, profilePicture } =
    props.currentUser;
  // let progress = (completeTopic / totalTopics) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.userImageContainer}>
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          colors={['#bd2efc', '#7444fb', '#245dfa']}
          style={styles.circle}
        >
          <View style={styles.gradientCircle}></View>
        </LinearGradient>
        {profilePicture ? (
          <Image
            style={styles.topicImage}
            source={{
              uri: props.image,
            }}
          />
        ) : (
          <SvgXml style={styles.girlImage} xml={Icons.LEVEL1_GIRL} />
        )}
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.topView}>
          <SvgXml style={styles.topViewLeft} xml={Icons.TROPHY} />
          <Text style={styles.topViewTitle}>Level 1</Text>
          <SvgXml style={styles.topViewRight} xml={Icons.TITLE} />
        </View>
        <View style={styles.bottomView}>
          <ProgressBar width={userProgress} />
          <Text style={styles.progressStatus}>
            {Math.round(userProgress)}% Completed
          </Text>
        </View>
      </View>
    </View>
  );
};
