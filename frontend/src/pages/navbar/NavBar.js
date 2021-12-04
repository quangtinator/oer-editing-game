import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import Button from '@material-ui/core/Button';
import {navbar_back_button, navbar_logout_button} from "../../images";
import Grid from '@material-ui/core/Grid';
import {makeStyles} from "@material-ui/core/styles";
import {color} from "../../definitions/Types";
import {keycloak} from "../../index";
import {set_current_page} from "../../redux_slices/CurrentPage";
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
    root: {
        'position': 'fixed',
        'z-index': 2
    },
    navbar_container: {
        'margin-top': '1vh'
    },
    back_button: {
        'margin-left': '0.5vw',
        'min-width': '0px',
        'width': '2vw',
        'height': '4vh',
        'background-image': `url(${navbar_back_button})`,
        'background-size': '100% 100%'
    },
    logout_button: {
        'margin-right': '0.5vw',
        'min-width': '0px',
        'width': '2vw',
        'height': '4vh',
        'background-image': `url(${navbar_logout_button})`,
        'background-size': '100% 100%'
    },
    score_and_time_and_game_type: {
        'color': color.WHITE,
        'font-size': '2.5vh',
        'font-family': 'Charmonman'
    }
}));


const NavBar = () => {
    const dispatch = useDispatch();
    const current_game_mode = useSelector(state => state.current_game_mode);
    const current_page = useSelector(state => state.current_page);
    const total_score = useSelector(state => state.score.total_score);
    const elapsed_time = useSelector(state => state.elapsed_time);
    const styles = useStyles();

    const click_on_back_button = () => {
        if (current_page === 'story') {
            dispatch(set_current_page('choose_level'));
        } else {
            dispatch(set_current_page('main_menu'));
        }
    };

    const logout = () => {
        keycloak.logout();
    };

    return (
        <Grid container item justify={'center'} xs={12} className={styles.root}>
            <Grid container item md={6} className={styles.navbar_container}>
                <Grid container item xs={2} justify={'flex-start'}>
                    <Tooltip title={"Go Back"}>
                        <Button onClick={() => click_on_back_button()} className={styles.back_button}>
                        </Button>
                    </Tooltip>
                </Grid>
                <Grid container item xs={9} justify={'center'}>
                    <Grid container item xs={3} justify={'flex-start'}>
                        <Grid item className={styles.score_and_time_and_game_type}>
                            Score: {total_score}
                        </Grid>
                    </Grid>
                    <Grid container item xs={5} justify={'flex-start'}>
                        <Grid item className={styles.score_and_time_and_game_type}>
                            Game Mode: {current_game_mode.toUpperCase()}
                        </Grid>
                    </Grid>
                    <Grid container item xs={4} justify={'flex-start'}>
                        <Grid item className={styles.score_and_time_and_game_type}>
                            Elapsed Time: {elapsed_time}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container item justify={'flex-end'} xs={1}>
                    <Grid container item xs={10} justify={'center'}>
                        <Tooltip title={"Log Out"}>
                            <Button onClick={logout} className={styles.logout_button}>
                            </Button>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};


export default NavBar;