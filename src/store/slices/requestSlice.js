import { createSlice } from '@reduxjs/toolkit';

import getId from '../../helpers/util';

const initialState = {
  loading: false,
  requests: [],
  currentResponse: null,
  copied: false,
  currentId: null,
  value: '',
  resizeCoord: null,
  requestError: null,
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
      state.currentId = null;
    },
    setRequestSuccess: (state, { payload }) => {
      const { request } = payload;
      const filteredRequests = state.requests.filter((r) => r.name !== payload.request.name);
      request.id = getId(state.requests);
      state.requests = [request, ...filteredRequests].slice(0, 15);
      state.currentResponse = request.data;
      state.loading = false;
      state.copied = false;
      state.requestError = null;
    },
    setRequestFailure: (state, { payload }) => {
      const { requestError } = payload;
      const filteredRequests = state.requests.filter((r) => r.name !== payload.requestError.name);
      requestError.id = getId(state.requests);
      state.requests = [requestError, ...filteredRequests].slice(0, 15);
      state.loading = false;
      state.copied = false;
      state.requestError = requestError;
    },
    removeRequest: (state, { payload }) => {
      state.requests = state.requests.filter((r) => (r.id !== payload.id));
      state.loading = false;
    },
    copyRequest: (state, { payload }) => {
      state.copied = true;
      state.loading = false;
    },
    resetCopied: (state, { payload }) => {
      state.copied = false;
      state.currentId = payload.id;
    },
    addCurrentRequest: (state, { payload }) => {
      state.value = payload.request.query;
      state.loading = false;
    },
    formatRequest: (state, { payload }) => {
      const { value } = payload;
      state.value = JSON.stringify(JSON.parse(value), undefined, 4);
    },
    setNewSize: (state, { payload }) => {
      const { coord } = payload;
      state.resizeCoord = coord;
    },
    resetRequests: (state) => {
      state.loading = false;
      state.requests = [];
      state.currentResponse = null;
      state.copied = false;
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
  setNewSize,
  resetRequests,
} = requestSlice.actions;

export default requestSlice.reducer;
