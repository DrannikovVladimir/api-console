import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    dropdown: {
        isOpened: false,
        id: null,
    },
};

const dropdownSlice = createSlice({
    name: 'Dropdown',
    initialState,
    reducers: {
        handleDropdown: (state, { payload }) => {
            if (payload.id === state.dropdown.id) {
                state.dropdown.isOpened = !state.dropdown.isOpened;
            } else {
                state.dropdown.isOpened = true;
                state.dropdown.id = payload.id;
            }
        },
    },
});

export const { handleDropdown } = dropdownSlice.actions;

export default dropdownSlice.reducer;