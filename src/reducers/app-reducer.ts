import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = "loading" | "idle" | "succeeded" | "failed"
type InitialStateType = {
    status:  RequestStatusType,
    error:  null | string
    isInitialized:boolean
}

export const initializeAppTC = createAsyncThunk("app/initialize", async(params,thunkAPI)=>{})

const slice = createSlice({
    name:"app",
    initialState:{
        status: "idle",
        error: null,
        isInitialized:false,
    } as InitialStateType,
    reducers:{
        setStatusAC:(state:InitialStateType,action:PayloadAction<{status: RequestStatusType }>)=>{
            state.status = action.payload.status
        },
        setErrorAC:(state:InitialStateType,action:PayloadAction<{error: null | string }>)=>{
            state.error = action.payload.error
        }
    },
    extraReducers:builder => {
        builder.addCase(initializeAppTC.fulfilled, (state, action)=>{
            state.isInitialized = true
        })
    }
})

export const appReducer = slice.reducer
export const {setStatusAC,setErrorAC} = slice.actions

