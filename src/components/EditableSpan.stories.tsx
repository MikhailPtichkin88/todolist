import AddItemForm from "./AddItemForm";
import React from "react";
import {action} from '@storybook/addon-actions';
import {EditableSpan} from "./EditableSpan";



export default {
    title: "EditableSpan component",
    component: EditableSpan,
}

const callback = action("Value changed")

export const EditableSpanBaseExample = (props: any) => {

    return   (
        <EditableSpan title={"Start value"} callback={callback} className={""}/>
    )
}