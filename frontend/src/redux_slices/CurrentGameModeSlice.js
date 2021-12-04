import {createSlice} from '@reduxjs/toolkit';

const initial_state = '';
const CurrentGameModeSlice = createSlice({
    name: 'choose_license_dialog',
    initialState: initial_state,
    reducers: {
        set_game_mode: (state, action) => (action.payload),
    }
});

const {actions, reducer} = CurrentGameModeSlice;
export const {set_game_mode} = actions;

export default reducer