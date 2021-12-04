import React, {useEffect, useRef} from 'react';
import Grid from '@material-ui/core/Grid';
import NavBar from './pages/navbar/NavBar';
import {makeStyles} from '@material-ui/core/styles';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {useDispatch} from "react-redux";
import {init_fetch_game_progress} from "./redux_slices/GameProgressSlice";
import Game from './Game';

const useStyles = makeStyles(theme => {
    return {
        game: {
            'position': 'relative',
            'border': '1px solid black',
            'height': '100vh'
        },
        root: {
            'background-color': '#6d3003',
            'overflow': 'hidden'
        }
    }
});

function App() {
    const styles = useStyles();
    const dispatch = useDispatch();
    const game = useRef(null);

    /*
    Initializing to fetch game progress from data base
     */
    useEffect(() => {
        dispatch(init_fetch_game_progress());
    });

    return (
        <DndProvider backend={HTML5Backend}>
            <Grid container justify={'center'} className={styles.root}>
                <Grid container item direction={'column'} alignItems={'center'} className={styles.game} xs={12}
                      md={6} ref={game}>
                    <NavBar/>
                    <Game/>
                </Grid>
            </Grid>
        </DndProvider>
    );
}

export default App;
