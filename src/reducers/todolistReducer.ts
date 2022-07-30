

import {Dispatch} from "redux";
import {todolistAPI} from "../api/todolist-api";
import {ThunkAction} from "redux-thunk";
import {AppThunk} from "./store";


export type TodolistFromBackType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type FiltersType = "all" | "completed" | "active"

export type TodolistType = TodolistFromBackType & {filter:FiltersType}

let initialState: Array<TodolistType> = [

]


export const todolistReducer = (todolists: Array<TodolistType> =initialState, action: tsarType):Array<TodolistType> => {
    switch (action.type) {
        case "ADD-TODOLIST": {
            const newTodolist: TodolistType = {
                id: action.payload.todolist.id,
                title: action.payload.todolist.title,
                addedDate: action.payload.todolist.addedDate,
                order: action.payload.todolist.order,
                filter: "all" as FiltersType
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

        case "SET-TODOLISTS-FROM-BACK":
            let arr = action.payload.todolists.map(td=>({id:td.id, title: td.title, addedDate: td.addedDate, order: td.order,  filter:"all"as FiltersType,}))
            return [...todolists, ...arr]

        default:
            return todolists
    }
}

type tsarType = addTodolistACType | removeTodolistACType | changeFilterACType
    | changeTitleACType | setTodolistsFromBackACType


export type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (todolist:TodolistFromBackType) => {
    return {
        type: "ADD-TODOLIST",
        payload: {
            todolist
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

export type setTodolistsFromBackACType = ReturnType<typeof setTodolistsFromBackAC>
export const setTodolistsFromBackAC = (todolists:Array<TodolistFromBackType>) => {
    return {
        type: "SET-TODOLISTS-FROM-BACK",
        payload: {
            todolists
        }
    } as const
}


export const setTodolistTC = ():AppThunk =>{
    return (dispatch) => {
        todolistAPI.getMyTodolists()
            .then(res=>{
                dispatch(setTodolistsFromBackAC(res.data))
            })
    }
}

export const addTodolistTC = (title:string):AppThunk =>{
    return (dispatch) => {
        todolistAPI.addNewTodolist(title)
            .then(res=>{
                dispatch(addTodolistAC(res.data.data.item))
            })
    }
}

export const removeTodolistTC = (todolistId:string):AppThunk =>{
    return (dispatch) => {
        todolistAPI.deleteTodolist(todolistId)
            .then(res=>{
                if(res.data.resultCode === 0){
                    dispatch(removeTodolistAC(todolistId))
                } else {
                    console.log("Error occurred during delete todolist operation")
                }
            })
    }
}

export const changeTodolistTitleTC = (todolistId:string, title:string):AppThunk =>{
    return (dispatch) => {
        todolistAPI.updateTodolist(todolistId, title)
            .then(res=>{
                console.log(res)
                if(res.data.resultCode === 0){
                    dispatch(changeTitleAC(todolistId,title))
                } else {
                    console.log("Error occurred during change title of todolist operation")
                }
            })
    }
}


export default tsarType

