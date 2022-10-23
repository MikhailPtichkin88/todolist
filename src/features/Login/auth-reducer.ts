import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setStatusAC} from "../../app/app-reducer";
import {authApi, LoginDataType} from "../../api/auth-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";


export const LoginTC = createAsyncThunk("auth/LoginTC", async (params: LoginDataType, {dispatch, rejectWithValue}) => {
    dispatch(setStatusAC({status: 'loading'}))
    try {
        const res = await authApi.login(params)
        if (res.data.resultCode === 0) {
            return {isLoggedIn: true}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue({errors: res.data.messages, fieldsErrors:res.data.fieldsErrors})
        }
    } catch (e) {
        handleServerNetworkError({message: e.message}, dispatch)
        return rejectWithValue({errors: [e.message], fieldsErrors:undefined})
    } finally {
        dispatch(setStatusAC({status: 'idle'}))
    }
})

export const LogoutTC = createAsyncThunk("auth/LogoutTC", async (params, {dispatch, rejectWithValue}) => {
    dispatch(setStatusAC({status: 'loading'}))
    try {
        const res = await authApi.logout()
        if (res.data.resultCode === 0) {
            return {isLoggedIn: false}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue({})
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue({})
    } finally {
        dispatch(setStatusAC({status: 'idle'}))
    }
})

const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
    } as InitialStateType,
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
            state.isLoggedIn = action.payload.isLoggedIn
        },
    },
    extraReducers: builder => {
        builder.addCase(LoginTC.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
        })
        builder.addCase(LogoutTC.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
        })
    }
})

export const authReducer = slice.reducer
export const {setIsLoggedIn} = slice.actions

type InitialStateType = {
    isLoggedIn: boolean
}