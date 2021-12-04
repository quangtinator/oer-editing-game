import {createSlice} from '@reduxjs/toolkit';

const initial_state = {
    is_opening: false,
    correctness: false,
    message: '',
    is_last_level: false
};
const ConfirmSubmissionDialogSlice = createSlice({
    name: 'confirm_submission_dialog',
    initialState: initial_state,
    reducers: {
        open_confirm_submission_dialog: (state, action) => ({
            is_opening: true,
            correctness: action.payload.correctness,
            message: action.payload.message,
            is_last_level: action.payload.is_last_level
        }),
        close_confirm_submission_dialog: (state, action) => ({
            ...state,
            is_opening: false,
            is_last_level: false,
            correctness: false,
            message: ''
        })
    }
});

const {actions, reducer} = ConfirmSubmissionDialogSlice;
export const {open_confirm_submission_dialog, close_confirm_submission_dialog} = actions;

export default reducer