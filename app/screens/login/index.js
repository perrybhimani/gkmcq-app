import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground
} from 'react-native';
import { resetRoute } from '../../utils/navigationUtils';
import * as screens from '../../constants/screens';
import { Formik } from 'formik';
import {
  deviceWidth,
  getResponsiveFontSize,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/scalingUtils';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput } from '../../components/TextInput';
import { Button } from '../../components/Button';
import { AppImages } from '../../assets/images';
import { login, signup } from '../../constants/strings';
import { SocialButton } from '../../components/SocialButton';
import * as Colors from './../../themes/colors';
import * as Icons from '../../constants/svg';
import { SvgXml } from 'react-native-svg';
import * as Fonts from './../../themes/fonts';
import { connect } from 'react-redux';
import { LoginSchema } from '../../utils/validationSchemas';
import {
  REQUEST_GOOGLE_LOGIN,
  REQUEST_LOGIN,
} from '../../redux/actions/authActions';
import idx from 'idx';

const Login = (props) => {
  const { navigation } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [emailPlaceholder, setEmailPlaceholder] = useState(signup.YOUREMAIL);
  const [passwordPlaceholder, setPassPlaceholder] = useState(login.PASSWORD);

  const onPressLogin = (values) => {
    setIsLoading(true);
    const data = {
      ...values,
    };
    props.login(data, (resp) => {
      setIsLoading(false);
      if (resp.status === 200) {
        const loginData = idx(resp, (_) => _.data) || null;
        const userID = idx(loginData, (_) => _._id) || null;
        // if (userID) {
        //   OneSignal.setExternalUserId(userID);
        // }
        resetRoute(navigation, screens.TAB_CONTAINER);
      } else {
        Alert.alert(resp.message);
      }
    });
  };

  const keyboardDisappear = () => {
    Keyboard.dismiss();
    setPassPlaceholder(login.PASSWORD);
    setEmailPlaceholder(signup.YOUREMAIL);
  };

  const handleGoogleLogin = () => {
    props.googleLogin();
  };
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={LoginSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={onPressLogin}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <TouchableWithoutFeedback
          onPress={() => keyboardDisappear()}
          accessible={false}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: Colors.BLUE,
            }}
          >
            <Image
              style={styles.absolute}
              source={AppImages.background}
              resizeMode={'cover'}
            />
          {/* <ImageBackground source={AppImages.background} resizeMode="cover" style={styles.image} > */}
            {/* <Image style={styles.absolute} source={AppImages.background} /> */}
            <View style={{ flex: 1 }}>
              <KeyboardAwareScrollView
                keyboardShouldPersistTaps={'always'}
                contentContainerStyle={styles.keyboardAware}
              >
                <View style={styles.innerContainer}>
                  <View style={styles.titleContainer}>
                    {/* <SvgXml xml={Icons.TITLE} style={styles.titleIcon} /> */}
                    <Text style={styles.screenTitle}>
                      {signup.LOGIN}
                    </Text>
                  </View>
                  <View style={styles.contentContainer}>
                    <TextInput
                      showLeftIcon
                      leftIcon={Icons.MAIL}
                      error={errors.email}
                      isHollow
                      title={signup.EMAIL}
                      isLightMode
                      textInputProps={{
                        placeholder: emailPlaceholder,
                        onChangeText: handleChange('email'),
                        value: values.email,
                        onFocus: () => {
                          setEmailPlaceholder('');
                          setPassPlaceholder(login.PASSWORD);
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
                        },
                      }}
                      wrapperStyle={styles.inputMargin}
                    />
                    <View style={styles.buttonContainer}>
                      <Button
                        title={signup.LOGIN}
                        onPress={() => handleSubmit()}
                        wrapperStyle={styles.loginButton}
                        titleStyle={styles.loginButtonText}
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
                      onPress={handleGoogleLogin}
                    />
                  </View> */}
                    <View style={styles.loginButtonContainer}>
                      <Text style={styles.alreadyMemberText}>
                        {login.DONT_HAVE_ACCOUNT}{' '}
                        <Text
                          style={styles.loginLink}
                          onPress={() => {
                            resetRoute(navigation, screens.SIGNUP);
                          }}
                        >
                          {signup.SIGNUP}
                        </Text>
                      </Text>
                    </View>
                  </View>
                </View>
              </KeyboardAwareScrollView>
              </View>
              {/* </ImageBackground> */}
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
    login: (data, callBack) =>
      dispatch({ type: REQUEST_LOGIN, data, callBack }),
    googleLogin: (callBack) =>
      dispatch({ type: REQUEST_GOOGLE_LOGIN, callBack }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
    image: {
    flex: 1,
    justifyContent: "center"
  },
  titleIcon: {
    marginTop: responsiveHeight(3),
    minWidth: responsiveWidth(10),
    minHeight: responsiveWidth(10),
    maxWidth: responsiveWidth(10),
    maxHeight: responsiveWidth(10),
    // position: 'absolute',
    // top: ' -70%',
  },
  absolute: {
    position: 'absolute',
    height: responsiveHeight(100),
    width: responsiveWidth(100),
  },
  gradientContainer: {
    height: '100%',
    width: '100%',
    borderRadius: 30,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    fontSize: getResponsiveFontSize(14),
    // fontFamily:
    //   Platform.OS === 'ios'
    //     ? Fonts.IBM_PLEX_SANS_BOLD
    //     : Fonts.IBM_PLEX_SANS_SEMI_BOLD,
    includeFontPadding: false,
    color: Colors.BLACK,
    marginHorizontal: responsiveWidth(2),
  },
  loginButton: {
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
  loginLink: {
    color: Colors.BLACK,
    textDecorationLine: 'underline',
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
    marginTop: responsiveHeight(3),
    zIndex: 1,
    flex: 1,
  },
  inputMargin: {
    marginTop: responsiveHeight(0.5),
    color: Colors.BLACK
  },
  titleContainer: {
    marginTop: Platform.OS === 'ios' ? responsiveHeight(2.5) : 0,
    display: 'flex',
    alignItems: 'center',
    width: deviceWidth,
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  // signupButton: {
  //   marginTop: responsiveHeight(1),
  //   width: responsiveWidth(50),
  //   height: responsiveHeight(6),
  // },
  screenTitle: {
    marginTop: responsiveHeight(16),
    fontSize: getResponsiveFontSize(23),
    color: Colors.DARK_YELLOW,
    fontFamily: Fonts.NUNITO_BOLD,
  },
  keyboardAware: {
    flex: 1,
    justifyContent: 'center',
  },
  contentContainer: {
    marginHorizontal: responsiveWidth(8),
    marginTop: responsiveHeight(1),
    flex: 1,
  },
  forgotContainer: {
    alignSelf: 'center',
    marginTop: responsiveHeight(5),
  },
});
