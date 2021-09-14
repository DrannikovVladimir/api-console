import {all, fork} from 'redux-saga/effects';

import login from 'src/store/sagas/auth';
import request from 'src/store/sagas/request';

export default function* root() {
  yield all([fork(login), fork(request)]);
}


