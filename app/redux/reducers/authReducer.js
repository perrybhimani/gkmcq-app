import { CLEAR_STATE } from '../actions/commonActions';
import { LOGIN_SUCCESSFUL } from '../actions/authActions';

const initialState = {
  authData: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESSFUL:
      return {
        authData: action.data,
      };
    case CLEAR_STATE: {
      return initialState;
    }
    default:
      return state;
  }
};

export default authReducer;
