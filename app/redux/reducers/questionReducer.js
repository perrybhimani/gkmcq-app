import {
  GET_SELECTED_TOPICID_SUCCESSFUL,
  LIST_QUESTIONS_SUCCESSFUL,
  CLEAR_QUESTION_STATE,
  GET_SELECTED_QUESTIONID_SUCCESSFUL,
} from '../actions/questionActions';

const initialState = {
  selectedTopicId: '',
  questionList: {},
  questionId: null,
};

const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SELECTED_TOPICID_SUCCESSFUL:
      return {
        ...state,
        selectedTopicId: action.topicId,
      };
    case LIST_QUESTIONS_SUCCESSFUL:
      return {
        ...state,
        questionList: action.data,
        questionId: null,
      };
    case GET_SELECTED_QUESTIONID_SUCCESSFUL:
      return {
        ...state,
        questionId: action.data,
      };
    case CLEAR_QUESTION_STATE: {
      return initialState;
    }
    default:
      return state;
  }
};

export default questionReducer;
