import Cookies from 'js-cookie';
import * as types from '@redux/types';

const savedAccount = Cookies.get('account') ? JSON.parse(Cookies.get('account')) : null;
const isAuthenticated = Cookies.get('authenticated') === 'true';

const initialState = {
  authenticated: isAuthenticated,
  error: null,
  user: savedAccount || {},
  users: [],
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return { ...state, loading: true };

    case types.LOGIN_SUCCESS:
      return { ...state, loading: false, user: action.payload, authenticated: true };

    case types.SET_USER_DETAILS:
      return { ...state, ...action.payload, authenticated: true };

    case types.LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload };

    case 'USER_LOGOUT':
      return { ...state, authenticated: false, user: {} };

    default:
      return state;
  }
};

export default reducer;
