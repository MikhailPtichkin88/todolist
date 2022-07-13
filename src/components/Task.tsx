import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import DoneIcon from "@mui/icons-material/Done";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {changeNameAC, changeStatusAC, removeTaskAC} from "../reducers/taskReducer";

type TaskPropsType = {
    todolistId: string
    taskId: string,
    title: string
    isDone: boolean
}

const Task = React.memo((props: TaskPropsType) => {

    const dispatch = useDispatch()
    const removeTask = useCallback(() => dispatch(removeTaskAC(props.todolistId, props.taskId)), [props.todolistId, props.taskId, dispatch])
    const changeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => dispatch(changeStatusAC(props.todolistId, props.taskId, e.currentTarget.checked)), [props.todolistId, props.taskId, dispatch])
    const changeTaskName = useCallback((title: string) => dispatch(changeNameAC(props.todolistId, props.taskId, title)), [props.todolistId, props.taskId, dispatch])

    const taskClasses = props.isDone ? "is-done" : "";
    return (
        <li>
            <Checkbox onChange={changeStatus}
                      checked={props.isDone}
                      icon={<CropSquareIcon/>}
                      checkedIcon={<DoneIcon/>}/>
            <EditableSpan title={props.title} callback={changeTaskName} className={taskClasses}/>

            <IconButton onClick={removeTask} aria-label="delete">
                <Delete fontSize="small"/>
            </IconButton>
        </li>
    );
});

export default Task;