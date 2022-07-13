import {FiltersType, TodolistsType} from "../App";
import {v1} from "uuid";


export let todolistID1 = v1();
export let todolistID2 = v1();

let initialState: Array<TodolistsType> = [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
]


export const todolistReducer = (todolists: Array<TodolistsType> =initialState, action: tsarType):Array<TodolistsType> => {
    switch (action.type) {
        case "ADD-TODOLIST": {
            const newTodolist: TodolistsType = {
                id: action.payload.todolistID,
                title: action.payload.title,
                filter: "all"
            }
            return [newTodolist, ...todolists]
        }
        case "REMOVE-TODOLIST": {
            return todolists.filter(t => t.id !== action.payload.todolistID)
        }
        case "CHANGE-TITLE": {
            return todolists.map(t=>t.id===action.payload.todolistID ? {...t, title:action.payload.title} : t)
        }
        case "CHANGE-FILTER": {
            return todolists.map(t => t.id === action.payload.todolistID ? {...t, filter: action.payload.filter} : t)
        }
        default:
            return todolists
    }
}

type tsarType = addTodolistACType | removeTodolistACType | changeFilterACType
    | changeTitleACType


export type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (todolistID: string, title: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {
            todolistID,
            title,
        }
    } as const
}

export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistID: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {
            todolistID,
        }
    } as const
}

type changeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todolistID: string, filter: FiltersType) => {
    return {
        type: "CHANGE-FILTER",
        payload: {
            todolistID,
            filter,
        }
    } as const
}

type changeTitleACType = ReturnType<typeof changeTitleAC>
export const changeTitleAC = (todolistID: string, title: string) => {
    return {
        type: "CHANGE-TITLE",
        payload: {
            todolistID,
            title,
        }
    } as const
}