import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  requests: [],
  currentResponse: null,
}

export const requestSlice = createSlice({
  name: 'requiests',
  initialState,
  reducers: {
    addRequest: (state, { payload }) => {
      state.currentResponse = payload.request.data;
      state.requests = [payload.request, ...state.requests].filter((item) => item);
    }
  },
});

export const { addRequest } = requestSlice.actions;

export default requestSlice.reducer;
