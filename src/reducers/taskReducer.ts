import {
    addTodolistACType, changeTodolistEntityStatusAC,
    removeTodolistACType,
    setTodolistsFromBackACType
} from "./todolistReducer";
import {GetTaskType, taskAPI, TaskPriorities, TaskStatuses} from "../api/task-api";
import {AppRootStateType, AppThunk} from "./store";
import {RequestStatusType, setErrorAC, setStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";


export type TasksType = {
    [key: string]: Array<GetTaskType & { entityStatus: RequestStatusType }>
}

let initialState = {}


export const taskReducer = (tasks: TasksType = initialState, action: tsarType): TasksType => {
    switch (action.type) {

        case "ADD-TASK":
            return {
                ...tasks,
                [action.payload.todolistId]: [...tasks[action.payload.todolistId], {
                    ...action.payload.task, entityStatus: 'idle'
                }]
            }

        case "REMOVE-TASK": {
            return {
                ...tasks,
                [action.payload.todolistID]: tasks[action.payload.todolistID].filter(t => t.id !== action.payload.taskId)
            }
        }

        case "CHANGE-TASK": {
            return {
                ...tasks,
                [action.payload.todolistId]: tasks[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    ...action.payload.domainModel
                } : t)
            }
        }

        case "CHANGE-NAME": {
            return {
                ...tasks,
                [action.payload.task.todoListId]: tasks[action.payload.task.todoListId].map(t => t.id === action.payload.task.id ? {
                    ...t,
                    title: action.payload.task.title
                } : t)
            }
        }

        case "ADD-TODOLIST":
            return {...tasks}

        case "REMOVE-TODOLIST": {
            delete tasks[action.payload.todolistID]
            return tasks
        }

        case "SET-TODOLISTS-FROM-BACK":
            let obj = {}
            action.payload.todolists.forEach(td => (Object.assign(obj, {[td.id]: []})))
            return {...tasks, ...obj}

        case "SET_TASKS":
            return {
                ...tasks,
                [action.payload.todolistIs]: action.payload.tasks.map(task => ({
                    ...task,
                    isDone: false,
                    entityStatus: 'idle'
                }))
            }

        case "CHANGE-TASK-ENTITY-STATUS":
            return {...tasks, [action.payload.todolistId]: tasks[action.payload.todolistId].map(task=>task.id===action.payload.taskId ? {...task, entityStatus: action.payload.status} : {...task})}

        default:
            return tasks
    }
}

export type tsarType =
    addTaskACType
    | removeTaskACType
    | changeStatusACType
    | changeNameACType
    | addTodolistACType
    | removeTodolistACType
    | setTodolistsFromBackACType
    | setTasksACType
    | changeTaskStatusACType

type addTaskACType = ReturnType<typeof addTaskAC>

export const addTaskAC = (todolistId: string, task: GetTaskType) => {
    return {
        type: "ADD-TASK",
        payload: {
            todolistId,
            task
        }
    } as const
}

type removeTaskACType = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (todolistID: string, taskId: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            todolistID,
            taskId,
        }
    } as const
}

type changeStatusACType = ReturnType<typeof changeTaskAC>

export const changeTaskAC = (todolistId: string, taskId: string, domainModel: UpdateDomainModelType) => {
    return {
        type: "CHANGE-TASK",
        payload: {
            todolistId,
            taskId,
            domainModel
        }
    } as const
}

type changeNameACType = ReturnType<typeof changeNameAC>

export const changeNameAC = (task: GetTaskType) => {
    return {
        type: "CHANGE-NAME",
        payload: {
            task
        }
    } as const
}

type setTasksACType = ReturnType<typeof setTasksAC>
export const setTasksAC = (todolistIs: string, tasks: Array<GetTaskType>) => {
    return {
        type: "SET_TASKS",
        payload: {
            todolistIs,
            tasks
        }
    } as const
}

type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todolistId: string, taskId: string, status: RequestStatusType) => {
    return {
        type: "CHANGE-TASK-ENTITY-STATUS",
        payload: {
            todolistId,
            taskId,
            status
        }
    } as const
}


export const setTasksTC = (todolistId: string): AppThunk => {
    return (dispatch) => {
        dispatch(setStatusAC('loading'))
        taskAPI.getTasks(todolistId)
            .then(res => {
                dispatch(setTasksAC(todolistId, res.items))
                dispatch(setStatusAC('succeeded'))
            })
    }
}

export const removeTaskTC = (todolistId: string, taskId: string): AppThunk => {
    return (dispatch) => {
        dispatch(changeTaskStatusAC(todolistId, taskId,'loading'))
        taskAPI.deleteTask(todolistId, taskId)
            .then(res => {
                if (res.resultCode === 0) {
                    dispatch(removeTaskAC(todolistId, taskId))
                    dispatch(changeTaskStatusAC(todolistId, taskId,'succeeded'))
                } else {
                    handleServerAppError(res, dispatch)
                }
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }
}

export const addTaskTC = (todolistId: string, title: string): AppThunk => {
    return (dispatch) => {
        dispatch(setStatusAC('loading'))
        taskAPI.postTask(todolistId, title)
            .then(res => {
                if (res.resultCode === 0) {
                    dispatch(addTaskAC(todolistId, res.data.item))
                    dispatch(setStatusAC('succeeded'))
                } else {
                    handleServerAppError(res, dispatch)
                }
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }
}

export type UpdateDomainModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
    entityStatus?: RequestStatusType
}

export const changeTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainModelType): AppThunk => {
    return (dispatch, getState: () => AppRootStateType) => {
        dispatch(changeTaskStatusAC(todolistId, taskId,'loading'))
        const state = getState()
        const task = state.tasks[todolistId].find(task => task.id === taskId)

        if (!task) {
            console.warn("Couldn't find task")
            return
        }
        let APImodel = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domainModel
        }

        taskAPI.updateTask(todolistId, taskId, APImodel)
            .then(res => {
                if (res.resultCode === 0) {
                    dispatch(changeTaskAC(todolistId, taskId, domainModel))
                    dispatch(changeTaskStatusAC(todolistId, taskId,'succeeded'))
                } else {
                    handleServerAppError(res, dispatch)
                }
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }
}
