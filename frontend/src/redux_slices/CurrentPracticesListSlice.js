import {createSlice} from '@reduxjs/toolkit';

const initial_state = [];
const CurrentPracticesListSlice = createSlice({
    name: 'current_practices_list',
    initialState: initial_state,
    reducers: {
        set_practices_list: (current_practices_list, action) => (action.payload),
        finish_a_practice: (current_practices_list, action) => {
            let finishedPracticeIndex = current_practices_list.findIndex(practice => practice.id === action.payload);
            current_practices_list[finishedPracticeIndex]['finished'] = true;
        },
        reset_to_default_practices_list: (state, action) => initial_state
    }
});

const { actions, reducer } = CurrentPracticesListSlice;
export const {set_practices_list, finish_a_practice, reset_to_default_practices_list} = actions;

export default reducer