import { takeLatest } from 'redux-saga/effects';
import {
  REQUEST_GOOGLE_LOGIN,
  REQUEST_LOGIN,
  REQUEST_SIGNUP,
  REQUEST_CHANGE_PASSWORD,
} from '../actions/authActions';
import {
  REQUEST_GET_HINT_BY_QUESTION,
  REQUEST_GET_QUESTION_BY_ID,
  REQUEST_GET_SELECTED_QUESTIONID,
  REQUEST_GET_SELECTED_TOPICID,
  REQUEST_LIST_QUESTIONS,
  REQUEST_SUBMIT_QUESTION,
} from '../actions/questionActions';
import {
  REQUEST_GET_USER_PROFILE,
  REQUEST_GET_USER_PROGRESS,
  REQUEST_UPDATE_USER,
  REQUEST_GET_DAILY_STREAK,
  REQUEST_GET_LEADER_BOARD_DATA,
  REQUEST_SUBMIT_FEEDBACK,
  REQUEST_GET_LEARNING_PROGRESS
} from '../actions/userActions';
import {
  googleLoginSaga,
  loginSaga,
  signupSaga,
  changePasswordSaga,
} from './authSaga';
import {
  getHintByQuestionSaga,
  getQuestionByIdSaga,
  getSelectedQuestionIdSaga,
  getSelectedTopicIdSaga,
  listQuestionsSaga,
  submitQuestionSaga,
} from './questionSaga';
import {
  getUserProfileSaga,
  getUserProgressSaga,
  updateUserSaga,
  getDailyStreakSaga,
  getLeaderBoardDataSaga,
  submitFeedbackSaga,
  getLearningProgressSaga
} from './userSaga';

export function* watcherSaga() {
  yield takeLatest(REQUEST_SIGNUP, signupSaga);
  yield takeLatest(REQUEST_LOGIN, loginSaga);
  yield takeLatest(REQUEST_GOOGLE_LOGIN, googleLoginSaga);
  yield takeLatest(REQUEST_GET_USER_PROGRESS, getUserProgressSaga);
  yield takeLatest(REQUEST_GET_USER_PROFILE, getUserProfileSaga);
  yield takeLatest(REQUEST_UPDATE_USER, updateUserSaga);
  yield takeLatest(REQUEST_CHANGE_PASSWORD, changePasswordSaga);
  yield takeLatest(REQUEST_GET_DAILY_STREAK, getDailyStreakSaga);
  yield takeLatest(REQUEST_GET_LEADER_BOARD_DATA, getLeaderBoardDataSaga);
  yield takeLatest(REQUEST_LIST_QUESTIONS, listQuestionsSaga);
  yield takeLatest(REQUEST_GET_QUESTION_BY_ID, getQuestionByIdSaga);
  yield takeLatest(REQUEST_GET_SELECTED_TOPICID, getSelectedTopicIdSaga);
  yield takeLatest(REQUEST_GET_SELECTED_QUESTIONID, getSelectedQuestionIdSaga);
  yield takeLatest(REQUEST_SUBMIT_QUESTION, submitQuestionSaga);
  yield takeLatest(REQUEST_SUBMIT_FEEDBACK, submitFeedbackSaga);
  yield takeLatest(REQUEST_GET_HINT_BY_QUESTION, getHintByQuestionSaga);
  yield takeLatest(REQUEST_GET_LEARNING_PROGRESS, getLearningProgressSaga);
}
