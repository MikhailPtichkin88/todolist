import React, {useCallback} from 'react';
import {FiltersType, TaskType} from "./App";
import AddItemForm from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import { Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./reducers/store";
import {changeFilterAC, changeTitleAC, removeTodolistAC} from "./reducers/todolistReducer";
import {addTaskAC} from "./reducers/taskReducer";
import Task from "./Task";

type PropsType = {
    title: string
    filter: FiltersType
    todolistID: string
    className?:string
}

const TodoList = React.memo(({title,filter,todolistID,className}: PropsType) => {
console.log("Todolist render")
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state=>state.tasks[todolistID])

    const changeFilterAll = useCallback(()=>{
       dispatch(changeFilterAC(todolistID, "all"))
    },[todolistID, dispatch])

    const changeFilterActive=useCallback(()=> {
        dispatch(changeFilterAC(todolistID, "active"))
    },[todolistID, dispatch])

    const changeFilterCompleted=useCallback(()=> {
        dispatch(changeFilterAC(todolistID, "completed"))
    },[todolistID, dispatch])

    const allBtnVariant = (filter === "all") ? "contained" : "outlined";
    const activeBtnVariant = (filter === "active") ? "contained" : "outlined";
    const completedBtnVariant = (filter === "completed") ? "contained" : "outlined";

    const addNewTaskHandler = useCallback((title: string) => {
        dispatch(addTaskAC(todolistID, title))
    },[todolistID, dispatch])

    const newTodoListTitleChanger = useCallback((title: string) => {
        dispatch(changeTitleAC(todolistID, title))
    },[todolistID, dispatch])

    const removeTodolistHandler = useCallback(() => {
        dispatch(removeTodolistAC(todolistID))
    },[todolistID, dispatch])

    let tasksForTodoList = tasks
    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone)
    }

    if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => !t.isDone)
    }

    return (
        <div >
            <h3>
                <EditableSpan title={title} callback={newTodoListTitleChanger} className="title"/>
                <IconButton  aria-label="delete" onClick={removeTodolistHandler}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm callback={addNewTaskHandler} title=""/>
            <ul className="list">
                {
                    tasksForTodoList.map(t => {

                        return (
                            <Task key={t.id} task={t} todolistId={todolistID}/>
                        )
                    })
                }
            </ul>
            <div>
                <Button style={{marginRight:"5px"}} color='primary' variant={allBtnVariant}  onClick={changeFilterAll}>All</Button>
                <Button style={{marginRight:"5px"}} color="secondary" variant={activeBtnVariant}  onClick={changeFilterActive}>Active</Button>
                <Button color="success" variant={completedBtnVariant} onClick={changeFilterCompleted}>Completed</Button>
            </div>
        </div>
    );
});

export default TodoList;

