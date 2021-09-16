import {handleActions} from 'redux-actions';

import {ActionTypes} from 'src/store/constants';

export const initialState = {
  loading: false,
  sessionKey: null,
  login: null,
  sublogin: null,
  authError: null,
};

export default {
  auth: handleActions(
    {
      [ActionTypes.AUTHENTICATE]: (state) => {
        return {
          ...state,
          loading: true,
          authError: null,
        };
      },
      [ActionTypes.AUTHENTICATE_SUCCESS]: (state, {payload}) => {
        return {
          ...state,
          loading: false,
          sessionKey: payload.sessionKey,
          login: payload.login,
          sublogin: payload.sublogin,
          authError: null,
        };
      },
      [ActionTypes.AUTHENTICATE_FAILURE]: (state, {payload}) => {
        let error = null;
        if (payload) {
          const { id, explain } = payload;
          error = `{${Object.entries({id, explain})
            .map(([key, value]) => `${key}: "${value}"`).join('')}}`;
        }

        return {
          ...state,
          sessionKey: null,
          login: null,
          sublogin: null,
          authError: error,
        };
      },
      [ActionTypes.LOGOUT]: (state) => {
        return {
          ...state,
          loading: false,
          sessionKey: null,
          authError: null,
        };
      },
    },
    initialState
  ),
};
