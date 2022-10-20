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
import {RequestStatusType} from "../reducers/app-reducer";
import {useSelector} from "react-redux";

type TaskPropsType = {
    todolistId: string
    taskId: string,
    title: string
    status: TaskStatuses
    entityStatus:RequestStatusType
}

const Task = React.memo(({todolistId,taskId,title,status,entityStatus}: TaskPropsType) => {

    const dispatch = useAppDispatch()
    const removeTask = useCallback(() => dispatch(removeTaskTC({todolistId,taskId})), [todolistId, taskId, dispatch])

    const changeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) =>
        dispatch(changeTaskTC({
            todolistId,
            taskId,
            domainModel:{status: e.currentTarget.checked ? 2 : 1}
        })), [todolistId, taskId, dispatch])

    const changeTaskName = useCallback((title: string) => dispatch(changeTaskTC({todolistId,taskId,domainModel:{title}})), [todolistId, taskId, dispatch])

    const taskClasses = status > 1 ? "is-done" : "";
    return (
        <li>
            <Checkbox onChange={changeStatus}
                      checked={status > 1}
                      icon={<CropSquareIcon/>}
                      checkedIcon={<DoneIcon/>}/>
            <EditableSpan title={title} callback={changeTaskName} className={taskClasses} entityStatus={entityStatus}/>

            <IconButton onClick={removeTask} aria-label="delete" disabled={entityStatus==="loading"}>
                <Delete fontSize="small"/>
            </IconButton>
        </li>
    );
});

export default Task;