import React from 'react';
import Grid from '@material-ui/core/Grid';
import {item_types, license_types, resource_types} from "../../../../definitions/Types";
import {useDrag} from 'react-dnd';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {
    CC_ZERO,
    CC_BY,
    CC_BY_SA,
    CC_BY_NC,
    CC_BY_NC_ND,
    CC_BY_NC_SA,
    CC_BY_ND,
    audio,
    document,
    picture,
    video
} from '../../../../images';

const useStyles = makeStyles((theme) => ({
    resource_container: {
      '&:hover': {
          'cursor': 'pointer'
      }
    },
    close_button: {
        'position': 'absolute',
        'top': '-20px',
        'right': '-25px',
        'background': 'red',
        'color': 'white',
        'transform': 'scale(0.5)'
    },
    resource_and_close_button: {
        'position': 'relative'
    },
    images: {
        'max-width': '100%',
        [theme.breakpoints.up('sm')]: {
            'max-height': (props) => {
                if (props.inside_the_result_box) {
                    return '50px';
                } else {
                    return '70px';
                }
            }
        },
        [theme.breakpoints.up('xl')]: {
            'max-height': (props) => {
                if (props.inside_the_result_box) {
                    return '90px';
                } else {
                    return '120px';
                }
            }
        }
    }
}));
const ResourceInPracticeEditing = (props) => {
    const styles = useStyles(props);
    const on_click_remove_resource = props.on_click_remove_resource;
    let resource_type;
    let license;
    switch (props.license) {
        case license_types.CC_ZERO:
            license = CC_ZERO;
            break;
        case license_types.CC_BY:
            license = CC_BY;
            break;
        case license_types.CC_BY_SA:
            license = CC_BY_SA;
            break;
        case license_types.CC_BY_NC:
            license = CC_BY_NC;
            break;
        case license_types.CC_BY_NC_SA:
            license = CC_BY_NC_SA;
            break;
        case license_types.CC_BY_ND:
            license = CC_BY_ND;
            break;
        case license_types.CC_BY_NC_ND:
            license = CC_BY_NC_ND;
            break;
        default:
            break;
    }

    switch (props.resource_type) {
        case resource_types.AUDIO:
            resource_type = audio;
            break;
        case resource_types.DOCUMENT:
            resource_type = document;
            break;
        case resource_types.PICTURE:
            resource_type = picture;
            break;
        case resource_types.VIDEO:
            resource_type = video;
            break;
        default:
            break;
    }

    const [{isDragging}, drag] = useDrag({
        item: {
            type: item_types.PRACTICE_RESOURCE,
            resource_id: props.resource_id
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    });

    if (props.inside_the_result_box) {
        return (
            <Grid container item direction={'row'} alignItems={'center'} ref={drag}
                  xs={3}
                  justify={'center'}
            >
                <Grid container item direction={'row'} ref={drag} xs={6} justify={'center'} className={styles.resource_container}>
                    <Grid item className={styles.resource_and_close_button}>
                        <IconButton className={styles.close_button} size={'small'}
                                    onClick={() => on_click_remove_resource(props.resource_id)}>
                            <CancelIcon/>
                        </IconButton>
                        <img className={styles.images} src={resource_type}/>
                    </Grid>
                    <img className={styles.images} src={license}/>
                </Grid>
            </Grid>
        );
    } else {
        return (
            <Grid container item direction={'row'} alignItems={'flex-end'}
                  xs={3}
                  justify={'center'}>
                <Grid container item direction={'row'} ref={drag} xs={10} justify={'center'} className={styles.resource_container}>
                    <img className={styles.images} src={resource_type}/>
                    <img className={styles.images} src={license}/>
                </Grid>
            </Grid>
        );
    }
};

export default ResourceInPracticeEditing;