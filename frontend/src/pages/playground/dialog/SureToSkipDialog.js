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

const useStyles = makeStyles((theme) => ({
    pop_up: {
        'position': 'absolute',
        'background-image': `url(${story_dialog})`,
        'background-size': '100% 100%',
        'width': '22vw',
        'height': '15vh',
        'top': '50%',
        'left': '50%',
        'transform': 'translate(-50%,-50%)'
    },
    message: {
        'margin-top': '3vh',
        'color': color.WHITE,
        'font-size': '1.8vh'
    },
    button: {
        'background-image': `url(${system_button_background})`,
        'background-size': '100% 100%',
        'width': '8vw',
        'margin-top': '2.3vh',
        'color': color.WHITE,
        'font-size': '1.7vh'
    }
}));

const SureToSkipDialog = (props) => {
    const styles = useStyles();
    const go_to_next_level = props.go_to_next_level;
    const is_opening = props.is_skip_dialog_opening;
    const set_is_opening = props.set_is_skip_dialog_opening;

    const on_click_yes = () => {
        set_is_opening(false);
        go_to_next_level();
    };
    const on_click_no = () => {
        set_is_opening(false);
    };

    return (
        <Modal open={is_opening}
               onClose={() => set_is_opening(false)}>
            <Grid container item direction={'column'} alignItems={'center'}
                  className={styles.pop_up}>
                <Grid item className={styles.message}>Do you really want to skip this practice?</Grid>
                <Grid container justify={'center'}>
                    <Grid container item xs={6} justify={'center'}>
                        <Button onClick={on_click_yes} className={styles.button}>Yes</Button>
                    </Grid>
                    <Grid container item xs={6} justify={'center'}>
                        <Button onClick={on_click_no} className={styles.button}>No</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Modal>
    );
};

export default SureToSkipDialog;