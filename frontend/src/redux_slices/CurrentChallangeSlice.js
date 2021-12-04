import {createSlice} from '@reduxjs/toolkit';
import challengeGenerator from "../utils/game_generator/Story";
import {license_types} from "../definitions/Types";

const initial_state = {
    type: 'default',
    level: -1,
    context: '',
    description_image: null,
    question: '',
    choices: [
        {
            display_text: '',
            CC_license: ''
        },
        {
            display_text: '',
            CC_license: ''
        },
        {
            display_text: '',
            CC_license: ''
        },
        {
            display_text: '',
            CC_license: ''
        }
    ],
    correctAnswer: null,
    hint: ''
};

const CurrentChallengeSlice = createSlice({
    name: 'current_challenge',
    initialState: initial_state,
    reducers: {
        to_level: (current_challenge, action) => (challengeGenerator(action.payload)),
        to_next_level: (current_challenge, action) => {
            if (current_challenge.level !== 6) {
                return challengeGenerator(current_challenge.level + 1);
            }
        },
        prepare_oer_resources: (current_challenge, action) => {
            current_challenge.require_result_of_levels.forEach(level => {
                current_challenge.oer_resources.push(action.payload[level]);
            });
            return current_challenge;
        },
        prepare_choice_and_question_for_last_level: (current_challenge, action) => {
            current_challenge.choices[current_challenge.correctAnswer].CC_license = action.payload.correctAnswer;
            current_challenge.choices[current_challenge.correctAnswer].display_text = action.payload.correctAnswer;
            let availableLicenses = Object.values(license_types).filter(elem => elem !== action.payload.correctAnswer);
            current_challenge.choices = current_challenge.choices.map(license => {
                if (license.CC_license === null) {
                    let randomLicense = availableLicenses[Math.floor(Math.random() * availableLicenses.length)];
                    license.CC_license = randomLicense;
                    license.display_text = randomLicense;
                    availableLicenses = availableLicenses.filter(elem => elem !== randomLicense);
                    return license;
                } else {
                    return license;
                }
            });
            current_challenge.question = `The gift is a COLLAGE of the sword (${current_challenge.oer_resources[0].toUpperCase()}) and the box (${current_challenge.oer_resources[1].toUpperCase()}). Which license should we assign to the gift?`;
            return current_challenge;
        },
        reset_to_default_challenge: (state, action) => initial_state
    }
});

const {actions, reducer} = CurrentChallengeSlice;
export const {to_level, prepare_oer_resources, prepare_choice_and_question_for_last_level, reset_to_default_challenge} = actions;

export default reducer