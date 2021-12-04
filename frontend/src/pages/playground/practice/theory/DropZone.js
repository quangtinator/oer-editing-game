import React from 'react';
import DescriptionInPracticeTheory from "./DescriptionInPracticeTheory";
import Grid from "@material-ui/core/Grid";
import {useDrop} from "react-dnd";
import {item_types} from "../../../../definitions/Types";

const DropZone = (props) => {
    const index = props.index;
    const description = props.description;
    const swap_position_of_two_rows = props.swap_position_of_two_rows;
    const reset_color = props.reset_color;

    const [{is_over}, drop] = useDrop({
        accept: item_types.PRACTICE_THEORY,
        drop: (item, monitor) => {
            swap_position_of_two_rows(item.position, index);
            reset_color();
        },
        collect: monitor => ({
            is_over: !!monitor.isOver()
        })
    });

    return (
        <Grid container item xs={7} ref={drop} justify={'flex-start'} alignItems={'center'}>
            <DescriptionInPracticeTheory description={description} position={index} is_over={is_over}/>
        </Grid>
    );
};

export default DropZone;