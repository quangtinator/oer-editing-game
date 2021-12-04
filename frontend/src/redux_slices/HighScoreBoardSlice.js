import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getHighScoreBoard} from "../utils/Requests";

const fetch_high_score_board = createAsyncThunk(
    'high_score_board/init_fetch_high_score',
    async () => {
        return await getHighScoreBoard(window.accessToken);
    }
);
const initial_state = [];
const HighScoreBoardSlice = createSlice({
    name: 'high_score_board',
    initialState: initial_state,
    reducers: {},
    extraReducers: {
        [fetch_high_score_board.fulfilled]: (state, action) => {
            let high_score_board = action.payload.map(row => ({
                position: row.position,
                user: row.user,
                score: row.score
            }));
            high_score_board.sort((a, b) => (b.score - a.score));
            return high_score_board;
        }
    }
});

const {reducer} = HighScoreBoardSlice;
export {fetch_high_score_board};
export default reducer