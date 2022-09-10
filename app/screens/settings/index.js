import { React, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Platform,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import * as Icons from '../../constants/svg';
import * as Colors from './../../themes/colors';
import * as screens from '../../constants/screens';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
  getResponsiveFontSize,
  isIphoneXorAbove,
} from '../../utils/scalingUtils';
import { Header } from '../../components/Header';
import { TextInput } from '../../components/TextInput';
import { setting, editProfile, notifications } from '../../constants/strings';
import * as Fonts from '../../themes/fonts';
import { Button } from '../../components/Button';
import { CustomSwitch } from '../../components/Switch';
import { Formik } from 'formik';
import {
  ChangePasswordSchema,
  EditProfileSchema,
} from '../../utils/validationSchemas';
import { connect } from 'react-redux';
import { REQUEST_UPDATE_USER } from '../../redux/actions/userActions';
import { REQUEST_CHANGE_PASSWORD } from '../../redux/actions/authActions';
import { clearToken, clearUser } from '../../utils/storageUtils';
import { resetRoute } from '../../utils/navigationUtils';
import idx from 'idx';

function SettingScreen(props) {
  const [allNotification, setAllNotification] = useState(false);
  // const [emailNotification, setEmailNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPasswordPlaceholder, setCurrentPasswordPlaceholder] = useState(
    setting.YOUR_CURRENT
  );
  const [newPasswordPlaceholder, setNewPasswordPlaceholder] = useState(
    setting.YOUR_NEW
  );
  const [confirmPasswordPlaceholder, setConfirmPasswordPlaceholder] = useState(
    setting.CONFIRM_PASSWORD
  );
  const [namePlaceholder, setNamePlaceholder] = useState(
    editProfile.NAME_PLACEHOLDER
  );
  const [emailPlaceholder, setEmailPlaceholder] = useState(
    editProfile.EMAIL_PLACEHOLDER
  );
  const [openEditProfile, setEditProfile] = useState(true);
  const [openChangePass, setChangePass] = useState(false);
  const [openNotification, setNotification] = useState(false);
  const { navigation, route } = props;
  const userId = idx(route, (_) => _.params.id);

  useEffect(() => {
    const enableNotification = idx(route, (_) => _.params.enableNotification);
    console.log('enable', enableNotification);
    setAllNotification(enableNotification);
  }, []);

  const onLogout = async () => {
    await clearToken();
    await clearUser();
    resetRoute(navigation, screens.LOGIN);
  };

  const onPressSave = (values) => {
    setIsLoading(true);
    const data = {
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    };
    props.changePassword(data, (resp) => {
      setIsLoading(false);
      if (resp.status === 200) {
        onLogout();
      } else {
        Alert.alert(resp.message);
      }
    });
  };

  const onPressEdit = (values) => {
    setIsLoading(true);
    const data = {};
    if (values.name !== route.params.name) data.name = values.name;
    if (values.email !== route.params.email) data.email = values.email;
    props.updateUser(route.params.id, data, (resp) => {
      setIsLoading(false);
      if (resp.status === 200) {
        if (data.email) {
          onLogout();
        } else navigation.navigate(screens.PROFILE);
      } else {
        Alert.alert(resp.message);
      }
    });
  };

  const keyboardDisappear = () => {
    Keyboard.dismiss();
    setCurrentPasswordPlaceholder(setting.YOUR_CURRENT);
    setNewPasswordPlaceholder(setting.YOUR_NEW);
    setConfirmPasswordPlaceholder(setting.CONFIRM_PASSWORD);
    setNamePlaceholder(editProfile.NAME_PLACEHOLDER);
    setEmailPlaceholder(editProfile.EMAIL_PLACEHOLDER);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => keyboardDisappear()}
      accessible={false}
    >
      <View style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps={'always'}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContentContainer}
        >
          <Header
            title='Settings'
            leftIconPress={() => navigation.navigate(screens.PROFILE)}
            rightIconPress={() => navigation.navigate(screens.NOTIFICATION)}
          />
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              style={[
                styles.buttonStyle,
                {
                  backgroundColor: openEditProfile
                    ? Colors.THICK_GRAY
                    : Colors.SKY_BLUE,
                },
              ]}
              onPress={async () => {
                setEditProfile(true);
                setChangePass(false);
                setNotification(false);
              }}
            >
              <Text
                style={[
                  styles.buttonText,
                  { color: openEditProfile ? Colors.WHITE : Colors.BLACK },
                ]}
              >
                Edit Profile
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttonStyle,
                {
                  backgroundColor: openChangePass
                    ? Colors.THICK_GRAY
                    : Colors.SKY_BLUE,
                },
              ]}
              onPress={async () => {
                setEditProfile(false);
                setChangePass(true);
                setNotification(false);
              }}
            >
              <Text
                style={[
                  styles.buttonText,
                  { color: openChangePass ? Colors.WHITE : Colors.BLACK },
                ]}
              >
                Change Password
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttonStyle,
                {
                  backgroundColor: openNotification
                    ? Colors.THICK_GRAY
                    : Colors.SKY_BLUE,
                },
              ]}
              onPress={async () => {
                setEditProfile(false);
                setChangePass(false);
                setNotification(true);
              }}
            >
              <Text
                style={[
                  styles.buttonText,
                  { color: openNotification ? Colors.WHITE : Colors.BLACK },
                ]}
              >
                Notification
              </Text>
            </TouchableOpacity>
          </View>
          {openEditProfile ? (
            <Formik
              initialValues={{
                name: route.params.name,
                email: route.params.email,
              }}
              validationSchema={EditProfileSchema}
              validateOnBlur={false}
              validateOnChange={false}
              onSubmit={onPressEdit}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <TouchableWithoutFeedback
                  onPress={() => keyboardDisappear()}
                  accessible={false}
                >
                  <View style={styles.container}>
                    <ScrollView
                      keyboardShouldPersistTaps={'always'}
                      showsVerticalScrollIndicator={false}
                      contentContainerStyle={styles.scrollContentContainer}
                    >
                      <View style={styles.editMainContainer}>
                        <Text style={styles.textStyle}>
                          {editProfile.EDIT_PROFILE}
                        </Text>
                        <TextInput
                          showLeftIcon
                          leftIcon={Icons.USER_ICON}
                          error={errors.name}
                          isHollow
                          title={editProfile.NAME}
                          textInputProps={{
                            placeholder: namePlaceholder,
                            onChangeText: handleChange('name'),
                            value: values.name,
                            onFocus: () => {
                              setNamePlaceholder('');
                              setEmailPlaceholder(
                                editProfile.EMAIL_PLACEHOLDER
                              );
                            },
                          }}
                          inputWrapperStyle={styles.inputMargin}
                          inputStyle={styles.inputStyle}
                        />
                        <TextInput
                          showLeftIcon
                          leftIcon={Icons.MAIL_ICON}
                          error={errors.email}
                          isHollow
                          title={editProfile.EMAILID}
                          textInputProps={{
                            placeholder: emailPlaceholder,
                            onChangeText: handleChange('email'),
                            value: values.email,
                            keyboardType: 'email-address',
                            onFocus: () => {
                              setEmailPlaceholder('');
                              setNamePlaceholder(editProfile.NAME_PLACEHOLDER);
                            },
                          }}
                          inputWrapperStyle={styles.inputMargin}
                          inputStyle={styles.inputStyle}
                        />
                        <View style={styles.buttonContainer}>
                          <Button
                            onPress={() => handleSubmit()}
                            title={editProfile.SAVE}
                            wrapperStyle={styles.saveButton}
                            titleStyle={styles.saveButtonText}
                            isLoading={isLoading}
                          />
                        </View>
                      </View>
                    </ScrollView>
                  </View>
                </TouchableWithoutFeedback>
              )}
            </Formik>
          ) : null}
          {openChangePass ? (
            <Formik
              initialValues={{
                currentPassword: '',
                newPassword: '',
                confirmNewPassword: '',
              }}
              validationSchema={ChangePasswordSchema}
              validateOnBlur={false}
              validateOnChange={false}
              onSubmit={onPressSave}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <TouchableWithoutFeedback
                  onPress={() => keyboardDisappear()}
                  accessible={false}
                >
                  <View style={styles.container}>
                    <ScrollView
                      keyboardShouldPersistTaps={'always'}
                      showsVerticalScrollIndicator={false}
                      contentContainerStyle={styles.scrollContentContainer}
                    >
                      <View style={styles.mainContainer}>
                        <Text style={styles.textStyle}>
                          {setting.CHANGE_PASSWORD}
                        </Text>
                        <TextInput
                          showLeftIcon
                          error={errors.currentPassword}
                          leftIcon={Icons.LOCK}
                          isHollow
                          title={setting.CURRENT}
                          textInputProps={{
                            placeholder: currentPasswordPlaceholder,
                            onChangeText: handleChange('currentPassword'),
                            value: values.currentPassword,
                            onFocus: () => {
                              setNewPasswordPlaceholder(setting.YOUR_NEW);
                              setConfirmPasswordPlaceholder(
                                setting.CONFIRM_PASSWORD
                              );
                              setCurrentPasswordPlaceholder('');
                            },
                          }}
                          inputWrapperStyle={styles.inputMargin}
                          inputStyle={styles.inputStyle}
                        />
                        <TextInput
                          showLeftIcon
                          error={errors.newPassword}
                          leftIcon={Icons.LOCK}
                          isHollow
                          title={setting.NEW_PASSWORD}
                          textInputProps={{
                            placeholder: confirmPasswordPlaceholder,
                            onChangeText: handleChange('confirmNewPassword'),
                            value: values.confirmNewPassword,
                            onFocus: () => {
                              setNewPasswordPlaceholder(setting.YOUR_NEW);
                              setConfirmPasswordPlaceholder('');
                              setCurrentPasswordPlaceholder(
                                setting.YOUR_CURRENT
                              );
                            },
                          }}
                          inputWrapperStyle={styles.inputMargin}
                          inputStyle={styles.inputStyle}
                        />
                        <TextInput
                          showLeftIcon
                          error={errors.confirmNewPassword}
                          leftIcon={Icons.LOCK}
                          isHollow
                          title={setting.CONFIRM_PASSWORD}
                          textInputProps={{
                            placeholder: newPasswordPlaceholder,
                            onChangeText: handleChange('newPassword'),
                            value: values.newPassword,
                            onFocus: () => {
                              setNewPasswordPlaceholder('');
                              setConfirmPasswordPlaceholder(
                                setting.CONFIRM_PASSWORD
                              );
                              setCurrentPasswordPlaceholder(
                                setting.YOUR_CURRENT
                              );
                            },
                          }}
                          inputWrapperStyle={styles.inputMargin}
                          inputStyle={styles.inputStyle}
                        />
                        <View style={styles.buttonContainer}>
                          <Button
                            onPress={() => handleSubmit()}
                            title={setting.CHANGE}
                            wrapperStyle={styles.passwordButton}
                            titleStyle={styles.saveButtonText}
                            isLoading={isLoading}
                          />
                        </View>
                      </View>
                    </ScrollView>
                  </View>
                </TouchableWithoutFeedback>
              )}
            </Formik>
          ) : null}
          {openNotification ? (
            <View style={styles.bottomContainer}>
              <Text style={styles.textStyle}>{notifications.NOTIFICATION}</Text>
              <View style={styles.switchContainer}>
                <Text style={styles.subTextStyle}>
                  {setting.ENABLE_NOTIFICATION}
                </Text>
                <CustomSwitch
                  value={allNotification}
                  onValueChange={() => {
                    const data = { enableNotification: !allNotification };
                    props.updateUser(userId, data, (resp) => {
                      if (resp.status === 200) {
                        setAllNotification(!allNotification);
                      } else {
                        Alert.alert(resp.message);
                      }
                    });
                  }}
                />
              </View>
              {/* <View style={styles.switchContainer}>
              <Text style={styles.subTextStyle}>
                {setting.EMAIL_NOTIFICATION}
              </Text>
              <CustomSwitch
                value={emailNotification}
                onValueChange={() => setEmailNotification(!emailNotification)}
              />
            </View> */}
            </View>
          ) : null}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    changePassword: (data, callBack) =>
      dispatch({ type: REQUEST_CHANGE_PASSWORD, data, callBack }),
    updateUser: (userId, data, callBack) =>
      dispatch({ type: REQUEST_UPDATE_USER, userId, data, callBack }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen);

const styles = StyleSheet.create({
  buttonText: {
    fontSize: responsiveFontSize(2.2),
    fontFamily: Fonts.NUNITO_SEMI_BOLD,
  },
  buttonStyle: {
    // marginHorizontal: responsiveHeight(3.5),
    marginBottom: responsiveHeight(2.5),
    marginRight: responsiveWidth(3),
    width: responsiveWidth(54),
    minHeight:
      Platform.OS === 'ios'
        ? isIphoneXorAbove()
          ? responsiveHeight(50)
          : responsiveHeight(52)
        : responsiveHeight(6),
    borderRadius: responsiveHeight(3),
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    paddingVertical: responsiveHeight(1.3),
    // paddingHorizontal: responsiveWidth(4),
    alignItems: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveHeight(2),
  },
  container: {
    flex: 1,
    backgroundColor: Colors.SKY_BLUE,
  },
  scrollContentContainer: {
    paddingBottom: responsiveHeight(15),
    flexGrow: 1,
  },
  inputMargin: {
    backgroundColor: Colors.THICK_GRAY,
    borderColor: Colors.BLACK,
    borderWidth: 0.5,
  },
  inputStyle: {
    color: Colors.WHITE,
  },
  textStyle: {
    fontFamily: Fonts.NUNITO_SEMI_BOLD,
    fontSize: responsiveFontSize(2),
    marginVertical: responsiveHeight(1),
    marginBottom: responsiveHeight(2),
    color: Colors.BLACK,
  },
  mainContainer: {
    marginHorizontal: responsiveHeight(3.5),
    marginTop: responsiveHeight(1),
    minHeight:
      Platform.OS === 'ios'
        ? isIphoneXorAbove()
          ? responsiveHeight(50)
          : responsiveHeight(52)
        : responsiveHeight(52.5),
    borderRadius: responsiveHeight(1),
    backgroundColor: Colors.SKY_BLUE,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(4),
  },
  editMainContainer: {
    marginHorizontal: responsiveHeight(3.5),
    marginTop: responsiveHeight(1),
    minHeight:
      Platform.OS === 'ios'
        ? isIphoneXorAbove()
          ? responsiveHeight(50)
          : responsiveHeight(52)
        : responsiveHeight(42),
    borderRadius: responsiveHeight(1),
    backgroundColor: Colors.SKY_BLUE,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(4),
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  saveButton: {
    flexDirection: 'row',
    height: responsiveHeight(7.5),
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveHeight(2),
    width: responsiveWidth(40),
    height: responsiveHeight(5.5),
    fontFamily: Fonts.NUNITO_BOLD,
  },
  passwordButton: {
    flexDirection: 'row',
    height: responsiveHeight(7.5),
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveHeight(2),
    width: responsiveWidth(44),
    height: responsiveHeight(5.5),
    fontFamily: Fonts.NUNITO_BOLD,
  },
  gradientContainer: {
    height: '100%',
    width: '100%',
    borderRadius: 30,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    fontSize: getResponsiveFontSize(16),
    includeFontPadding: false,
    color: Colors.BLACK,
    marginHorizontal: responsiveWidth(2),
  },
  bottomContainer: {
    marginHorizontal: responsiveHeight(3.5),
    marginTop: responsiveHeight(1.5),
    height: responsiveHeight(16),
    borderRadius: responsiveHeight(1),
    backgroundColor: Colors.SKY_BLUE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.35,
    shadowRadius: 5.5,
    elevation: 9,
    padding: responsiveWidth(4),
  },
  subTextStyle: {
    fontSize: responsiveFontSize(1.2),
    fontFamily: Fonts.NUNITO_REGULAR,
    color: Colors.BLACK,
    includeFontPadding: false,
  },
});
