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
        console.log('AUTHENTICATE');
        return {
          ...state,
          loading: true,
          authError: null,
        };
      },
      [ActionTypes.AUTHENTICATE_SUCCESS]: (state, {payload}) => {
        console.log('AUTHENTICATE_SUCCESS');
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
        console.log('AUTHENTICATE_FAILURE');
        let result = null;
        if (payload) {
          const { id, explain } = payload;
          result = `{${Object.entries({id, explain})
            .map(([key, value]) => `${key}: "${value}"`).join('')}}`;
        }

        return {
          ...state,
          sessionKey: null,
          login: null,
          sublogin: null,
          authError: result,
        };
      },
      [ActionTypes.LOGOUT]: (state) => {
        console.log('LOGOUT');
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
