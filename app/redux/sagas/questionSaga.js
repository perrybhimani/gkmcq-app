import { call, put } from 'redux-saga/effects';
import {
  getHintByQuestion,
  getQuestionById,
  getSelectedTopicId,
  listQuestions,
  submitQuestion,
} from '../Api';
import {
  GET_HINT_BY_QUESTION_ERROR,
  GET_HINT_BY_QUESTION_SUCCESSFUL,
  GET_QUESTION_BY_ID_ERROR,
  GET_QUESTION_BY_ID_SUCCESSFUL,
  GET_SELECTED_QUESTIONID_SUCCESSFUL,
  GET_SELECTED_TOPICID_SUCCESSFUL,
  LIST_QUESTIONS_ERROR,
  LIST_QUESTIONS_SUCCESSFUL,
  SUBMIT_QUESTION_ERROR,
  SUBMIT_QUESTION_SUCCESSFUL,
} from '../actions/questionActions';
export function* listQuestionsSaga(action) {
  try {
    const res = yield call(listQuestions, action.topicId);
    const status = res.status;
    const data = res.data;
    if (status === 200) {
      yield put({ type: LIST_QUESTIONS_SUCCESSFUL, data });
      action.callBack({ status, data });
    } else {
      yield put({ type: LIST_QUESTIONS_ERROR, data });
      action.callBack(res);
    }
  } catch (error) {
    yield put({ type: LIST_QUESTIONS_ERROR, error });
    action.callBack(error);
  }
}

export function* getQuestionByIdSaga(action) {
  try {
    const res = yield call(getQuestionById, action.questionId);
    const status = res.status;
    const data = res.data;
    if (status === 200) {
      yield put({ type: GET_QUESTION_BY_ID_SUCCESSFUL, data });
      action.callBack({ status, data });
    } else {
      yield put({ type: GET_QUESTION_BY_ID_ERROR, data });
      action.callBack(res);
    }
  } catch (error) {
    yield put({ type: GET_QUESTION_BY_ID_ERROR, error });
    action.callBack(error);
  }
}

export function* getSelectedTopicIdSaga(action) {
  const topicId = action.topicId;
  yield put({ type: GET_SELECTED_TOPICID_SUCCESSFUL, topicId });
}

export function* getSelectedQuestionIdSaga(action) {
  const questionId = action.questionId;
  yield put({ type: GET_SELECTED_QUESTIONID_SUCCESSFUL, questionId });
}

export function* submitQuestionSaga(action) {
  try {
    const res = yield call(submitQuestion, action.data);
    const status = res.status;
    const data = res.data;
    if (status === 200) {
      yield put({ type: SUBMIT_QUESTION_SUCCESSFUL, data });
      action.callBack({ status, data });
    } else {
      yield put({ type: SUBMIT_QUESTION_ERROR, data });
      action.callBack(res);
    }
  } catch (error) {
    yield put({ type: SUBMIT_QUESTION_ERROR, error });
    action.callBack(error);
  }
}

export function* getHintByQuestionSaga(action) {
  try {
    const res = yield call(getHintByQuestion, action.questionId);
    const status = res.status;
    const data = res.data;
    if (status === 200) {
      yield put({ type: GET_HINT_BY_QUESTION_SUCCESSFUL, data });
      action.callBack({ status, data });
    } else {
      yield put({ type: GET_HINT_BY_QUESTION_ERROR, data });
      action.callBack(res);
    }
  } catch (error) {
    yield put({ type: GET_HINT_BY_QUESTION_ERROR, error });
    action.callBack(error);
  }
}
