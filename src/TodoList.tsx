import React, {ChangeEvent} from 'react';
import {FiltersType, TasksType, TaskType} from "./App";
import AddItemForm from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {AppBar, Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import CropSquareIcon from '@mui/icons-material/CropSquare';
import DoneIcon from '@mui/icons-material/Done';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./reducers/store";
import {changeFilterAC, changeTitleAC, removeTodolistAC} from "./reducers/todolistReducer";
import {addTaskAC, changeNameAC, changeStatusAC, removeTaskAC} from "./reducers/taskReducer";

type PropsType = {
    title: string
    filter: FiltersType
    todolistID: string
    className?:string
}

const TodoList = (props: PropsType) => {

    const dispatch = useDispatch()
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state=>state.tasks[props.todolistID])

    function changeFilterAll() {
       dispatch(changeFilterAC(props.todolistID, "all"))
    }

    function changeFilterActive() {
        dispatch(changeFilterAC(props.todolistID, "active"))
    }

    function changeFilterCompleted() {
        dispatch(changeFilterAC(props.todolistID, "completed"))
    }

    const allBtnVariant = (props.filter === "all") ? "contained" : "outlined";
    const activeBtnVariant = (props.filter === "active") ? "contained" : "outlined";
    const completedBtnVariant = (props.filter === "completed") ? "contained" : "outlined";

    const addNewTaskHandler = (title: string) => {
        dispatch(addTaskAC(props.todolistID, title))
    }

    const newTodoListTitleChanger = (title: string) => {
        dispatch(changeTitleAC(props.todolistID, title))
    }

    const removeTodolistHandler = () => {
        dispatch(removeTodolistAC(props.todolistID))
    }

    let tasksForTodoList = tasks
    if (props.filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone)
    }

    if (props.filter === 'active') {
        tasksForTodoList = tasks.filter(t => !t.isDone)
    }

    return (
        <div >
            <h3>
                <EditableSpan title={props.title} callback={newTodoListTitleChanger} className="title"/>
                <IconButton  aria-label="delete" onClick={removeTodolistHandler}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm callback={addNewTaskHandler} title=""/>
            <ul className="list">
                {

                    tasksForTodoList.map(t => {
                        const removeTask = () => dispatch(removeTaskAC(props.todolistID, t.id))
                        const taskClasses = t.isDone ? "is-done" : "";
                        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => dispatch(changeStatusAC(props.todolistID, t.id, e.currentTarget.checked))
                        const changeTaskName = (title: string) => dispatch(changeNameAC(props.todolistID, t.id, title))

                        return <li key={t.id}>
                            <Checkbox   onChange={changeStatus}
                                        checked={t.isDone}
                                        icon={<CropSquareIcon />}
                                        checkedIcon={<DoneIcon />}/>
                            <EditableSpan title={t.title} callback={changeTaskName} className={taskClasses}/>

                            <IconButton onClick={removeTask} aria-label="delete">
                                <Delete fontSize="small"/>
                            </IconButton>
                        </li>
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
};

export default TodoList;

