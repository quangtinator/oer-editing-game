import React from 'react';
import PracticeEditing from "./editing/PracticeEditing";
import PracticeTheory from "./theory/PracticeTheory";
import {game_types} from "../../../definitions/Types";

function PracticeMode(props) {
    const practice = props.practice;
    if (practice.type === game_types.PRACTICE_THEORY) {
        return <PracticeTheory practice={practice}/>
    } else if (practice.type === game_types.PRACTICE_EDITING_COLLAGE || practice.type === game_types.PRACTICE_EDITING_COMPOSITION) {
        return <PracticeEditing practice={practice}/>
    } else {
        return <div>Loi roi</div>;
    }
}

export default PracticeMode;
