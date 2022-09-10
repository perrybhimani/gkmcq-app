import axios from "axios";
import idx from "idx";
import {
  BASE_URL,
  CHANGE_PASSWORD,
  GET_USER_PROFILE,
  GET_USER_PROGRESS,
  GOOGLE_LOGIN,
  LOGIN,
  SIGNUP,
  UPDATE_USER,
  GET_DAILY_STREAK,
  GET_LEADER_BOARD_DATA,
  LIST_QUESTIONS,
  GET_QUESTION_BY_ID,
  SUBMIT_QUESTION,
  SUBMIT_FEEDBACK,
  GET_HINT_BY_QUESTION,
  GET_LEARNING_PROGRESS,
} from "../constants/api";
import { getToken, setToken } from "../utils/storageUtils";
import { common } from "../constants/strings";
import moment from "moment";

axios.defaults.baseURL = BASE_URL;

export async function signUp(data) {
  return axios
    .post(SIGNUP, data)
    .then((res) => {
      const responseData = idx(res, (_) => _.data.data) || {};
      const status = idx(res, (_) => _.status);
      const userToken = idx(responseData, (_) => _.token) || '';
      setToken(userToken);
      return { status, data: responseData };
    })
    .catch((error) => {
      const status = idx(error, (_) => _.response.status);
      const message =
        idx(error, (_) => _.response.data.message) ||
        common.DEFAULT_ERROR_MESSAGE;
      return { status, message };
    });
}

export async function login(credentials) {
  return axios
    .post(LOGIN, credentials)
    .then((res) => {
      const responseData = idx(res, (_) => _.data.data) || {};
      const status = idx(res, (_) => _.status);
      const userToken = idx(responseData, (_) => _.token) || "";
      setToken(userToken);
      return { status, data: responseData };
    })
    .catch((error) => {
      const status = idx(error, (_) => _.response.status);
      const message =
        idx(error, (_) => _.response.data.message) ||
        common.DEFAULT_ERROR_MESSAGE;
      return { status, message };
    });
}

export async function googleLogin(credentials) {
  return axios
    .post(GOOGLE_LOGIN,credentials)
    .then((res) => {
      const responseData = idx(res, (_) => _.data.data) || {};
      const status = idx(res, (_) => _.status);
      const userToken = idx(responseData, (_) => _.token) || "";
      setToken(userToken);
      return { status, data: responseData };
    })
    .catch((error) => {
      const status = idx(error, (_) => _.response.status);
      const message =
        idx(error, (_) => _.response.data.message) ||
        common.DEFAULT_ERROR_MESSAGE;
      return { status, message };
    });
}

export async function getUserProgress(section) {
  const token = await getToken();
  return axios
    .get(`${GET_USER_PROGRESS}?section=${section}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    })
    .then((res) => {
      const responseData = idx(res, (_) => _.data.data) || {};
      const status = idx(res, (_) => _.status);
      return { status, data: responseData };
    })
    .catch((error) => {
      const status = idx(error, (_) => _.response.status);
      const message =
        idx(error, (_) => _.response.data.message) ||
        common.DEFAULT_ERROR_MESSAGE;
      return { status, message };
    });
}

export async function getUserProfile() {
  const token = await getToken();
  return axios
    .get(GET_USER_PROFILE, {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    })
    .then((res) => {
      const responseData = idx(res, (_) => _.data.data) || {};
      const status = idx(res, (_) => _.status);
      return { status, data: responseData };
    })
    .catch((error) => {
      const status = idx(error, (_) => _.response.status);
      const message =
        idx(error, (_) => _.response.data.message) ||
        common.DEFAULT_ERROR_MESSAGE;
      return { status, message };
    });
}

export async function updateUser(id, data) {
  const token = await getToken();
  return axios
    .put(UPDATE_USER(id), data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    })
    .then((res) => {
      const responseData = idx(res, (_) => _.data.data) || {};
      const status = idx(res, (_) => _.status);
      return { status, data: responseData };
    })
    .catch((error) => {
      const status = idx(error, (_) => _.response.status);
      const message =
        idx(error, (_) => _.response.data.message) ||
        common.DEFAULT_ERROR_MESSAGE;
      return { status, message };
    });
}

export async function changePassword(data) {
  const token = await getToken();
  return axios
    .put(CHANGE_PASSWORD, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    })
    .then((res) => {
      const responseData = idx(res, (_) => _.data.data) || {};
      const status = idx(res, (_) => _.status);
      return { status, data: responseData };
    })
    .catch((error) => {
      const status = idx(error, (_) => _.response.status);
      const message =
        idx(error, (_) => _.response.data.message) ||
        common.DEFAULT_ERROR_MESSAGE;
      return { status, message };
    });
}

export async function getDailyStreak(date) {
  const token = await getToken();
  return axios
    .get(`${GET_DAILY_STREAK}?currentDate=${date}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    })
    .then((res) => {
      const responseData = idx(res, (_) => _.data.data) || {};
      const status = idx(res, (_) => _.status);
      return { status, data: responseData };
    })
    .catch((error) => {
      const status = idx(error, (_) => _.response.status);
      const message =
        idx(error, (_) => _.response.data.message) ||
        common.DEFAULT_ERROR_MESSAGE;
      return { status, message };
    });
}

export async function getLeaderBoardData(timePeriod) {
  const currentDate = moment().utc().format("YYYY-MM-DD");
  const token = await getToken();
  return axios
    .get(
      `${GET_LEADER_BOARD_DATA}?currentDate=${currentDate}&timePeriod=${timePeriod}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
      }
    )
    .then((res) => {
      const responseData = idx(res, (_) => _.data.data) || {};
      const status = idx(res, (_) => _.status);
      return { status, data: responseData };
    })
    .catch((error) => {
      const status = idx(error, (_) => _.response.status);
      const message =
        idx(error, (_) => _.response.data.message) ||
        common.DEFAULT_ERROR_MESSAGE;
      return { status, message };
    });
}

export async function listQuestions(topicId) {
  const token = await getToken();
  return axios
    .get(LIST_QUESTIONS(topicId), {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    })
    .then((res) => {
      const responseData = idx(res, (_) => _.data.data) || {};
      const status = idx(res, (_) => _.status);
      return { status, data: responseData };
    })
    .catch((error) => {
      const status = idx(error, (_) => _.response.status);
      const message =
        idx(error, (_) => _.response.data.message) ||
        common.DEFAULT_ERROR_MESSAGE;
      return { status, message };
    });
}

export async function getQuestionById(questionId) {
  const token = await getToken();
  return axios
    .get(GET_QUESTION_BY_ID(questionId), {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    })
    .then((res) => {
      const responseData = idx(res, (_) => _.data.data) || {};
      const status = idx(res, (_) => _.status);
      return { status, data: responseData };
    })
    .catch((error) => {
      const status = idx(error, (_) => _.response.status);
      const message =
        idx(error, (_) => _.response.data.message) ||
        common.DEFAULT_ERROR_MESSAGE;
      return { status, message };
    });
}

export async function submitQuestion(data) {
  const token = await getToken();
  return axios
    .post(SUBMIT_QUESTION, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    })
    .then((res) => {
      const responseData = idx(res, (_) => _.data.data) || {};
      const status = idx(res, (_) => _.status);
      return { status, data: responseData };
    })
    .catch((error) => {
      const status = idx(error, (_) => _.response.status);
      const message =
        idx(error, (_) => _.response.data.message) ||
        common.DEFAULT_ERROR_MESSAGE;
      return { status, message };
    });
}

export async function submitFeedback(data) {
  const token = await getToken();
  return axios
    .post(SUBMIT_FEEDBACK, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    })
    .then((res) => {
      const responseData = idx(res, (_) => _.data.data) || {};
      const status = idx(res, (_) => _.status);
      return { status, data: responseData };
    })
    .catch((error) => {
      const status = idx(error, (_) => _.response.status);
      const message =
        idx(error, (_) => _.response.data.message) ||
        common.DEFAULT_ERROR_MESSAGE;
      return { status, message };
    });
}

export async function getHintByQuestion(questionId) {
  const token = await getToken();
  return axios
    .get(GET_HINT_BY_QUESTION(questionId), {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    })
    .then((res) => {
      const responseData = idx(res, (_) => _.data.data) || {};
      const status = idx(res, (_) => _.status);
      return { status, data: responseData };
    })
    .catch((error) => {
      const status = idx(error, (_) => _.response.status);
      const message =
        idx(error, (_) => _.response.data.message) ||
        common.DEFAULT_ERROR_MESSAGE;
      return { status, message };
    });
}

export async function getLearningProgress(timePeriod) {
  const currentDate = moment().utc().format("YYYY-MM-DD");
  const token = await getToken();
  return axios
    .get(
      `${GET_LEARNING_PROGRESS}?currentDate=${currentDate}&timePeriod=${timePeriod}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
      }
    )
    .then((res) => {
      const responseData = idx(res, (_) => _.data.data) || {};
      const status = idx(res, (_) => _.status);
      return { status, data: responseData };
    })
    .catch((error) => {
      const status = idx(error, (_) => _.response.status);
      const message =
        idx(error, (_) => _.response.data.message) ||
        common.DEFAULT_ERROR_MESSAGE;
      return { status, message };
    });
}
