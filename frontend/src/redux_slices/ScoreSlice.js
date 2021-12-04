import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {postScore} from "../utils/Requests";
import {game_types} from "../definitions/Types";
import lodash from 'lodash';

const initial_state = {
    total_score: 0,
    score_of_all_levels: {}
};

const submit_score = createAsyncThunk(
    'score/set_score',
    async (payload, thunkAPI) => {
        const total_score = thunkAPI.getState().score.total_score;
        return postScore(window.accessToken, total_score);
    }
);

const set_score = createAsyncThunk(
    'score/set_score',
    async (payload, thunkAPI) => {
        const elapsed_time = thunkAPI.getState().elapsed_time;
        return {...payload, elapsed_time}
    }
);

const ScoreSlice = createSlice({
    name: 'score',
    initialState: initial_state,
    reducers: {},
    extraReducers: {
        [set_score.fulfilled]: (state, action) => {
            // This is necessary because by default, redux pass in a state as a proxy
            let object_state = lodash.cloneDeep(state);
            let {type, story_level, practice_level, practice_id, elapsed_time, failed_times} = action.payload;
            let story_coefficient = 50;
            let practice_coefficient = 150;
            if (failed_times) {
                failed_times = failed_times <= 3 ? failed_times : 3;
                story_coefficient = story_coefficient - failed_times * 10;
            }
            let time_point = (300 - elapsed_time * 5);
            let level_point = type === game_types.STORY ? 100 + story_coefficient * (story_level - 0) : 100 + practice_coefficient * (practice_level - 0);
            let total_point = level_point + time_point;

            if (type === game_types.STORY) {
                let current_point = lodash.get(object_state, ['score_of_all_levels', story_level, 'value'], 0);
                if (current_point < total_point) {
                    lodash.set(object_state, ['score_of_all_levels', story_level, 'value'], total_point);
                    object_state.total_score = object_state.total_score - current_point + total_point;
                }
            } else {
                let current_point = lodash.get(object_state, ['score_of_all_levels', story_level, practice_level, 'value'], 0);
                if (current_point < total_point) {
                    lodash.set(object_state, `score_of_all_levels.${story_level}.${practice_level}.value`, total_point);
                    object_state.total_score = object_state.total_score - current_point + total_point;
                }
            }

            return object_state;
        }
    }
});

const {reducer} = ScoreSlice;
export {set_score, submit_score};
export default reducer