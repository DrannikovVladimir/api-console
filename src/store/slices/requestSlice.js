import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
    },
    addRequest: (state, { payload }) => {
      state.currentResponse = payload.request.data;
      state.requests = [payload.request, ...state.requests].slice(0, 15);
      state.copied = false;
      state.currentRequest = null;
    },
    removeRequest: (state, { payload }) => {
      state.requests = state.requests.filter((r) => (r.id !== payload.id));
    },
    copyRequest: (state, { payload }) => {
      state.copied = true;
    },
    editRequest: (state, { payload }) => {
      state.requests = state.requests.map((r) => {
        if (r.id === payload.request.id) {
          r = payload;
        }
        return r;
      });
    },
    addCurrentRequest: (state, { payload }) => {
      state.value = payload.request.query;
    },
    resetRequests: (state) => {
      state.requests = [];
      state.currentResponse = null;
      state.copied = false;
      state.currentRequest = null;
    },
  },
});

export const { changeTextarea, addRequest, removeRequest, copyRequest, editRequest, addCurrentRequest, resetRequests } = requestSlice.actions;

export default requestSlice.reducer;
