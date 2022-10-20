import {todolistAPI} from "../api/todolist-api";
import {RequestStatusType, setStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


export type TodolistFromBackType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type FiltersType = "all" | "completed" | "active"

export type TodolistType = TodolistFromBackType & { filter: FiltersType, entityStatus: RequestStatusType }

let initialState: Array<TodolistType> = []


export const fetchTodolistTC = createAsyncThunk("todolists/fetchTodolists", async (params, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setStatusAC({status: "loading"}))
    const res = await todolistAPI.getMyTodolists()
    try {
        return {todolists: res.data}
    } catch (error) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue({})
    } finally {
        dispatch(setStatusAC({status: "idle"}))
    }
})

export const addTodolistTC = createAsyncThunk("todolists/addTodolist", async (params: { title: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setStatusAC({status: "loading"}))
    const res = await todolistAPI.addNewTodolist(params.title)
    try {
        if (res.data.resultCode === 0) {
            return {todolist: res.data.data.item}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue({})
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue({})
    } finally {
        dispatch(setStatusAC({status: "idle"}))
    }

})

export const removeTodolistTC = createAsyncThunk("todolists/removeTodolist", async (params: { todolistId: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(changeTodolistEntityStatusAC({todolistId: params.todolistId, status: 'loading'}))
    const res = await todolistAPI.deleteTodolist(params.todolistId)
    try {
        if (res.data.resultCode === 0) {
            return {todolistID: params.todolistId}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue({})
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue({})
    } finally {
        dispatch(changeTodolistEntityStatusAC({todolistId: params.todolistId, status: 'idle'}))
    }
})

export const changeTodolistTitleTC = createAsyncThunk("todolists/changeTodolistTitle", async (params: { todolistId: string, title: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(changeTodolistEntityStatusAC({todolistId: params.todolistId, status: 'loading'}))

    const res = await todolistAPI.updateTodolist(params.todolistId, params.title)
    try {
        if (res.data.resultCode === 0) {
            return {todolistID: params.todolistId, title: params.title}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue({})
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue({})
    } finally {
        dispatch(changeTodolistEntityStatusAC({todolistId: params.todolistId, status: 'idle'}))
    }
})


const slice = createSlice({
    name: "todolists",
    initialState: [] as Array<TodolistType>,
    reducers: {
        changeFilterAC(state, action: PayloadAction<{ todolistID: string, filter: FiltersType }>) {
            const index = state.findIndex(td => td.id === action.payload.todolistID)
            state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ todolistId: string, status: RequestStatusType }>) {
            const index = state.findIndex(td => td.id === action.payload.todolistId)
            state[index].entityStatus = action.payload.status
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchTodolistTC.fulfilled, (state, action) => {
            state = action.payload.todolists.map(td => ({...td, filter: "all", entityStatus: "idle"}))
        })
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state.unshift({...action.payload.todolist, filter: "all", entityStatus: "idle"})
        })
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.todolistID)
            state.splice(index, 1)
        })
        builder.addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.todolistID)
            state[index].title = action.payload.title
        })
    }
})

export const todolistReducer = slice.reducer
export const {changeFilterAC, changeTodolistEntityStatusAC} = slice.actions








