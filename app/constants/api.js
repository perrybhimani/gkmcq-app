import { common } from './strings';
const LOCAL_BASE_URL = 'https://gkmcq-backend.herokuapp.com';

const BASE_URL = LOCAL_BASE_URL;

const SIGNUP = `${BASE_URL}/auth/signUp`;
const LOGIN = `${BASE_URL}/auth/login`;
const GOOGLE_LOGIN = `${BASE_URL}/auth/socialLogin`;
const GET_USER_PROGRESS = `${BASE_URL}/user/getProgress`;
const GET_USER_PROFILE = `${BASE_URL}/user/getUserProfile`;
const UPDATE_USER = (userId) => `${BASE_URL}/user/updateUser/${userId}`;
const CHANGE_PASSWORD = `${BASE_URL}/user/changePassword`;
const GET_DAILY_STREAK = `${BASE_URL}/user/getDailyStreak`;
const GET_LEADER_BOARD_DATA = `${BASE_URL}/user/getLeaderBoardData`;
const LIST_QUESTIONS = (topicId) =>
  `${BASE_URL}/user/getQuestionList?topicId=${topicId}`;
const GET_QUESTION_BY_ID = (questionId) =>
  `${BASE_URL}/admin/getQuestionById/${questionId}`;
const SUBMIT_QUESTION = `${BASE_URL}/user/submitQuestion`;
const SUBMIT_FEEDBACK = `${BASE_URL}/user/submitFeedback`;
const GET_HINT_BY_QUESTION = (questionId) =>
  `${BASE_URL}/user/getHintByQuestion/${questionId}`;

const GET_LEARNING_PROGRESS = `${BASE_URL}/user/getLearningProgress`;
const DEFAULT_ERROR_RESPONSE = {
  status: 500,
  error: 'common_error',
  error_description: common.DEFAULT_ERROR_MESSAGE,
};

export {
  BASE_URL,
  DEFAULT_ERROR_RESPONSE,
  SIGNUP,
  LOGIN,
  GOOGLE_LOGIN,
  GET_USER_PROGRESS,
  GET_USER_PROFILE,
  UPDATE_USER,
  CHANGE_PASSWORD,
  GET_DAILY_STREAK,
  GET_LEADER_BOARD_DATA,
  LIST_QUESTIONS,
  GET_QUESTION_BY_ID,
  SUBMIT_QUESTION,
  SUBMIT_FEEDBACK,
  GET_HINT_BY_QUESTION,
  GET_LEARNING_PROGRESS
};
