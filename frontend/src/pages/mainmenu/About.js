import React from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import {makeStyles} from "@material-ui/core/styles";
import {story_dialog, system_button_background} from "../../images";
import {color} from "../../definitions/Types";

const useStyles = makeStyles((theme) => ({
    pop_up: {
        'position': 'absolute',
        'background-image': `url(${story_dialog})`,
        'background-size': '100% 100%',
        'width': '45vw',
        'height': '100vh',
        'top': '50%',
        'left': '50%',
        'transform': 'translate(-50%,-50%)',
        'padding-left': '3vw',
        'padding-right': '3vw',
        'padding-top': '11vh'
    },
    ok_button_container: {
        'position': 'absolute',
        'bottom': '10vh',
    },
    ok_button: {
        'background-image': `url(${system_button_background})`,
        'background-size': '100% 100%',
        'color': color.WHITE,
        'font-size': '1.7vh'
    },
    text_container: {
        'color': color.WHITE,
        'font-size': '1.7vh',
        'line-height': '2'
    }
}));

const About = (props) => {
    const styles = useStyles();
    const close_about = props.close_about;
    const is_about_opening = props.is_about_opening;
    return (
        <Modal open={is_about_opening}
               onClose={close_about}>
            <Grid container className={styles.pop_up} justify={'center'}>
                <Grid item className={styles.text_container}>
                    A. This learning game was developed in a bachelor thesis at RWTH Aachen University, by Vu Tuan
                    Tran.
                    The work was supervised, by Lubna Ali, M.Sc., Prof. Dr.-Ing. Schroeder, and Univ.-Prof. Dr.
                    rer. nat. Horst Lichter at RWTH Aachen University.
                    <br/>
                    <br/>
                    B. In this game, I have used and adapted the following artwork:
                    <br/>
                    1. Author: Chivy;
                    <br/>
                    Original work: https://www.artstation.com/artwork/Ng9yq
                    <br/>
                    2. Author: Zanariya;
                    <br/>
                    Original work: https://www.deviantart.com/zanariya/art/Blacksmith-s-Shop-413036759
                    <br/>
                    3. Author: Gogots
                    <br/>
                    Original work: https://www.deviantart.com/gogots/art/Bannire-vide-01-788445292
                    <br/>
                    4. Author: Hu Zheng
                    <br/>
                    Original work: https://www.artstation.com/artwork/claymore-1bf4e020-a644-47c8-b52f-baa873b102cc
                    <br/>
                    5.Author: Annadel Cinco
                    <br/>
                    Original work: https://www.artstation.com/artwork/g6zGm
                    <br/>
                    6. Author: Jule Ma
                    <br/>
                    Original work: https://www.behance.net/gallery/48802895/chests-
                    <br/>
                    I do not own these images. This game is used for educational purpose only and is licensed with CC BY-NC. All credit goes to the
                    original authors. For any problem concerning
                    licenses or copyright, please contact me via email: vu.tuan.tran@rwth-aachen.de
                </Grid>
                <Grid item className={styles.ok_button_container} xs={12}>
                    <Button fullWidth className={styles.ok_button} onClick={close_about}>
                        OK
                    </Button>
                </Grid>
            </Grid>
        </Modal>
    );
};

export default About;