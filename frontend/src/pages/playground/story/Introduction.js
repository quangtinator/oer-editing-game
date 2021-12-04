import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {leather_background, story_background} from "../../../images";
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import {color} from "../../../definitions/Types";
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles({
    root: {
        'height': '100%',
        'background-image': `url(${story_background})`,
        'background-size': '100% 100%'
    },
    introduction_container: {
        'position': 'relative',
        'background-image': `url(${leather_background})`,
        'background-size': '100% 100%',
        'height': '80vh'
    },
    buttons: {
        'position': 'absolute',
        'bottom': '17vh'
    },
    button_arrow: {
        'font-size': '13vh',
        '&:hover': {
            'cursor': 'pointer'
        }
    },
    text_container: {
        'margin-top': '10vh',
        'color': color.LIGHT_BROWN,
        'font-family': 'Charmonman',
        'font-size': '2.8vh',
        'text-align': 'justify'
    }
});
const Introduction = (props) => {
    const styles = useStyles();
    const set_seen_introduction = props.set_seen_introduction;
    const pages = [
        <p>My dear friend,<br/>
            To strengthen the relationship with our strongest ally, the Kingdom of Enchanted Fortress, our beloved King
            would like to give the Queen of the Enchanted Fortress a precious gift, a sword.
        </p>,
        <p>As the best smithy in the Kingdom, we 're given an honorable mission of forging the sword.
            Accomplishing
            the mission and the history shall be remember our name forever, failing the mission and we will be banished
            from
            our homeland forever.</p>,
        <p>But don't worry, I've already got a plan for us to overcome this challenge. In fact, we will nail it and
            become
            the most remembered blacksmiths of this Kingdom.<br/><br/>
            Due to the gravity of the request from the King, I believe we should do some practices before actually
            jumping into the real mission.
        </p>
    ];
    const [current_page, set_current_page] = useState(0);
    const [fade_in, set_fade_in] = useState(true);

    const click_on_forward = () => {
        if (current_page + 1 < pages.length) {
            set_current_page(current_page + 1);
        } else if (current_page === pages.length - 1) {
            set_fade_in(false);
            setTimeout(() => {
                set_seen_introduction(true);
            }, 1000);

        }
    };

    const click_on_backward = () => {
        if (current_page - 1 >= 0) {
            set_current_page(current_page - 1);
        }
    };

    return (
        <Grid container item xs={12} justify={'center'} alignItems={'center'} className={styles.root}>
            <Fade in={fade_in} timeout={500}>
                <Grid container item xs={8} className={styles.introduction_container}>
                    <Grid container item xs={12} justify={'center'}>
                        <Grid item xs={8} className={styles.text_container}>
                            {pages[current_page]}
                        </Grid>
                    </Grid>
                    <Grid container item className={styles.buttons} justify={'space-around'}>
                        <Grid item>
                            <ArrowLeftIcon fontSize={'large'} htmlColor={color.BROWN} className={styles.button_arrow}
                                           onClick={click_on_backward}/>
                        </Grid>
                        <Grid item>
                            <ArrowRightIcon fontSize={'large'} htmlColor={color.BROWN} className={styles.button_arrow}
                                            onClick={click_on_forward}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Fade>
        </Grid>
    );
};

export default Introduction