import { call, put } from "redux-saga/effects";
import { googleLogin, login, signUp, changePassword } from "../Api";
import {
  CHANGE_PASSWORD_SUCCESSFUL,
  CHANGE_PASSWORD_ERROR,
  GOOGLE_LOGIN_SUCCESSFUL,
  LOGIN_ERROR,
  LOGIN_SUCCESSFUL,
  SIGNUP_ERROR,
  SIGNUP_SUCCESSFUL,
} from "../actions/authActions";

export function* signupSaga(action) {
  try {
    const res = yield call(signUp, action.data);
    const status = res.status;
    const data = res.data;
    if (status === 200) {
      yield put({ type: SIGNUP_SUCCESSFUL, data });
      action.callBack({ status, data });
    } else {
      yield put({ type: LOGIN_SUCCESSFUL, data });
      action.callBack(res);
    }
  } catch (error) {
    yield put({ type: SIGNUP_ERROR, error });
    action.callBack(error);
  }
}

export function* loginSaga(action) {
  try {
    const res = yield call(login, action.data);
    const status = res.status;
    const data = res.data;
    if (status === 200) {
      yield put({ type: LOGIN_SUCCESSFUL, data });
      action.callBack({ status, data });
    } else {
      yield put({ type: LOGIN_ERROR, data });
      action.callBack(res);
    }
  } catch (error) {
    yield put({ type: LOGIN_ERROR, error });
    action.callBack(error);
  }
}

export function* googleLoginSaga(action) {
  try {
    const res = yield call(googleLogin, action.data);
    const status = res.status;
    const data = res.data;
    if (status === 200) {
      yield put({ type: GOOGLE_LOGIN_SUCCESSFUL, data });
      action.callBack({ status, data });
    } else {
      yield put({ type: LOGIN_ERROR, data });
      action.callBack(res);
    }
  } catch (error) {
    yield put({ type: LOGIN_ERROR, error });
    action.callBack(error);
  }
}

export function* changePasswordSaga(action) {
  try {
    const res = yield call(changePassword, action.data);
    const status = res.status;
    const data = res.data;
    if (status === 200) {
      yield put({ type: CHANGE_PASSWORD_SUCCESSFUL, data });
      action.callBack({ status, data });
    } else {
      yield put({ type: CHANGE_PASSWORD_ERROR, data });
      action.callBack(res);
    }
  } catch (error) {
    yield put({ type: CHANGE_PASSWORD_ERROR, error });
    action.callBack(error);
  }
}
