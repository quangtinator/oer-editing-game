import React from 'react';
import Grid from "@material-ui/core/Grid";
import {useDrag} from "react-dnd";
import {item_types, color} from "../../../../definitions/Types";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {practice_theory_description} from "../../../../images";

const useStyles = makeStyles((theme) => ({
    root: {
        'position': 'relative',
        'color': color.WHITE,
        'height': '13vh',
        'text-align': 'center',
        'background-image': `url(${practice_theory_description})`,
        'background-size': '100% 100%',
        'padding-left': '1.5vw',
        'padding-right': '1.7vw',
        'font-size': '1.8vh',
        '&:hover': {
            'cursor': 'pointer'
        }
    },
    transparent_layer: {
        'backgroundColor': color.GREEN,
        'position': 'absolute',
        'top': '50%',
        'left': '50%',
        'transform': 'translate(-50%, -50%)',
        'width': '88%',
        'height': '65%',
        'opacity': '0.5'
    }
}));

const DescriptionInPracticeTheory = (props) => {
    const description = props.description;
    const styles = useStyles();

    // there is another item hovering on top of the current item
    const is_over = props.is_over;
    const [{isDragging}, drag] = useDrag({
        item: {
            type: item_types.PRACTICE_THEORY,
            position: props.position
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    });

    return (
        <Grid container item justify={'center'} alignItems={'center'} alignContent={'center'} xs={11} ref={drag}
              className={styles.root}>
            <Grid item>
                {description}
            </Grid>
            <Grid item className={is_over ? styles.transparent_layer : ''}/>
        </Grid>
    );
};

export default DescriptionInPracticeTheory;