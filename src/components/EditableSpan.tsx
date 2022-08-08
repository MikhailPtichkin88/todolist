import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField} from "@mui/material";
import {RequestStatusType} from "../reducers/app-reducer";

type EditableSpanPropsType = {
    title: string
    callback: (title: string) => void
    className?: string
    entityStatus:RequestStatusType
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {

    console.log('editableSpan rendered')
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState(props.title)
    let [error, setError] = useState(false)

    const setInputMode = () => {
        if(props.entityStatus!=='loading'){
            setEditMode(true)
            setTitle(props.title)
        }
    }

    const setSpanMode = () => setEditMode(false)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setTitle(e.currentTarget.value)
    }

    const changeTaskName = () => {
        setSpanMode()
        if (title.length > 0) {
            props.callback(title)
        } else {
            setError(true)
        }
    }
    const enterHandler = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
            if (title.length > 0) {
                props.callback(title)
                setSpanMode()
            } else {
                setError(true)
            }
        }
    }

    return (
        editMode
            ? <TextField value={title}
                         onBlur={changeTaskName}
                         onChange={onChangeHandler}
                         autoFocus
                         size="small"
                         onKeyDown={enterHandler}
                         error={error}
                         helperText={error?"Please type task":""}
                        style={{maxWidth:"60%"}}/>
            : <span onDoubleClick={setInputMode}
                    className={props.className}>{props.title}</span>
    )
})