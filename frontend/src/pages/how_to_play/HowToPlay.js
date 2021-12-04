import React from "react";
import {main_background, how_to_play, system_button_background} from "../../images";
import {set_current_page} from "../../redux_slices/CurrentPage";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import {color} from "../../definitions/Types";
import Button from "@material-ui/core/Button";
import {useDispatch} from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        'position': 'absolute',
        'height': '100%',
        'background-image': `url(${main_background})`,
        'background-size': '100% 100%'
    },
    how_to_play_container: {
        'position': 'relative',
        'height': '75vh',
        'background-image': `url(${how_to_play})`,
        'background-size': '100% 100%'
    },
    header_container: {
        'margin-top': '3vh'
    },
    header: {
        'color': color.BROWN,
        'font-size': '4vh',
        'font-family': 'Charmonman'
    },
    button_container: {
        'position': 'absolute',
        'bottom': '2vh'
    },
    button: {
        'width': '10vw',
        'height': '5vh',
        'background-image': `url(${system_button_background})`,
        'background-size': '100% 100%',
        'color': color.WHITE,
        'font-family': 'Charmonman'
    },
    text_container: {
        'font-family': 'Charmonman',
        'font-size': '2.0vh',
        'text-align': 'justify',
        'margin-top': '2vh'
    }
}));

const HowToPlay = () => {
    const styles = useStyles();
    const dispatch = useDispatch();
    const click_on_to_main_menu = () => {
        dispatch(set_current_page('main_menu'));
    };
    return (
        <Grid container item xs={12} justify={'center'} alignItems={'center'} className={styles.root}>
            <Grid container item xs={8} className={styles.how_to_play_container} justify={'center'}
                  alignContent={'flex-start'}>
                <Grid container item xs={12} justify={'center'} alignItems={'center'} alignContent={'center'}
                      className={styles.header_container}>
                    <Grid item className={styles.header}>Game Rules</Grid>
                </Grid>
                <Grid container item xs={10} justify={'flex-start'} className={styles.text_container}>
                    <Grid item>This game is a question-based game, and has 7 levels in total. You overcome a level by
                        giving the correct answer.
                        <br/><br/>
                        In the first three levels, there are some practices prepared for you. You can skip them if you want,
                        but it is recommended to finish these practices before jumping into the main challenge. To check
                        whether you are practicing or solving a main challenge, please take a look at the Game Mode on the top
                        side of the game.
                    </Grid>
                </Grid>
                <Grid container item xs={12} justify={'center'} alignItems={'center'}
                      className={styles.header_container}>
                    <Grid item className={styles.header}>Scoring system</Grid>
                </Grid>
                <Grid container item xs={10} justify={'flex-start'} className={styles.text_container}>
                    <Grid item>For every passed challenge and practice, you will get a certain amount of points calculated based
                        on the time you require to overcome the challenge and the number of failed attempts.
                        <br/><br/>
                        By clicking on the High Score button in the main menu, you can see the name of three players with
                        the highest score</Grid>
                </Grid>
                <Grid container item xs={4} className={styles.button_container} justify={'center'}>
                    <Button className={styles.button} onClick={click_on_to_main_menu}>
                        To Main Menu
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
};

export default HowToPlay;