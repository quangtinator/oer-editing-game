import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {close_confirm_submission_dialog} from "../../../redux_slices/ConfirmSubmissionDialogSlice";
import {set_current_page} from "../../../redux_slices/CurrentPage";
import Modal from "@material-ui/core/Modal";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {story_dialog, system_button_background, correct_symbol, incorrect_symbol} from '../../../images';
import {color} from "../../../definitions/Types";
import confetti from "canvas-confetti";

const useStyles = makeStyles((theme) => ({
    pop_up: {
        'background-image': `url(${story_dialog})`,
        'background-size': '100% 100%',
        'position': 'absolute',
        'width': '27vw',
        'height': '40vh',
        'top': '50%',
        'left': '50%',
        'transform': 'translate(-50%,-50%)',
        'padding-left': '1.5vw',
        'padding-right': '1.5vw'
    },
    symbol: {
        'max-width': '6vw',
        'max-height': '11vh'
    },
    congratulation_message: {
        'color': color.WHITE,
        'margin-top': '1vh',
        'font-size': '3vh',
        'text-alignt': 'center',
        'font-family': 'Charmonman'
    },
    confirm_button: {
        'background-image': `url(${system_button_background})`,
        'background-size': '100% 100%',
        'width': '10vw',
        'margin-top': '2vh',
        'color': color.WHITE,
        'font-size': '2.5vh'
    }
}));


const firework = () => {
    let duration = 15 * 1000;
    let animationEnd = Date.now() + duration;
    let defaults = {startVelocity: 30, spread: 360, ticks: 60, zIndex: 0};

    const randomInRange = (min, max) => {
        return Math.random() * (max - min) + min;
    };

    let interval = setInterval(function () {
        let timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        let particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: {x: randomInRange(0.1, 0.3), y: Math.random() - 0.2}
        }));
        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: {x: randomInRange(0.7, 0.9), y: Math.random() - 0.2}
        }));
    }, 250);
};

const ConfirmSubmissionDialog = (props) => {
    const styles = useStyles();
    const dispatch = useDispatch();
    const {is_opening, correctness, message, is_last_level} = useSelector(state => state.confirm_submission_dialog);
    const symbol = correctness ? correct_symbol : incorrect_symbol;
    const goToNextLevel = props.go_to_next_level;
    let buttonLabel = correctness ? 'Next Level' : 'Okay';

    if (is_last_level) {
        buttonLabel = 'Exit'
    }
    const onClickConfirm = () => {
        if (is_last_level) {
            goToNextLevel();
            dispatch(set_current_page('main_menu'));
        } else if (correctness) {
            goToNextLevel();
        } else {
            dispatch(close_confirm_submission_dialog());
        }
    };

    useEffect(() => {
        if (is_last_level) {
            firework();
        }
    });

    return (
        <Modal open={is_opening}
               onClose={() => dispatch(close_confirm_submission_dialog())}>
            <Grid container item direction={'column'} alignItems={'center'} justify={'center'}
                  className={styles.pop_up}>
                {!is_last_level && <img src={symbol} className={styles.symbol}/>}
                <Grid container item className={styles.congratulation_message} justify={'center'}>{message}</Grid>
                <Grid item>
                    <Button onClick={onClickConfirm} className={styles.confirm_button}>{buttonLabel}</Button>
                </Grid>
            </Grid>
        </Modal>
    );
};

export default ConfirmSubmissionDialog;