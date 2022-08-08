import {Dispatch} from "redux";
import {todolistAPI} from "../api/todolist-api";
import {ThunkAction} from "redux-thunk";
import {AppThunk} from "./store";
import {RequestStatusType, setErrorAC, setStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";


export type TodolistFromBackType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type FiltersType = "all" | "completed" | "active"

export type TodolistType = TodolistFromBackType & { filter: FiltersType, entityStatus: RequestStatusType }

let initialState: Array<TodolistType> = []


export const todolistReducer = (todolists: Array<TodolistType> = initialState, action: tsarType): Array<TodolistType> => {
    switch (action.type) {
        case "ADD-TODOLIST": {
            const newTodolist: TodolistType = {
                id: action.payload.todolist.id,
                title: action.payload.todolist.title,
                addedDate: action.payload.todolist.addedDate,
                order: action.payload.todolist.order,
                filter: "all" as FiltersType,
                entityStatus:"idle"
            }
            return [newTodolist, ...todolists]
        }
        case "REMOVE-TODOLIST": {
            return todolists.filter(t => t.id !== action.payload.todolistID)
        }
        case "CHANGE-TITLE": {
            return todolists.map(t => t.id === action.payload.todolistID ? {...t, title: action.payload.title} : t)
        }
        case "CHANGE-FILTER": {
            return todolists.map(t => t.id === action.payload.todolistID ? {...t, filter: action.payload.filter} : t)
        }
        case "CHANGE-TODOLIST-ENTITY-STATUS": {
            return todolists.map(t => t.id === action.payload.todolistId ? {...t, entityStatus: action.payload.status} : t)
        }

        case "SET-TODOLISTS-FROM-BACK":
            let arr: TodolistType[] = action.payload.todolists.map(td => ({
                id: td.id,
                title: td.title,
                addedDate: td.addedDate,
                order: td.order,
                filter: "all" as FiltersType,
                entityStatus:"idle",
            }))
            return [...todolists, ...arr]

        default:
            return todolists
    }
}

type tsarType = addTodolistACType | removeTodolistACType | changeFilterACType
    | changeTitleACType | setTodolistsFromBackACType | changeTodolistEntityStatusACType
export default tsarType

export type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (todolist: TodolistFromBackType) => {
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
export const setTodolistsFromBackAC = (todolists: Array<TodolistFromBackType>) => {
    return {
        type: "SET-TODOLISTS-FROM-BACK",
        payload: {
            todolists
        }
    } as const
}

type changeTodolistEntityStatusACType = ReturnType<typeof changeTodolistEntityStatusAC>
export const changeTodolistEntityStatusAC = (todolistId:string, status:RequestStatusType)=>{
    return {
        type: "CHANGE-TODOLIST-ENTITY-STATUS",
        payload:{
            todolistId,
            status
        }
    }as const
}

export const setTodolistTC = (): AppThunk => {
    return (dispatch) => {
        dispatch(setStatusAC("loading"))
        todolistAPI.getMyTodolists()
            .then(res => {
                dispatch(setTodolistsFromBackAC(res.data))
                dispatch(setStatusAC("succeeded"))
            })
    }
}

export const addTodolistTC = (title: string): AppThunk => {
    return (dispatch) => {
        dispatch(setStatusAC("loading"))
        todolistAPI.addNewTodolist(title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTodolistAC(res.data.data.item))
                    dispatch(setStatusAC("succeeded"))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch(error=>{
                handleServerNetworkError(error, dispatch)
            })
    }
}

export const removeTodolistTC = (todolistId: string): AppThunk => {
    return (dispatch) => {
        dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
        todolistAPI.deleteTodolist(todolistId)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTodolistAC(todolistId))
                    dispatch(changeTodolistEntityStatusAC(todolistId,'succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch(error=>{
                handleServerNetworkError(error, dispatch)
            })
    }
}

export const changeTodolistTitleTC = (todolistId: string, title: string): AppThunk => {
    return (dispatch) => {
        todolistAPI.updateTodolist(todolistId, title)
            .then(res => {
                console.log(res)
                if (res.data.resultCode === 0) {
                    dispatch(changeTitleAC(todolistId, title))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch(error=>{
                handleServerNetworkError(error, dispatch)
            })
    }
}


