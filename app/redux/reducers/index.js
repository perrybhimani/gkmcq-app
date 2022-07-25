import { combineReducers } from 'redux';
import authReducer from './authReducer';
import questionReducer from './questionReducer';

const rootReducer = combineReducers({
  authReducer,
  questionReducer
});

export default rootReducer;
