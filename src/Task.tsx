import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import DoneIcon from "@mui/icons-material/Done";
import {EditableSpan} from "./components/EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./App";
import {changeNameAC, changeStatusAC, removeTaskAC} from "./reducers/taskReducer";
import {useDispatch} from "react-redux";

type TaskPropsType={
    task:TaskType
    todolistId:string
}

const Task = React.memo(({task, todolistId}:TaskPropsType) => {
console.log("task render")

    const dispatch = useDispatch()
    // const taskClasses = task.isDone ? "is-done" : "";
    const changeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => dispatch(changeStatusAC(todolistId, task.id, e.currentTarget.checked)),[todolistId,task.id, dispatch])

    const changeTaskName = useCallback((title: string) => dispatch(changeNameAC(todolistId, task.id, title)),[todolistId, task.id, dispatch])
    const removeTaskHandler = useCallback(() => dispatch(removeTaskAC(todolistId,task.id)),[todolistId,task.id, dispatch])
    return (

        <li>
            <Checkbox   onChange={changeStatus}
                        checked={task.isDone}
                        icon={<CropSquareIcon />}
                        checkedIcon={<DoneIcon />}/>
            <EditableSpan title={task.title} callback={changeTaskName} />

            <IconButton onClick={removeTaskHandler} aria-label="delete">
                <Delete fontSize="small"/>
            </IconButton>
        </li>
    );
});

export default Task;