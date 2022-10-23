import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {authApi} from "../api/auth-api";
import {setIsLoggedIn} from "../features/Login/auth-reducer";

export const initializeAppTC = createAsyncThunk("app/initialize", async (params, {dispatch, rejectWithValue}) => {
    dispatch(setStatusAC({status: "loading"}))
    try {
        const res = await authApi.me()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedIn({isLoggedIn: true}))
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue({})
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue({})
    } finally {
        dispatch(setIsInitialized({isInitialized: true}))
        dispatch(setStatusAC({status: "idle"}))
    }
})

const slice = createSlice({
    name: "app",
    initialState: {
        status: "idle",
        error: null,
        isInitialized: false,
    } as InitialStateType,
    reducers: {
        setStatusAC: (state: InitialStateType, action: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = action.payload.status
        },
        setErrorAC: (state: InitialStateType, action: PayloadAction<{ error: null | string }>) => {
            state.error = action.payload.error
        },
        setIsInitialized(state, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized
        }
    }
})

export const appReducer = slice.reducer
export const {setStatusAC, setErrorAC, setIsInitialized} = slice.actions

export type RequestStatusType = "loading" | "idle" | "succeeded" | "failed"
type InitialStateType = {
    status: RequestStatusType,
    error: null | string
    isInitialized: boolean
}