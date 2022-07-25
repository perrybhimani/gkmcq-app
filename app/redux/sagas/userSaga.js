import { call, put } from 'redux-saga/effects';
import {
  getUserProfile,
  getUserProgress,
  updateUser,
  getDailyStreak,
  getLeaderBoardData,
  submitFeedback,
  getLearningProgress
} from '../Api';
import {
  GET_USER_PROFILE_ERROR,
  GET_USER_PROFILE_SUCCESSFUL,
  GET_USER_PROGRESS_ERROR,
  GET_USER_PROGRESS_SUCCESSFUL,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESSFUL,
  GET_DAILY_STREAK_SUCCESSFUL,
  GET_DAILY_STREAK_ERROR,
  GET_LEADER_BOARD_DATA_SUCCESSFUL,
  GET_LEADER_BOARD_DATA_ERROR,
  SUBMIT_FEEDBACK_ERROR,
  SUBMIT_FEEDBACK_SUCCESSFUL,
  GET_LEARNING_PROGRESS_SUCCESSFUL,
  GET_LEARNING_PROGRESS_ERROR
} from '../actions/userActions';

export function* getUserProgressSaga(action) {
  try {
    const res = yield call(getUserProgress, action.section);
    const status = res.status;
    const data = res.data;
    if (status === 200) {
      yield put({ type: GET_USER_PROGRESS_SUCCESSFUL, data });
      action.callBack({ status, data });
    } else {
      yield put({ type: GET_USER_PROGRESS_ERROR, data });
      action.callBack(res);
    }
  } catch (error) {
    yield put({ type: GET_USER_PROGRESS_ERROR, error });
    action.callBack(error);
  }
}

export function* getUserProfileSaga(action) {
  try {
    const res = yield call(getUserProfile);
    const status = res.status;
    const data = res.data;
    if (status === 200) {
      yield put({ type: GET_USER_PROFILE_SUCCESSFUL, data });
      action.callBack({ status, data });
    } else {
      yield put({ type: GET_USER_PROFILE_ERROR, data });
      action.callBack(res);
    }
  } catch (error) {
    yield put({ type: GET_USER_PROFILE_ERROR, error });
    action.callBack(error);
  }
}

export function* updateUserSaga(action) {
  try {
    const res = yield call(updateUser, action.userId, action.data);
    const status = res.status;
    const data = res.data;
    if (status === 200) {
      yield put({ type: UPDATE_USER_SUCCESSFUL, data });
      action.callBack({ status, data });
    } else {
      yield put({ type: UPDATE_USER_ERROR, data });
      action.callBack(res);
    }
  } catch (error) {
    yield put({ type: UPDATE_USER_ERROR, error });
    action.callBack(error);
  }
}

export function* getDailyStreakSaga(action) {
  try {
    const res = yield call(getDailyStreak, action.date);
    const status = res.status;
    const data = res.data;
    if (status === 200) {
      yield put({ type: GET_DAILY_STREAK_SUCCESSFUL, data });
      action.callBack({ status, data });
    } else {
      yield put({ type: GET_DAILY_STREAK_ERROR, data });
      action.callBack(res);
    }
  } catch (error) {
    yield put({ type: GET_DAILY_STREAK_ERROR, error });
    action.callBack(error);
  }
}

export function* getLeaderBoardDataSaga(action) {
  try {
    const res = yield call(getLeaderBoardData, action.timePeriod);
    const status = res.status;
    const data = res.data;
    if (status === 200) {
      yield put({ type: GET_LEADER_BOARD_DATA_SUCCESSFUL, data });
      action.callBack({ status, data });
    } else {
      yield put({ type: GET_LEADER_BOARD_DATA_ERROR, data });
      action.callBack(res);
    }
  } catch (error) {
    yield put({ type: GET_LEADER_BOARD_DATA_ERROR, error });
    action.callBack(error);
  }
}

export function* submitFeedbackSaga(action) {
  try {
    const res = yield call(submitFeedback, action.data);
    const status = res.status;
    const data = res.data;
    if (status === 200) {
      yield put({ type: SUBMIT_FEEDBACK_SUCCESSFUL, data });
      action.callBack({ status, data });
    } else {
      yield put({ type: SUBMIT_FEEDBACK_ERROR, data });
      action.callBack(res);
    }
  } catch (error) {
    yield put({ type: SUBMIT_FEEDBACK_ERROR, error });
    action.callBack(error);
  }
}
export function* getLearningProgressSaga(action) {
  try {
    const res = yield call(getLearningProgress, action.timePeriod);
    const status = res.status;
    const data = res.data;
    if (status === 200) {
      yield put({ type: GET_LEARNING_PROGRESS_SUCCESSFUL, data });
      action.callBack({ status, data });
    } else {
      yield put({ type: GET_LEARNING_PROGRESS_ERROR, data });
      action.callBack(res);
    }
  } catch (error) {
    yield put({ type: GET_LEARNING_PROGRESS_ERROR, error });
    action.callBack(error);
  }
}
