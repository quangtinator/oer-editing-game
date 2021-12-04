import {createSlice} from '@reduxjs/toolkit';

const initial_state = {
    is_opening: false,
    message: null,
    licenses_to_be_excluded_from_answer: null,
    selected_license: null
};
const ChooseLicenseDialogSlice = createSlice({
    name: 'choose_license_dialog',
    initialState: initial_state,
    reducers: {
        open_choose_license_dialog: (state, action) => ({...state, is_opening: true}),
        close_choose_license_dialog: (state, action) => ({...state, is_opening: false}),
        set_message_for_choose_license_dialog: (state, action) => ({...state, message: action.payload}),
        select_license: (state, action) => ({...state, selected_license: action.payload}),
        set_licenses_to_be_excluded_from_answer: (state, action) => ({...state, licenses_to_be_excluded_from_answer: action.payload})
    }
});

const {actions, reducer} = ChooseLicenseDialogSlice;
export const {open_choose_license_dialog, close_choose_license_dialog, select_license, set_message_for_choose_license_dialog, set_licenses_to_be_excluded_from_answer} = actions;

export default reducer