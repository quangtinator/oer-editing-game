import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {to_level} from "../../../redux_slices/CurrentChallangeSlice";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {main_background, system_button_background} from "../../../images";
import {color} from '../../../definitions/Types';
import {set_current_page} from "../../../redux_slices/CurrentPage";
import {reset_time} from "../../../redux_slices/TimerSlice";
import {reset_to_default_practices_list} from "../../../redux_slices/CurrentPracticesListSlice";
import {set_game_mode} from "../../../redux_slices/CurrentGameModeSlice";

const useStyles = makeStyles((theme) => ({
    root: {
        'position': 'absolute',
        'height': '100%',
        'background-image': `url(${main_background})`,
        'background-size': '100% 100%'
    },
    choose_level_container: {
        'margin-top': '15vh',
        'width': '100%'
    },
    level_clickable: {
        'height': '6vh',
        'font-size': '2vh',
        'background-image': `url(${system_button_background})`,
        'background-size': '100% 100%',
        'color': color.WHITE
    },
    level_not_clickable: {
        'opacity': '0.3',
        'height': '6vh',
        'font-size': '2vh',
        'background-image': `url(${system_button_background})`,
        'background-size': '100% 100%'
    },
    header: {
        'font-size': '3vh',
        'color': color.WHITE
    }
}));

const ChooseLevel = (props) => {
    const styles = useStyles();
    const dispatch = useDispatch();
    const game_progress = useSelector(state => state.game_progress);
    const helper_arr = [...Array(7).keys()];
    const number_of_unlocked_level = Object.keys(game_progress).length;

    const onClickLevel = (level) => {
        dispatch(to_level(level));
        dispatch(set_current_page('story'));
    };

    useEffect(() => {
        dispatch(reset_time());
        dispatch(reset_to_default_practices_list());
        dispatch(set_game_mode(''));
    });

    return (
        <Grid container item xs={12} justify={'center'} className={styles.root}>
            <Grid container direction={'column'} spacing={1} className={styles.choose_level_container}>
                <Grid container item justify={'center'}>
                    <Grid item className={styles.header}>
                        Choose Level
                    </Grid>
                </Grid>
                {
                    helper_arr.map(index => {
                        if (index <= number_of_unlocked_level) {
                            return (
                                <Grid container item justify={'center'} key={'choose-level-' + index}>
                                    <Grid item xs={6} md={3}>
                                        <Button className={styles.level_clickable} fullWidth
                                                onClick={() => onClickLevel(index)}>{index + 1}</Button>
                                    </Grid>
                                </Grid>
                            )
                        } else {
                            return (
                                <Grid container item justify={'center'} key={'choose-level-' + index}>
                                    <Grid item xs={6} md={3}>
                                        <Button className={styles.level_not_clickable}
                                                fullWidth
                                                disabled>
                                            {index + 1}
                                        </Button>
                                    </Grid>
                                </Grid>
                            )
                        }
                    })
                }
            </Grid>
        </Grid>
    );
};

export default ChooseLevel;