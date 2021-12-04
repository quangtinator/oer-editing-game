import currentChallengeReducer from './redux_slices/CurrentChallangeSlice';
import currentPracticesListReducer from './redux_slices/CurrentPracticesListSlice';
import confirmSubmissionDialogReducer from './redux_slices/ConfirmSubmissionDialogSlice';
import chooseLicenseDialogReducer from './redux_slices/ChooseLicenseDialogSlice';
import gameProgressReducer from './redux_slices/GameProgressSlice';
import scoreReducer from './redux_slices/ScoreSlice';
import elapsedTimeReducer from './redux_slices/TimerSlice';
import highScoreReducer from './redux_slices/HighScoreBoardSlice';
import currentPageReducer from './redux_slices/CurrentPage';
import currentGameModeReducer from './redux_slices/CurrentGameModeSlice';
import { combineReducers } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
     current_challenge: currentChallengeReducer,
     current_practices_list: currentPracticesListReducer,
     confirm_submission_dialog: confirmSubmissionDialogReducer,
     choose_license_dialog: chooseLicenseDialogReducer,
     game_progress: gameProgressReducer,
     score: scoreReducer,
     elapsed_time: elapsedTimeReducer,
     high_score_board: highScoreReducer,
     current_page: currentPageReducer,
     current_game_mode: currentGameModeReducer
});


export default rootReducer