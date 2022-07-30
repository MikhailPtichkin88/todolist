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
import {addTaskTC, setTasksTC,} from "./reducers/taskReducer";
import Task from "./components/Task";
import {useAppDispatch} from "./reducers/hooks";
import {GetTaskType} from "./api/task-api";

type PropsType = {
    title: string
    filter: FiltersType
    todolistID: string
    className?: string
}

const TodoList = React.memo((props: PropsType) => {
    console.log("todolist rendered")
    const dispatch = useAppDispatch()

    const tasks = useSelector<AppRootStateType, Array<GetTaskType>>(state => state.tasks[props.todolistID])

    const changeFilterAll = useCallback(() => {
        dispatch(changeFilterAC(props.todolistID, "all"))
    }, [props.todolistID, dispatch])

    const changeFilterActive = useCallback(() => {
        dispatch(changeFilterAC(props.todolistID, "active"))
    }, [props.todolistID, dispatch])

    const changeFilterCompleted = useCallback(() => {
        dispatch(changeFilterAC(props.todolistID, "completed"))
    }, [props.todolistID, dispatch])

    const allBtnVariant = (props.filter === "all") ? "contained" : "outlined";
    const activeBtnVariant = (props.filter === "active") ? "contained" : "outlined";
    const completedBtnVariant = (props.filter === "completed") ? "contained" : "outlined";

    const addNewTaskHandler = useCallback((title: string) => {
        dispatch(addTaskTC(props.todolistID, title))
    }, [props.todolistID, dispatch])

    const newTodoListTitleChanger = useCallback((title: string) => {
        dispatch(changeTodolistTitleTC(props.todolistID, title))
    }, [props.todolistID, dispatch])

    const removeTodolistHandler = useCallback(() => {
        dispatch(removeTodolistTC(props.todolistID))
    }, [props.todolistID, dispatch])

    let tasksForTodoList = tasks
    if (props.filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.status > 1)
    }

    if (props.filter === 'active') {
        tasksForTodoList = tasks.filter(t => t.status <= 1)
    }

    useEffect(() => {
        dispatch(setTasksTC(props.todolistID))
    }, [])

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} callback={newTodoListTitleChanger} className="title"/>
                <IconButton aria-label="delete" onClick={removeTodolistHandler}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm callback={addNewTaskHandler} title=""/>
            <ul className="list">
                {
                    tasksForTodoList && tasksForTodoList.map(t => {
                        return (
                            <Task key={t.id} todolistId={props.todolistID} taskId={t.id} title={t.title}
                                  status={t.status}/>
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

