import {taskReducer} from "./taskReducer";
import {todolistReducer} from "./todolistReducer";
import {combineReducers, createStore} from "redux";

const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists:todolistReducer,
})

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store