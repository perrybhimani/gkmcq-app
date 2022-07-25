import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import * as Icons from '../../constants/svg';
import { responsiveHeight, responsiveWidth } from '../../utils/scalingUtils';
import { styles } from './style';

const CorrectAnswerModal = (props) => {
  const { display, onPress } = props;
  return (
    <View>
      <Modal transparent visible={display}>
        <View style={styles.container}>
          <View style={styles.modalContainer}>
            <View style={styles.modalIconContainer}>
              <SvgXml width={responsiveWidth(32)} height={responsiveHeight(25)} xml={Icons.CORRECT_ANSWER_MODAL} />
            </View>
            <View style={styles.modalTextContainer}>
              <Text style={styles.correctText}>CONGRATULATIONS</Text>
              <Text style={styles.subTextStyle}>Correct Answer!</Text>
              <TouchableOpacity
                style={styles.correctDoneButton}
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

export default CorrectAnswerModal;
