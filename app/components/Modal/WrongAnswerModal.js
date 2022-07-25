import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import * as Icons from '../../constants/svg';
import { responsiveHeight, responsiveWidth } from '../../utils/scalingUtils';
import { styles } from './style';

const WrongAnswerModal = (props) => {
  const { display, onPress } = props;
  return (
    <View>
      <Modal transparent visible={display} >
        <View style={styles.container}>
          <View style={styles.modalContainer}>
            <View style={styles.modalIconContainer}>
              <SvgXml width={responsiveWidth(28)} height={responsiveHeight(25)} xml={Icons.WRONG_ANS} />
            </View>
            <View style={styles.modalTextContainer}>
              <Text style={styles.wrongText}>WRONG</Text>
              <Text style={styles.subTextStyle}>Your Answer is Incorrect</Text>
              <TouchableOpacity
                style={styles.doneButton}
                onPress={() => {
                  if (onPress) {
                    onPress();
                  }
                }}
              >
                <Text style={styles.doneButtonText}>{'Done'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default WrongAnswerModal;
