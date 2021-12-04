import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {close_choose_license_dialog, select_license} from "../../../redux_slices/ChooseLicenseDialogSlice";
import Form from "react-bootstrap/Form";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import {makeStyles} from "@material-ui/core/styles";
import {license_types, color} from "../../../definitions/Types";
import {story_dialog} from "../../../images";
import {system_button_background} from "../../../images";

const useStyles = makeStyles((theme) => ({
    pop_up: {
        'background-image': `url(${story_dialog})`,
        'background-size': '100% 100%',
        'position': 'absolute',
        'width': '27vw',
        'height': '33vh',
        'top': '50%',
        'left': '50%',
        'transform': 'translate(-50%,-50%)'
    },
    full_size: {
        'height': '100%',
        'width': '100%'
    },
    message: {
        'margin-top': '6vh',
        'text-align': 'center',
        'font-size': '1.7vh',
        'color': color.WHITE
    },
    submit_button: {
        'margin-bottom': '4vh',
        'background-image': `url(${system_button_background})`,
        'background-size': '100% 100%',
        'color': color.WHITE,
        'font-size': '1.7vh'
    },
    submit_button_container: {
        'height': '6vh',
        'width': '7vw'
    },
    dropdown: {}
}));

function ChooseLicenseDialog(props) {
    const styles = useStyles();
    const click_on_submit_button = props.click_on_submit_button;
    const dispatch = useDispatch();
    const {is_opening, message, licenses_to_be_excluded_from_answer, chosen_license} = useSelector(state => state.choose_license_dialog);
    const getToBeDisplayedLicenses = () => {
        if (!licenses_to_be_excluded_from_answer) {
            return Object.values(license_types);
        }
        let result = [];
        for (const license in license_types) {
            if (license_types.hasOwnProperty(license)) {
                if (!licenses_to_be_excluded_from_answer.includes(license_types[license])) {
                    result.push(license_types[license]);
                }
            }
        }
        return result;
    };

    return (
        <Modal open={is_opening}
               onClose={() => dispatch(close_choose_license_dialog())}>
            <Grid className={styles.pop_up}>
                <Form onSubmit={click_on_submit_button} className={styles.full_size}>
                    <Grid container direction={'row'} justify={'center'}
                          className={styles.full_size}>
                        <Grid container item justify={'center'} className={styles.message} xs={10}>
                            {message}
                        </Grid>
                        <Grid container item xs={12} justify={'center'}>
                            <Form.Group>
                                <Form.Control as="select" value={chosen_license}
                                              onChange={(e) => dispatch(select_license(e.target.value))}
                                              className={styles.dropdown}>
                                    <option value={'none'}>Not Combinable</option>
                                    {
                                        getToBeDisplayedLicenses().map(license => {
                                            return (
                                                <option value={license}
                                                        key={'ChooseLicenseDialog-' + license}>{license.toUpperCase()}</option>
                                            );
                                        })
                                    }
                                </Form.Control>
                            </Form.Group>
                        </Grid>
                        <Grid container item className={styles.submit_button_container} xs={3} justify={'center'}>
                            <Button type={'submit'} fullWidth className={styles.submit_button}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            </Grid>
        </Modal>
    );
}

export default ChooseLicenseDialog;