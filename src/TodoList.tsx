import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType, TaskType} from "./App";

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
}

const TodoList = (props: PropsType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<null | string>(null)

    function onInputChange(e: ChangeEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value)
        setError(null)
    }

    function onKeyDownHandler(e: KeyboardEvent<HTMLInputElement>) {
        if (e.ctrlKey && e.key === "Enter" && title.trim() !== "") {
            props.addTask(props.todoListId, title.trim())
            setTitle("")
        } else {
            setError("error")
        }
    }

    function addTask() {
        if (title.trim() !== "") {
            props.addTask(props.todoListId, title.trim())
            setTitle("")
        } else {
            setError("error")
        }
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
    return (
        <div>
            <h3>{props.title}
                <button onClick={removeTodoList}>x</button>
            </h3>
            <div>
                <input onChange={onInputChange}
                       value={title}
                       onKeyDown={onKeyDownHandler}
                       className={error ? "error" : ""}/>
                <button onClick={addTask}>+</button>
                {error ? <div className="error-message">Please type task</div> : null}
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        const removeTask = () => props.removeTask(props.todoListId, t.id)
                        const onChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
                            props.isDoneChange(props.todoListId, t.id, e.currentTarget.checked)
                        }
                        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <input type="checkbox" checked={t.isDone} onChange={onChangeCheckbox}/>
                            <span>{t.title}</span>
                            <button onClick={removeTask} style={{marginLeft: 10}}>✖️</button>
                        </li>
                    })
                }
            </ul>
            <div>
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