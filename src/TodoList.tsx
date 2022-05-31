import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType, TaskType} from "./App";
import AddItemForm from "./components/AddItemForm";
import EditableSpan from "./components/EditableSpan";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (todoListId: string, taskId: string) => void
    changeFilter: (todoListId: string, taskFilter: FilterType) => void
    addTask: (todoListId: string, title: string) => void
    isDoneChange: (todoListId: string, taskId: string, isDone: boolean) => void
    filter: FilterType
    todoListId: string
    removeTodoList: (todoListId: string) => void
    editTodoList: (todoListId: string, title: string) => void
    editTask:(todoListId: string, taskId:string, newTitle:string)=> void
}

const TodoList = (props: PropsType) => {

    // const [title, setTitle] = useState('')
    // const [error, setError] = useState<null | string>(null)
    //
    // function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    //     setTitle(e.currentTarget.value)
    //     setError(null)
    // }

    // function onKeyDownHandler(e: KeyboardEvent<HTMLInputElement>) {
    //     if (e.ctrlKey && e.key === "Enter" && title.trim() !== "") {
    //         props.addTask(props.todoListId, title.trim())
    //         setTitle("")
    //     } else {
    //         setError("error")
    //     }
    // }
    //
    // function addTask() {
    //     if (title.trim() !== "") {
    //         props.addTask(props.todoListId, title.trim())
    //         setTitle("")
    //     } else {
    //         setError("error")
    //     }
    // }

    const editTodoList = (title: string) => {
        props.editTodoList(props.todoListId, title)
    }

    const removeTodoList = () => {
        props.removeTodoList(props.todoListId)
    }
    const changeFilterAll = () => {
        props.changeFilter(props.todoListId, "all")
    }
    const changeFilterActive = () => {
        props.changeFilter(props.todoListId, "active")
    }
    const changeFilterCompleted = () => {
        props.changeFilter(props.todoListId, "completed")
    }

    const addTaskHandler = (title: string) => {
        props.addTask(props.todoListId, title)
    }

    return (
        <div>
            <div className="list_header">
                <EditableSpan title={props.title}
                              callBack={editTodoList}
                              className="font_size"/>

                <button onClick={removeTodoList} className="delete_list_btn">x</button>
            </div>
            <AddItemForm callBack={addTaskHandler}/>

            <ul>
                {
                    props.tasks.map(t => {
                        const removeTask = () => props.removeTask(props.todoListId, t.id)
                        const onChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
                            props.isDoneChange(props.todoListId, t.id, e.currentTarget.checked)
                        }

                        const editTaskHandler=(title:string)=>{
                            props.editTask(props.todoListId, t.id, title)
                        }

                        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <input type="checkbox" checked={t.isDone} onChange={onChangeCheckbox}/>
                            <EditableSpan title={t.title} callBack={editTaskHandler}
                           />
                            {/*<span>{t.title}</span>*/}
                            <button onClick={removeTask} style={{marginLeft: 10}}>✖️</button>
                        </li>
                    })
                }
            </ul>
            <div className="btn_wrapper">
                <button className={(props.filter === "all") ? "active-filter" : ""}
                        onClick={changeFilterAll}>All
                </button>
                <button className={(props.filter === "active") ? "active-filter" : ""}
                        onClick={changeFilterActive}>Active
                </button>
                <button className={(props.filter === "completed") ? "active-filter" : ""}
                        onClick={changeFilterCompleted}>Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;