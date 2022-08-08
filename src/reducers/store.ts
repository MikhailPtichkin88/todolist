import {taskReducer, tsarType} from "./taskReducer";
import tsarType1 from "./todolistReducer";
import {todolistReducer} from "./todolistReducer";
import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {appReducer, AppReducerActionType} from "./app-reducer";

const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistReducer,
    app:appReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionType>
export type AppActionType = tsarType | tsarType1 | AppReducerActionType


export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    AppRootStateType,
    unknown,
    AppActionType>

// @ts-ignore
window.store = store