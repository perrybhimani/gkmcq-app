import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { resetRoute } from '../../utils/navigationUtils';
import * as screens from '../../constants/screens';
import { Formik } from 'formik';
import {
  deviceWidth,
  getResponsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/scalingUtils';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput } from '../../components/TextInput';
import { Button } from '../../components/Button';
import { AppImages } from '../../assets/images';
import { signup } from '../../constants/strings';
import { SocialButton } from '../../components/SocialButton';
import * as Icons from '../../constants/svg';
import { SvgXml } from 'react-native-svg';
import * as Colors from './../../themes/colors';
import * as Fonts from './../../themes/fonts';
import { SignupSchema } from '../../utils/validationSchemas';
import { connect } from 'react-redux';
import { REQUEST_SIGNUP } from '../../redux/actions/authActions';
import Image from 'react-native-fast-image';

const SignUp = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailPlaceholder, setEmailPlaceholder] = useState(signup.YOUREMAIL);
  const [passwordPlaceholder, setPassPlaceholder] = useState(
    signup.CREATE_PASSWORD
  );
  const [namePlaceholder, setNamePlaceholder] = useState(signup.YOURNAME);
  const { navigation } = props;
  const onPressSignup = (values) => {
    setIsLoading(true);
    const data = {
      ...values,
    };
    props.signup(data, (resp) => {
      setIsLoading(false);
      if (resp.status === 200) {
        resetRoute(navigation, screens.LOGIN);
      } else {
        Alert.alert(resp.message);
      }
    });
  };
  const keyboardDisappear = () => {
    Keyboard.dismiss();
    setNamePlaceholder(signup.YOURNAME);
    setEmailPlaceholder(signup.YOUREMAIL);
    setPassPlaceholder(signup.CREATE_PASSWORD);
  };
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
      }}
      validationSchema={SignupSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={onPressSignup}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <TouchableWithoutFeedback
          onPress={() => keyboardDisappear()}
          accessible={false}
        >
          <View style={{ flex: 1, backgroundColor: Colors.BLUE }}>
            <Image
              style={styles.absolute}
              source={AppImages.background}
              resizeMode={'cover'}
            />
            <View style={{ flex: 1 }}>
              <KeyboardAwareScrollView
                keyboardShouldPersistTaps={'always'}
                contentContainerStyle={styles.keyboardAware}
              >
                <View style={styles.innerContainer}>
                  <View style={styles.titleContainer}>
                    {/* <SvgXml xml={Icons.TITLE} style={styles.titleIcon} /> */}
                    <Text style={styles.screenTitle}>{signup.SIGNUP}</Text>
                  </View>
                  <View style={styles.contentContainer}>
                    <TextInput
                      showLeftIcon
                      leftIcon={Icons.USER}
                      title={signup.NAME}
                      error={errors.name}
                      isHollow
                      isLightMode
                      textInputProps={{
                        placeholder: namePlaceholder,
                        onChangeText: handleChange('name'),
                        value: values.name,
                        onFocus: () => {
                          setEmailPlaceholder(signup.YOUREMAIL);
                          setPassPlaceholder(signup.CREATE_PASSWORD);
                          setNamePlaceholder('');
                        },
                      }}
                    />
                    <TextInput
                      showLeftIcon
                      leftIcon={Icons.MAIL}
                      error={errors.email}
                      isHollow
                      // isPassword
                      title={signup.EMAIL}
                      isLightMode
                      textInputProps={{
                        placeholder: emailPlaceholder,
                        onChangeText: handleChange('email'),
                        value: values.email,
                        onFocus: () => {
                          setEmailPlaceholder('');
                          setPassPlaceholder(signup.CREATE_PASSWORD);
                          setNamePlaceholder(signup.YOURNAME);
                        },
                        keyboardType: 'email-address',
                      }}
                      wrapperStyle={styles.inputMargin}
                    />
                    <TextInput
                      showLeftIcon
                      leftIcon={Icons.LOCK}
                      error={errors.password}
                      isHollow
                      isPassword
                      title={signup.PASSWORD}
                      isLightMode
                      textInputProps={{
                        placeholder: passwordPlaceholder,
                        onChangeText: handleChange('password'),
                        value: values.password,
                        onFocus: () => {
                          setEmailPlaceholder(signup.YOUREMAIL);
                          setPassPlaceholder('');
                          setNamePlaceholder(signup.YOURNAME);
                        },
                      }}
                      wrapperStyle={styles.inputMargin}
                    />
                    <View style={styles.buttonContainer}>
                      <Button
                        title={`${signup.SIGNUP.charAt(0)}${signup.SIGNUP.slice(
                          1
                        ).toLocaleLowerCase()}`}
                        onPress={() => handleSubmit()}
                        wrapperStyle={styles.signupButton}
                        titleStyle={styles.signupButtonText}
                        isLoading={isLoading}
                      />
                    </View>
                    {/* <View style={styles.dividerContainer}>
                    <View style={styles.divider}>
                      <View style={styles.dividerLine}></View>
                      <Text style={styles.dividerText}>{signup.OR}</Text>
                      <View
                        style={[styles.dividerLine, { marginLeft: 'auto' }]}
                      ></View>
                    </View>
                  </View>
                  <View style={styles.socialSignupContainer}>
                    <SocialButton
                      wrapperStyle={{ marginRight: 5 }}
                      icon={Icons.FACEBOOK}
                    />
                    <SocialButton
                      wrapperStyle={{ marginLeft: 5 }}
                      icon={Icons.GOOGLE}
                    />
                  </View> */}
                    <View style={styles.loginButtonContainer}>
                      <Text style={styles.alreadyMemberText}>
                        {signup.ALREADY_MEMBER}{' '}
                        <Text
                          style={styles.loginLink}
                          onPress={() => {
                            resetRoute(navigation, screens.LOGIN);
                          }}
                        >
                          {signup.LOGIN}
                        </Text>
                      </Text>
                    </View>
                  </View>
                </View>
              </KeyboardAwareScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}
    </Formik>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (data, callBack) =>
      dispatch({ type: REQUEST_SIGNUP, data, callBack }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

const styles = StyleSheet.create({
  signupButtonText: {
    fontSize: getResponsiveFontSize(14),
    includeFontPadding: false,
    color: Colors.BLACK,
    marginHorizontal: responsiveWidth(2),
  },
  gradientContainer: {
    height: '100%',
    width: '100%',
    borderRadius: 30,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleIcon: {
    marginTop: responsiveHeight(3),
    minWidth: responsiveWidth(10),
    minHeight: responsiveWidth(10),
    maxWidth: responsiveWidth(10),
    maxHeight: responsiveWidth(10),
  },
  loginLink: {
    color: Colors.BLACK,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    fontSize: getResponsiveFontSize(12),
    fontFamily: Fonts.NUNITO_BOLD,
  },
  alreadyMemberText: {
    color: Colors.BLACK,
    fontSize: getResponsiveFontSize(12),
  },
  loginButtonContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: responsiveHeight(3),
  },
  socialSignupContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  dividerLine: {
    backgroundColor: '#C9CAE6',
    height: responsiveHeight(0.2),
    width: '44%',
  },
  dividerText: {
    color: '#C9CAE6',
    marginLeft: 'auto',
    fontSize: getResponsiveFontSize(12),
    fontFamily: Fonts.NUNITO_REGULAR,
  },
  dividerContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: responsiveHeight(2),
    marginBottom: responsiveHeight(1.5),
  },
  divider: {
    width: responsiveWidth(50),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  innerContainer: {
    marginTop: responsiveHeight(1.5),
    zIndex: 1,
    flex: 1,
  },
  inputMargin: {
    marginTop: responsiveHeight(0.5),
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    width: deviceWidth,
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  signupButton: {
    flexDirection: 'row',
    height: responsiveHeight(7.5),
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveHeight(2),
    width: responsiveWidth(50),
    height: responsiveHeight(5.5),
    fontFamily: Fonts.NUNITO_REGULAR,
  },
  screenTitle: {
    marginTop: responsiveHeight(16),
    fontSize: getResponsiveFontSize(23),
    color: Colors.DARK_YELLOW,
    fontFamily: Fonts.NUNITO_BOLD,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: responsiveHeight(100),
    width: responsiveWidth(100),
  },
  keyboardAware: {
    flex: 1,
    justifyContent: 'center',
  },
  contentContainer: {
    marginHorizontal: responsiveWidth(8),
    marginTop: responsiveHeight(1.5),
    flex: 1,
  },
  forgotContainer: {
    alignSelf: 'center',
    marginTop: responsiveHeight(5),
  },
});
