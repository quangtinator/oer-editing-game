import {createSlice} from '@reduxjs/toolkit';

const initial_state = 'main_menu';
const CurrentPage = createSlice({
    name: 'practice_or_story',
    initialState: initial_state,
    reducers: {
        set_current_page: (state, action) => {
            return action.payload;
        }
    }
});

const {actions, reducer} = CurrentPage;
export const {set_current_page} = actions;
export {actions};
export default reducer