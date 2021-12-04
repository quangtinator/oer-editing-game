import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getProgress} from "../utils/Requests";

const init_fetch_game_progress = createAsyncThunk(
    'game_progress/init_fetch_game_progress',
    async () => {
        const response = await getProgress(window.accessToken);
        if (response.hasOwnProperty('level')) {
            return response.level
        } else {
            return null
        }
    }
);

const initial_state = {};
const GameProgressSlice = createSlice({
    name: 'game_progress',
    initialState: initial_state,
    reducers: {
        set_result_for_level: (current_game_progress, action) => {
            const level = action.payload.level;
            current_game_progress[level] = action.payload.result;
            return current_game_progress;
        }
    },
    extraReducers: {
        [init_fetch_game_progress.fulfilled]: (current_game_progress, action) => {
            const payload = action.payload;
            for (const level in payload) {
               if (payload.hasOwnProperty(level) && payload[level].hasOwnProperty('answer')) {
                   current_game_progress[level] = payload[level]['answer'];
               }
            }
            return current_game_progress;
        }
    }
});

const {actions, reducer} = GameProgressSlice;
export const {set_result_for_level} = actions;
export {init_fetch_game_progress};
export default reducer