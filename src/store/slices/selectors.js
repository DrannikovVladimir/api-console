export const requestsSelector = (state) => state.request.requests;

export const currentResponseSelector = (state) => state.request.currentResponse;

export const currentIdSelector = (state) => state.request.currentId;

export const valueSelector = (state) => state.request.value;

export const copiedSelector = (state) => state.request.copied;

export const resizeCoordSelector = (state) => state.request.resizeCoord;

export const requestErrorSelector = (state) => state.request.requestError;

export const dropdownSelector = (state) => state.dropdown.dropdown;

export const isLoggedInSelector = (state) => state.auth.sessionKey;

export const authErrorSelector = (state) => state.auth.authError;

export const loginSelector = (state) => state.auth.login;

export const subloginSelector = (state) => state.auth.sublogin;
