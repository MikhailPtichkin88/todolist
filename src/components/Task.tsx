import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import DoneIcon from "@mui/icons-material/Done";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {
    changeTaskTC,
    removeTaskTC
} from "../reducers/taskReducer";
import {useAppDispatch} from "../reducers/hooks";
import {TaskStatuses} from "../api/task-api";

type TaskPropsType = {
    todolistId: string
    taskId: string,
    title: string
    status: TaskStatuses
}

const Task = React.memo((props: TaskPropsType) => {

    const dispatch = useAppDispatch()

    const removeTask = useCallback(() => dispatch(removeTaskTC(props.todolistId, props.taskId)), [props.todolistId, props.taskId, dispatch])

    const changeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskTC(props.todolistId, props.taskId, {status: (e.currentTarget.checked ? 2 : 1)})), [props.todolistId, props.taskId, dispatch])

    const changeTaskName = useCallback((title: string) => dispatch(changeTaskTC(props.todolistId, props.taskId, {title})), [props.todolistId, props.taskId, dispatch])

    const taskClasses = props.status > 1 ? "is-done" : "";
    return (
        <li>
            <Checkbox onChange={changeStatus}
                      checked={props.status > 1}
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