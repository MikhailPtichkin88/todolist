import React, {useCallback, useEffect} from 'react';
import AddItemForm from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./reducers/store";
import {
    changeFilterAC,
    changeTodolistTitleTC,
    FiltersType,
    removeTodolistTC
} from "./reducers/todolistReducer";
import {addTaskTC, fetchTasksTC,} from "./reducers/taskReducer";
import Task from "./components/Task";
import {useAppDispatch} from "./reducers/hooks";
import {GetTaskType} from "./api/task-api";
import {RequestStatusType} from "./reducers/app-reducer";

type PropsType = {
    title: string
    filter: FiltersType
    todolistID: string
    className?: string
    entityStatus:RequestStatusType
}

const TodoList = React.memo(({title,filter,todolistID,className,entityStatus}: PropsType) => {
    console.log("todolist rendered")
    const dispatch = useAppDispatch()

    const tasks = useSelector<AppRootStateType, Array<GetTaskType & { entityStatus: RequestStatusType }>>(state => state.tasks[todolistID])

    const changeFilterAll = useCallback(() => {
        dispatch(changeFilterAC({todolistID, filter:"all"}))
    }, [todolistID, dispatch])

    const changeFilterActive = useCallback(() => {
        dispatch(changeFilterAC({todolistID, filter:"active"}))
    }, [todolistID, dispatch])

    const changeFilterCompleted = useCallback(() => {
        dispatch(changeFilterAC({todolistID, filter:"completed"}))
    }, [todolistID, dispatch])

    const allBtnVariant = (filter === "all") ? "contained" : "outlined";
    const activeBtnVariant = (filter === "active") ? "contained" : "outlined";
    const completedBtnVariant = (filter === "completed") ? "contained" : "outlined";

    const addNewTaskHandler = useCallback((title: string) => {
        dispatch(addTaskTC({todolistId:todolistID, title}))
    }, [todolistID, dispatch])

    const newTodoListTitleChanger = useCallback((title: string) => {
        dispatch(changeTodolistTitleTC({todolistId:todolistID, title}))
    }, [todolistID, dispatch])

    const removeTodolistHandler = useCallback(() => {
        dispatch(removeTodolistTC({todolistId:todolistID}))
    }, [todolistID, dispatch])

    let tasksForTodoList = tasks
    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.status > 1)
    }

    if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => t.status <= 1)
    }

    useEffect(() => {
        dispatch(fetchTasksTC({todolistId:todolistID}))
    }, [])

    return (
        <div>
            <h3>
                <EditableSpan title={title} callback={newTodoListTitleChanger} className="title" entityStatus={entityStatus}/>
                <IconButton aria-label="delete" onClick={removeTodolistHandler} disabled={entityStatus==="loading"as RequestStatusType}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm callback={addNewTaskHandler} title="" disabled={entityStatus==='loading'}/>
            <ul className="list">
                {
                    tasksForTodoList && tasksForTodoList.map(t => {
                        return (
                            <Task key={t.id} todolistId={todolistID} taskId={t.id} title={t.title}
                                  status={t.status} entityStatus={t.entityStatus}/>
                        )
                    })
                }
            </ul>
            <div>
                <Button style={{marginRight: "5px"}} color='primary' variant={allBtnVariant}
                        onClick={changeFilterAll}>All</Button>
                <Button style={{marginRight: "5px"}} color="secondary" variant={activeBtnVariant}
                        onClick={changeFilterActive}>Active</Button>
                <Button color="success" variant={completedBtnVariant} onClick={changeFilterCompleted}>Completed</Button>
            </div>
        </div>
    );
});

export default TodoList;

