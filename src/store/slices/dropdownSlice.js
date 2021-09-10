import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    dropdown: {
        isOpened: false,
        id: null,
        coords: null,
    },
};

const dropdownSlice = createSlice({
    name: 'Dropdown',
    initialState,
    reducers: {
        handleDropdown: (state, { payload }) => {
            state.coords = payload.coords;
            if (payload.id === state.dropdown.id) {
                state.dropdown.isOpened = !state.dropdown.isOpened;
            } else {
                state.dropdown.isOpened = true;
                state.dropdown.id = payload.id;
            }
        },
        closeDropdown: (state) => {
          state.dropdown.isOpened = false;
          state.dropdown.id = null;
          state.coords = null;
        },
    },
});

export const { handleDropdown, closeDropdown } = dropdownSlice.actions;

export default dropdownSlice.reducer;
