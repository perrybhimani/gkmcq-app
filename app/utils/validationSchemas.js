import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Name required'),
  email: Yup.string()
    .email('Email must be a valid email address')
    .required('Email required'),
  password: Yup.string().required('Password required'),
});

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email must be a valid email address')
    .required('Email required'),
  password: Yup.string().required('Password required'),
});

const EditProfileSchema = Yup.object().shape({
  name: Yup.string().required('Name required'),
  email: Yup.string()
    .email('Email must be a valid email address')
    .required('Email required'),
});

const ChangePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Required'),
  newPassword: Yup.string().required('Required'),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], "Passwords don't match!")
    .required('Required'),
});

const FeedbackSchema = Yup.object().shape({
  comment: Yup.string().required('Comment required'),
});

export {
  SignupSchema,
  LoginSchema,
  EditProfileSchema,
  ChangePasswordSchema,
  FeedbackSchema,
};
