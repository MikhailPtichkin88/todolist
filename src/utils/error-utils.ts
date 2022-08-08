import {ResponseUpdateType} from "../api/task-api";
import {AppReducerActionType, setErrorAC, setStatusAC} from "../reducers/app-reducer";
import {Dispatch} from "redux";

type ErrorUtilsDispatchType = Dispatch<AppReducerActionType>

export const handleServerAppError = <T>(data: ResponseUpdateType<T>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setErrorAC(data.messages[0]))
    } else {
        dispatch(setErrorAC("Some error has occurred"))
    }
    dispatch(setStatusAC('failed'))
}

export const handleServerNetworkError = (error: {message:string}, dispatch:ErrorUtilsDispatchType)=>{
    dispatch(setStatusAC('failed'))
    dispatch(setErrorAC(error.message))
}

