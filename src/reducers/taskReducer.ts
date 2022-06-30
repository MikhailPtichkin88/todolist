import {v1} from "uuid";
import {addTodolistACType, removeTodolistACType, todolistID1, todolistID2} from "./todolistReducer";
import {TaskType} from "../App";

let initialState = {
    [todolistID1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ],
    [todolistID2]: [
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "Potato", isDone: true},
        {id: v1(), title: "Tomatoes", isDone: false},
        {id: v1(), title: "Fish", isDone: false},
        {id: v1(), title: "Fruits", isDone: false},
    ]
}
type InitialStateType = typeof initialState

export const taskReducer = (tasks: InitialStateType = initialState, action: tsarType):InitialStateType => {
    switch (action.type) {
        case "ADD-TASK": {
            let newTask: TaskType = {id: v1(), title: action.payload.title, isDone: false}
            return {...tasks, [action.payload.todolistID]: [newTask, ...tasks[action.payload.todolistID]]}

        }
        case "REMOVE-TASK": {

            return {
                ...tasks,
                [action.payload.todolistID]: tasks[action.payload.todolistID].filter(t => t.id !== action.payload.taskId)
            }
        }
        case "CHANGE-STATUS": {
            return {
                ...tasks,
                [action.payload.todolistID]: tasks[action.payload.todolistID].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    isDone: action.payload.isDone
                } : t)
            }
        }
        case "CHANGE-NAME": {
            return {
                ...tasks,
                [action.payload.todolistID]: tasks[action.payload.todolistID].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    title: action.payload.title
                } : t)
            }
        }
        case "ADD-TODOLIST": {
            return {
                ...tasks, [action.payload.todolistID]: [
                    {id: v1(), title: "new Task", isDone: false},
                    {id: v1(), title: "new Task", isDone: false},
                    {id: v1(), title: "new Task", isDone: false},
                ]
            }
        }
        case "REMOVE-TODOLIST": {
            delete tasks[action.payload.todolistID]
            return tasks
        }
        default:
            return tasks
    }
}

type tsarType =
    addTaskACType
    | removeTaskACType
    | changeStatusACType
    | changeNameACType
    | addTodolistACType
    | removeTodolistACType

type addTaskACType = ReturnType<typeof addTaskAC>

export const addTaskAC = (todolistID: string, title: string) => {
    return {
        type: "ADD-TASK",
        payload: {
            title,
            todolistID,
        }
    } as const
}

type removeTaskACType = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (todolistID: string, taskId: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            todolistID,
            taskId,
        }
    } as const
}

type changeStatusACType = ReturnType<typeof changeStatusAC>

export const changeStatusAC = (todolistID: string, taskId: string, isDone: boolean) => {
    return {
        type: "CHANGE-STATUS",
        payload: {
            todolistID,
            taskId,
            isDone,
        }
    } as const
}

type changeNameACType = ReturnType<typeof changeNameAC>

export const changeNameAC = (todolistID: string, taskId: string, title: string) => {
    return {
        type: "CHANGE-NAME",
        payload: {
            todolistID,
            taskId,
            title,
        }
    } as const
}