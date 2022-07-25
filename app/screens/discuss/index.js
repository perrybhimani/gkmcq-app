import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, Alert } from 'react-native';
import * as Colors from './../../themes/colors';
import * as screens from '../../constants/screens';
import {
  responsiveHeight,
  responsiveWidth,
  getResponsiveFontSize,
  responsiveFontSize,
} from '../../utils/scalingUtils';
import { Header } from '../../components/Header';
import { TextInput } from '../../components/TextInput';
import { discuss } from '../../constants/strings';
import * as Fonts from '../../themes/fonts';
import { Button } from '../../components/Button';
import { connect } from 'react-redux';
import { REQUEST_SUBMIT_FEEDBACK } from '../../redux/actions/userActions';
import { Formik } from 'formik';
import { FeedbackSchema } from '../../utils/validationSchemas';

function DiscussScreen(props) {
  const { navigation, route } = props;
  const questionId = route.params.questionId;
  const [isLoading, setIsLoading] = useState(false);

  const submitFeedback = (values) => {
    setIsLoading(true);
    const data = {
      comment: values.comment,
      questionId,
    };
    props.submitFeedback(data, (resp) => {
      setIsLoading(false);
      if (resp.status === 200) {
        navigation.navigate(screens.QUESTION_SCREEN, {
          selected: false,
        });
      } else {
        Alert.alert(resp.message);
      }
    });
  };
  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps={'always'}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContentContainer}
      >
        <Header
          title={discuss.DISCUSS}
          leftIconPress={() =>
            navigation.navigate(screens.QUESTION_SCREEN, {
              selected: false,
            })
          }
          rightIconPress={() => navigation.navigate(screens.NOTIFICATION)}
        />
        <Formik
          initialValues={{
            comment: '',
          }}
          validationSchema={FeedbackSchema}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={submitFeedback}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View style={styles.mainContainer}>
              <TextInput
                isHollow
                title={discuss.COMMENT}
                textInputProps={{
                  placeholder: discuss.COMMENT_PLACEHOLDER_TEXT,
                  onChangeText: handleChange('comment'),
                  value: values.comment,
                  multiline: true,
                }}
                inputWrapperStyle={styles.inputMargin}
                inputStyle={styles.inputStyle}
                error={errors.comment}
              />
              <Text style={styles.commentImportantText}>
                {discuss.COMMENT_IMPORTANT_TEXT}
              </Text>
              <Button
                onPress={() => handleSubmit()}
                title={discuss.POST}
                wrapperStyle={styles.postButton}
                titleStyle={styles.postButtonText}
                isLoading={isLoading}
              />
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitFeedback: (data, callBack) =>
      dispatch({ type: REQUEST_SUBMIT_FEEDBACK, data, callBack }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DiscussScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  scrollContentContainer: {
    paddingBottom: responsiveHeight(15),
    flexGrow: 1,
  },
  mainContainer: {
    marginHorizontal: responsiveHeight(3),
    marginTop: responsiveHeight(2),
    borderRadius: responsiveHeight(1),
    backgroundColor: Colors.WHITE,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    paddingVertical: responsiveWidth(5),
    alignItems: 'center',
  },
  inputMargin: {
    backgroundColor: Colors.WHITE,
    height: responsiveHeight(18),
    width: responsiveWidth(75),
    borderColor: Colors.BLACK,
    borderRadius: responsiveHeight(2),
    borderWidth: 0.5,
    paddingTop: responsiveHeight(1.3),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  inputStyle: {
    color: Colors.LIGHT_GRAY,
  },
  postButton: {
    flexDirection: 'row',
    height: responsiveHeight(7.5),
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveHeight(1),
    width: responsiveWidth(40),
    height: responsiveHeight(5.5),
    fontFamily: Fonts.NUNITO_BOLD,
  },
  postButtonText: {
    fontSize: getResponsiveFontSize(16),
    includeFontPadding: false,
    color: Colors.WHITE,
    marginHorizontal: responsiveWidth(2),
  },
  commentImportantText: {
    marginBottom: responsiveHeight(1.5),
    color: Colors.BLACK,
    fontSize: responsiveFontSize(1.6),
    fontFamily: Fonts.NUNITO_REGULAR,
  },
});
