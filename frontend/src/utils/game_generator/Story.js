import {license_types, questionTypes, game_types} from '../../definitions/Types';
import {practiceTheoryGenerator, practiceEditingGenerator} from "./Practice";
import {
    level_0_description,
    level_1_description,
    level_2_description,
    level_3_description,
    level_4_description,
    level_5_description,
    level_6_description
} from "../../images";
import id_generator from 'uniqid';
// For multiple_choice questions, declaring combination_type in the challenge is not necessary because the correct answer
// is fixed. Hence no request to the server will be made.

const generateLevel0 = () => {
    return {
        type: questionTypes.MULTIPLE_CHOICE,
        level: 0,
        practices:
            [
                {
                    id: id_generator(),
                    ...practiceTheoryGenerator(0)
                },
                {
                    id: id_generator(),
                    ...practiceTheoryGenerator(1)
                }
            ],
        context: 'For the best quality, we choose steel as the metal making up the blade',
        description_image: level_0_description,
        question: `Steel is an alloy of carbon and a mysterious metal X. Given that X
                   is associated with a CC license, which prohibits any commercial use. What is X?`,
        choices: [
            {
                display_text: 'Aluminium (CC BY)',
                CC_license: license_types.CC_BY
            },
            {
                display_text: 'Copper (CC BY-ND)',
                CC_license: license_types.CC_BY_ND
            },
            {
                display_text: 'Iron (CC BY-NC)',
                CC_license: license_types.CC_BY_NC
            },
            {
                display_text: 'Zinc (CC ZERO)',
                CC_license: license_types.CC_ZERO
            }
        ],
        correctAnswer: 2,
        hint: 'NC means non-commercial'
    };
};

const generateLevel1 = () => {
    return {
        type: questionTypes.MULTIPLE_CHOICE,
        level: 1,
        practices: [
            {
                id: id_generator(),
                ...practiceTheoryGenerator(2)
            },
            {
                id: id_generator(),
                ...practiceEditingGenerator(0, game_types.PRACTICE_EDITING_COLLAGE)
            }
        ],
        context: `The secret for high quality steel is the carbon content in it. Too little carbon makes the blade too soft,
        too much carbon makes the sword can be broken easily`,
        description_image: level_1_description,
        question: `How much carbon should we use to make the steel? Given that steel is a COLLAGE of carbon and iron. The steel should be CC BY-SA
                   and the iron should be CC ZERO`,
        choices: [
            {
                display_text: 'From 0.2% to 1.5% (CC BY-SA)',
                CC_license: license_types.CC_BY_NC
            },
            {
                display_text: 'From 1.5% to 2.3% (CC BY-ND)',
                CC_license: license_types.CC_BY_ND
            },
            {
                display_text: 'From 2.3% to 3.0% (CC BY)',
                CC_license: license_types.CC_BY
            },
            {
                display_text: 'From 3.0% to 4.1% (CC ZERO)',
                CC_license: license_types.CC_ZERO
            }
        ],
        correctAnswer: 0,
        hint: 'Hint level 1'
    };
};

const generateLevel2 = () => {
    return {
        type: questionTypes.MULTIPLE_CHOICE,
        level: 2,
        practices: [
            {
                id: id_generator(),
                ...practiceEditingGenerator(0, game_types.PRACTICE_EDITING_COMPOSITION)
            },
            {
                id: id_generator(),
                ...practiceEditingGenerator(1, game_types.PRACTICE_EDITING_COLLAGE)
            }
        ],
        context: `A royal gift has to be flawless must last for decades. To achieve this kind top-tier quality,
                  we will add a secret substance into our steel.`,
        description_image: level_2_description,
        question: `Given that steel (CC BY-NC-SA) is a COLLAGE of carbon (CC ZERO), iron (CC BY-NC) and a secret substance X. What is X?`,
        choices: [
            {
                display_text: 'Chromium (CC BY-SA)',
                CC_license: license_types.CC_BY_SA
            },
            {
                display_text: 'Tungsten (CC BY-NC-SA)',
                CC_license: license_types.CC_BY_NC_SA
            },
            {
                display_text: 'Nickel (CC BY-ND)',
                CC_license: license_types.CC_BY_ND
            },
            {
                display_text: 'Manganese (CC ZERO)',
                CC_license: license_types.CC_ZERO
            }
        ],
        correctAnswer: 1,
        hint: 'Be careful with the SA licenses'
    };
};

const generateLevel3 = () => {
    const blade_license = license_types.CC_BY;

    return {
        type: questionTypes.SELF_GENERATED,
        combination_type: 'composition',
        level: 3,
        context: `After several days of hard working, we finally created a fine blade. Our job now is to attach the blade to a hilt.
        Our beloved king granted you the freedom to choose any style of hilt you feel suitable.`,
        description_image: level_3_description,
        question: `Given that the sword is a COMPOSITION of the blade (${blade_license.toUpperCase()}) and the hilt. Choose one in 4 following
        styles for the hilt and then license the sword accordingly`,
        choices: [
            {
                display_text: 'Italian Style (CC BY-SA)',
                CC_license: license_types.CC_BY_SA
            },
            {
                display_text: 'Western Europe Style (CC BY-NC-SA)',
                CC_license: license_types.CC_BY_NC_SA
            },
            {
                display_text: 'Eastern Europe Style (CC BY-ND)',
                CC_license: license_types.CC_BY_ND
            },
            {
                display_text: 'England Style (CC ZERO)',
                CC_license: license_types.CC_ZERO
            }
        ],
        correctAnswer: null,
        hint: 'Beware of the NC when creating composition',
        oer_resources: [blade_license]
    };
};

const generateLevel4 = () => {
    return {
        type: questionTypes.SELF_GENERATED_WITH_TWO_CHOICES,
        level: 4,
        context: `To show the wealthy of the kingdom, our King wants to attach some gems to the sword. You are free to choose
        any gem from the national treasure storehouse.`,
        description_image: level_4_description,
        question: `Please choose two gems to attach to the sword. As a special request from the king himself, the final sword must not be licensed under CC BY-ND or CC BY-NC-ND. This is a COMPOSITION`,
        choices: [
            {
                display_text: 'Ruby (CC BY-SA)',
                CC_license: license_types.CC_BY_SA
            },
            {
                display_text: 'Diamond (CC BY-NC-SA)',
                CC_license: license_types.CC_BY_NC_SA
            },
            {
                display_text: 'Sapphire (CC BY-ND)',
                CC_license: license_types.CC_BY_ND
            },
            {
                display_text: 'Pearl (CC ZERO)',
                CC_license: license_types.CC_ZERO
            }
        ],
        correctAnswer: null,
        hint: 'Be careful if you include an "NC" gem',
        oer_resources: [],
        combination_type: 'composition',
        require_result_of_levels: [3],
        licenses_to_be_excluded_from_answer: [license_types.CC_BY_ND, license_types.CC_BY_NC_ND]
    };
};

const generateLevel5 = () => {
    return {
        type: questionTypes.MULTIPLE_CHOICE,
        level: 5,
        context: `A sword, especially as a royal gift, must be contained in a box.`,
        description_image: level_5_description,
        question: `The sword box consists of three main components: the wooden box (CC Zero), the lock (CC BY-NC),
         and the decoration silk inside the box (CC BY-NC-SA). This is a COLLAGE. What is the license of the box?`,
        choices: [
            {
                display_text: 'CC BY-SA',
                CC_license: license_types.CC_BY_SA
            },
            {
                display_text: 'CC BY-NC-SA',
                CC_license: license_types.CC_BY_NC_SA
            },
            {
                display_text: 'CC BY-ND',
                CC_license: license_types.CC_BY_ND
            },
            {
                display_text: 'CC ZERO',
                CC_license: license_types.CC_ZERO
            }
        ],
        correctAnswer: 1,
        hint: 'Be careful of the NC-SA license',
        oer_resources: []
    };
};

const generateLevel6 = () => {
    return {
        type: questionTypes.MULTIPLE_CHOICE,
        level: 6,
        context: `Finally, all the components are completed. Let's put the sword in the box`,
        description_image: level_6_description,
        question: null,
        choices: [
            {
                display_text: null,
                CC_license: null
            },
            {
                display_text: null,
                CC_license: null
            },
            {
                display_text: null,
                CC_license: null
            },
            {
                display_text: null,
                CC_license: null
            }
        ],
        correctAnswer: 0,
        hint: 'Hint level 6',
        oer_resources: [],
        require_result_of_levels: [4, 5],
        combination_type: 'collage'
    };
};

const challengeGenerator = (level) => {
    if (typeof level === 'string') {
        level = parseInt(level, 10);
    }
    let result = {};
    switch (level) {
        case 0:
            result = generateLevel0();
            break;
        case 1:
            result = generateLevel1();
            break;
        case 2:
            result = generateLevel2();
            break;
        case 3:
            result = generateLevel3();
            break;
        case 4:
            result = generateLevel4();
            break;
        case 5:
            result = generateLevel5();
            break;
        case 6:
            result = generateLevel6();
            break;
        default:
            return null;
    }

    return result;
};

export default challengeGenerator;