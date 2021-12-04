import React from 'react';
import Grid from "@material-ui/core/Grid";
import {useDrop} from "react-dnd";
import {color, item_types} from "../../../../definitions/Types";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {practice_theory_concept} from "../../../../images";

const useStyles = makeStyles((theme) => ({
    concept: {
        'position': 'relative',
        'color': color.WHITE,
        'height': '13vh',
        'font-size': '1.8vh',
        'background-image': `url(${practice_theory_concept})`,
        'background-size': '100% 100%'
    },
    transparent_layer: {
        'backgroundColor': color.RED,
        'position': 'absolute',
        'top': '50%',
        'left': '50%',
        'transform': 'translate(-50%, -50%)',
        'width': '88%',
        'height': '65%',
        'opacity': '0.7',
    }
}));
const NotDropZone = (props) => {
    const concept = props.concept;
    const styles = useStyles();
    const [{is_over}, drop] = useDrop({
        accept: item_types.PRACTICE_THEORY,
        drop: (item, monitor) => {
        },
        collect: monitor => ({
            is_over: !!monitor.isOver()
        })
    });

    return (
        <Grid container item xs={5} justify={'flex-end'} alignItems={'center'} alignContent={'center'} ref={drop}>
            <Grid container item justify={'center'} alignItems={'center'} xs={10} className={styles.concept}>
                <Grid item>
                    {concept}
                </Grid>
                <Grid item className={is_over ? styles.transparent_layer : ''}/>
            </Grid>
        </Grid>
    );
};

export default NotDropZone;