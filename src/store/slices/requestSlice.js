import { createSlice } from '@reduxjs/toolkit';

import getId from '../../helpers/util';

const initialState = {
  loading: false,
  requests: [],
  currentResponse: null,
  copied: false,
  value: '',
}

export const requestSlice = createSlice({
  name: 'requiests',
  initialState,
  reducers: {
    changeTextarea: (state, { payload }) => {
      state.value = payload.value;
      state.loading = false;
    },
    loadRequest: (state) => {
      state.loading = true;
    },
    setRequestSuccess: (state, { payload }) => {
      const { request } = payload;
      request.id = getId(state.requests);
      state.requests = [request, ...state.requests];
      state.loading = false;
      state.copied = false;
      state.currentRequest = null;
    },
    setRequestFailure: (state, { payload }) => {
      const { requestError } = payload;
      requestError.id = getId(state.requests);
      state.requests = [requestError, ...state.requests];
      state.loading = false;
      state.copied = false;
      state.currentRequest = null;
    },
    removeRequest: (state, { payload }) => {
      state.requests = state.requests.filter((r) => (r.id !== payload.id));
      state.loading = false;
    },
    copyRequest: (state, { payload }) => {
      state.copied = true;
      state.loading = false;
    },
    resetCopied: (state) => {
      state.copied = false;
    },
    addCurrentRequest: (state, { payload }) => {
      state.value = payload.request.query;
      state.loading = false;
    },
    formatRequest: (state, { payload }) => {
      const { value } = payload;
      state.value = JSON.stringify(JSON.parse(value), undefined, 4);
    },
    resetRequests: (state) => {
      state.loading = false;
      state.requests = [];
      state.currentResponse = null;
      state.copied = false;
      state.currentRequest = null;
    },
  },
});

export const {
  changeTextarea,
  loadRequest,
  setRequestSuccess,
  setRequestFailure,
  removeRequest,
  copyRequest,
  resetCopied,
  addCurrentRequest,
  formatRequest,
  resetRequests,
} = requestSlice.actions;

export default requestSlice.reducer;
