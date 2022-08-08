type InitialStateType = typeof initialState
export type RequestStatusType = "loading" | "idle" | "succeeded" | "failed"

const initialState = {
    status: "idle" as RequestStatusType,
    error: null as null | string
}

export const appReducer = (state: InitialStateType = initialState, action: AppReducerActionType) => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return {...state, status: action.payload.status}
        case "APP/SET-ERROR":
            return {...state, error: action.payload.error}
        default:
            return state
    }
}

export type AppReducerActionType = SetStatusType | SetErrorType

type SetStatusType = ReturnType<typeof setStatusAC>
export const setStatusAC = (status:RequestStatusType)=>{
    return {
        type: "APP/SET-STATUS",
        payload:{
            status
        }
    }as const
}


type SetErrorType = ReturnType<typeof setErrorAC>
export const setErrorAC = (error:null | string)=>{
    return {
        type: "APP/SET-ERROR",
        payload:{
            error
        }
    }as const
}

