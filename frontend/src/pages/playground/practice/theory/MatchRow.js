import React, {useEffect, useRef} from 'react';
import Grid from "@material-ui/core/Grid";
import DropZone from "./DropZone";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {color} from "../../../../definitions/Types";
import {practice_theory_concept, practice_lava_frame} from "../../../../images";
import NotDropZone from "./NotDropZone";
const useStyles = makeStyles((theme) => ({
    root: {
        'height': '20vh',
        'margin-top': '3vh',
        'background-image': `url(${practice_lava_frame})`,
        'background-size': '100% 100%'
    },
    correct_notification: {
        'background-color': '#AAF38D'
    },
    wrong_notification: {
        'background-color': '#F64A0A'
    }
}));

const MatchRow = (props) => {
    const styles = useStyles();
    const concept = props.concept ? props.concept.toUpperCase() : null;
    const description = props.description;
    const index = props.index;
    const color = props.color;
    const matchRow = useRef(null);
    const swap_position_of_two_rows = props.swap_position_of_two_rows;
    const reset_color = props.reset_color;

    useEffect(() => {
        if (color === 'green') {
            matchRow.current.classList.add(styles.correct_notification);
        } else if (color === 'red') {
            matchRow.current.classList.add(styles.wrong_notification);
        } else if (color === 'none') {
            matchRow.current.classList.remove(styles.correct_notification);
            matchRow.current.classList.remove(styles.wrong_notification);
        }
    });
    return (
        <Grid container item xs={12}
              className={styles.root}
              ref={matchRow}>
            <NotDropZone concept={concept}/>
            <DropZone index={index} swap_position_of_two_rows={swap_position_of_two_rows} description={description} reset_color={reset_color}/>
        </Grid>
    );
};

export default MatchRow;