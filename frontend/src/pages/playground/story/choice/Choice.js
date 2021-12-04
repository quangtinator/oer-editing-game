import React, {useRef, useEffect} from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {story_choice} from "../../../../images";
import Slide from "@material-ui/core/Slide";
import {color} from "../../../../definitions/Types";

const useStyles = makeStyles((theme) => ({
    choice: {
        'height': '12vh'
    },
    chosen_choice: {
        'background-color': color.GREEN
    },
    choice_button: {
        'backgroundImage': `url(${story_choice})`,
        'background-size': '100% 100%',
        'color': color.WHITE,
        'font-size': '1.6vh'

    }
}));

const Choice = (props) => {
    const styles = useStyles();
    const click_on_a_choice = props.click_on_a_choice;
    const choiceButton = useRef(null);
    const display_text = props.display_text;
    const choice_number = props.choice_number;
    const is_selected = props.is_selected;
    const showUp = props.show_up;

    useEffect(() => {
        if (is_selected) {
            choiceButton.current.classList.add(styles.chosen_choice);
        } else {
            choiceButton.current.classList.remove(styles.chosen_choice);
        }
    });
    return (
        <Slide direction={'up'} in={showUp} mountOnEnter unmountOnExit>
            <Grid container item xs={5} className={styles.choice}>
                <Button ref={choiceButton}
                        id={'story-choice-3'}
                        fullWidth
                        onClick={() => click_on_a_choice(choice_number)}
                        className={styles.choice_button}>
                    {display_text}
                </Button>
            </Grid>
        </Slide>
    );
};

export default Choice;