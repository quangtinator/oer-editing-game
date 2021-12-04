import React from 'react';
import Grid from "@material-ui/core/Grid";
import {useSelector} from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {
    leather_background,
    high_score_rank1,
    high_score_rank2,
    high_score_rank3, main_background
} from "../../images";

const useStyles = makeStyles({
    'root': {
        'height': '100%',
        'background-image': `url(${main_background})`,
        'background-size': '100% 100%'
    },
    'board_container': {
        'padding-top': '5vh',
        'height': '70vh',
        'background-image': `url(${leather_background})`,
        'background-size': '100% 100%'
    },
    'header': {
        'font-size': '5vh',
        'font-family': 'Charmonman'
    },
    'row': {
        'margin-top': '2vh'
    },
    'position': {
        'font-size': '2.4vh',
        'font-family': 'Charmonman'
    },
    'position_0': {
        'font-size': '2.1vh',
        'background-image': `url(${high_score_rank1})`,
        'background-size': '100% 100%',
        'height': '8vh',
        'width': '3vw',
        'font-family': 'Charmonman'
    },
    'position_1': {
        'font-size': '2.1vh',
        'background-image': `url(${high_score_rank2})`,
        'background-size': '100% 100%',
        'height': '8vh',
        'width': '3vw',
        'font-family': 'Charmonman'
    },
    'position_2': {
        'font-size': '2.1vh',
        'background-image': `url(${high_score_rank3})`,
        'background-size': '100% 100%',
        'height': '8vh',
        'width': '3vw',
        'font-family': 'Charmonman'
    },
    'user_name': {
        'font-size': '2.4vh',
        'word-break': 'break-word',
        'font-family': 'Charmonman'
    },
    'score': {
        'font-size': '2.4vh',
        'font-family': 'Charmonman'
    }
});
const HighScoreBoard = () => {
    const high_score_board = useSelector(state => state.high_score_board);
    const styles = useStyles();
    return (
        <Grid container item direction={'row'} justify={'center'} alignItems={"center"} xs={12} className={styles.root}>
            <Grid container item className={styles.board_container} justify={'center'} alignItems={'flex-start'}
                  alignContent={'flex-start'} xs={8}>
                <Grid container item className={styles.header} justify={'center'}>
                    <Grid item>
                        Leaderboard
                    </Grid>
                </Grid>
                <Grid container item className={styles.row} justify={'space-between'} xs={8}>
                    <Grid container item className={styles.position} xs={3} justify={'center'} alignItems={'center'}>
                        <Grid item>
                            Rank
                        </Grid>
                    </Grid>
                    <Grid container item className={styles.user_name} xs={4} justify={'center'} alignItems={'center'}>
                        <Grid item>
                            Player
                        </Grid>
                    </Grid>
                    <Grid container item className={styles.score} xs={4} justify={'center'} alignItems={'center'}>
                        <Grid item>
                            Score
                        </Grid>
                    </Grid>
                </Grid>
                {
                    high_score_board.map(elem => {
                        return (
                            <Grid container item key={'high-score-board-' + elem.position} className={styles.row}
                                  justify={'space-between'} xs={8}>
                                <Grid container item className={styles['position_' + elem.position]} justify={'center'}
                                      alignItems={'center'} xs={3}/>
                                <Grid container item className={styles.user_name} justify={'center'}
                                      alignItems={'center'} xs={4}>
                                        {elem.user}
                                </Grid>
                                <Grid container item className={styles.score} justify={'center'} alignItems={'center'}
                                      xs={4}>
                                    <Grid item>
                                        {elem.score}
                                    </Grid>
                                </Grid>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Grid>
    );
};

export default HighScoreBoard;