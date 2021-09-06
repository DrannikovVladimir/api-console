import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  requests: [],
  currentResponse: null,
  dropdown: {
    isOpened: false,
    action: null,
    request: null,
    id: null,
  }
}

export const requestSlice = createSlice({
  name: 'requiests',
  initialState,
  reducers: {
    addRequest: (state, { payload }) => {
      state.currentResponse = payload.request.data;
      state.requests = [payload.request, ...state.requests].filter((item) => item);
    },
    removeRequest: (state, { payload }) => {
      state.requests.filter((r) => r.id !== payload.id);
    },
  },
});

export const { addRequest, removeRequest } = requestSlice.actions;

export default requestSlice.reducer;
