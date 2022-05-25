import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterType = "all" | "active" | "completed"

type TodoListsType = {
    id: string
    title: string
    filter: FilterType
}

type TodolistType = {
    [key: string]: Array<TaskType>
}

function App() {
    let todoListId1 = v1()
    let todoListId2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"}
    ])

    const [tasks, setTasks] = useState<TodolistType>({
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Vegetables", isDone: false},
            {id: v1(), title: "CornFlakes", isDone: false},
            {id: v1(), title: "Flour", isDone: false}
        ],
    })

    function isDoneChange(todoListId: string, taskId: string, isDone: boolean) {
        let tasks1 = tasks[todoListId]
        let task = tasks1.find(el => el.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks({...tasks})
    }

    function addTask(todoListId: string, title: string) {
        let newTask: TaskType = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }

    function removeTask(todoListId: string, taskId: string) {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(el => el.id !== taskId)})
    }

    function changeFilter(todoListId: string, taskFilter: FilterType) {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: taskFilter} : tl))
    }


    return (
        <div className="App">
            {
                todoLists.map(tl => {
                    let filteredTasks = tasks[tl.id]
                    if (tl.filter === "completed") {
                        filteredTasks = tasks[tl.id].filter(t => t.isDone)
                    }
                    if (tl.filter === "active") {
                        filteredTasks = tasks[tl.id].filter(t => !t.isDone)
                    }

                    return <TodoList
                        key={tl.id}
                        todoListId={tl.id}
                        title={tl.title}
                        tasks={filteredTasks}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        isDoneChange={isDoneChange}
                        filter={tl.filter}/>
                })
            }
        </div>
    );
}

export default App;
