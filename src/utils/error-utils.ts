import {ResponseUpdateType} from "../api/task-api";
import {setErrorAC, setStatusAC} from "../app/app-reducer";
import {Dispatch} from "redux";




export const handleServerAppError = <T>(data: ResponseUpdateType<T>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setErrorAC({error:data.messages[0]}))
    } else {
        dispatch(setErrorAC({error:"Some error has occurred"}))
    }
    dispatch(setStatusAC({status:'failed'}))
}

export const handleServerNetworkError = (error: {message:string}, dispatch:Dispatch)=>{
    dispatch(setStatusAC({status:'failed'}))
    dispatch(setErrorAC({error:error.message}))
}

