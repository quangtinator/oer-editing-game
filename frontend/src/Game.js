import React from 'react';
import {useSelector} from "react-redux";
import MainMenu from "./pages/mainmenu/MainMenu";
import HighScoreBoard from "./pages/high_score/HighScoreBoard";
import HowToPlay from "./pages/how_to_play/HowToPlay";
import ChooseLevel from "./pages/playground/choose_level/ChooseLevel";
import Story from "./pages/playground/story/Story";

const Game = () => {
    const current_page = useSelector(state => state.current_page);
    switch (current_page) {
        case 'main_menu':
            return (
                <MainMenu/>
            );
        case 'high_score_board':
            return (
                <HighScoreBoard/>
            );
        case 'how_to_play':
            return (
              <HowToPlay/>
            );
        case 'choose_level':
            return (
                <ChooseLevel/>
            );
        case 'story':
            return (
                <Story/>
            );
    }
};

export default Game;