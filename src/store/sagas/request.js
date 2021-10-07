import {put, takeEvery} from 'redux-saga/effects';
import api from 'src/helpers/sendsay';

import {loadRequest, setRequestSuccess, setRequestFailure} from '../slices/requestSlice';

export function* workerRequestSaga({payload}) {
  const { value } = payload;
  const obj = JSON.parse(value);
  try {
    const response = yield api.sendsay.request(obj);
    const request = {
      name: obj.action,
      query: value,
      data: response,
    };
    yield put(setRequestSuccess({request}));
  } catch (error) {
    const requestError = {
      name: obj.action,
      query: value,
      error: error.id,
    };
    yield put(setRequestFailure({requestError}));
  }
};

export default function* watcherRequestSaga() {
  yield takeEvery(loadRequest, workerRequestSaga);
};
