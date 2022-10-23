import {addTodolistTC, changeTodolistEntityStatusAC, fetchTodolistTC, removeTodolistTC,} from "./todolistReducer";
import {GetTaskType, taskAPI, TaskPriorities, TaskStatuses} from "../../api/task-api";
import {AppRootStateType} from "../../app/store";
import {RequestStatusType, setStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export const fetchTasksTC = createAsyncThunk("tasks/fetchTasks", async ({todolistId}: { todolistId: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setStatusAC({status: 'loading'}))
    try {
        const res = await taskAPI.getTasks(todolistId)
        return {todolistId, tasks: res.items}
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue({})
    } finally {
        dispatch(setStatusAC({status: 'idle'}))
    }
})

export const removeTaskTC = createAsyncThunk("tasks/removeTasks", async ({
                                                                             todolistId,
                                                                             taskId
                                                                         }: { todolistId: string, taskId: string }, {
                                                                             dispatch,
                                                                             rejectWithValue
                                                                         }) => {
    dispatch(changeTaskStatusAC({todolistId, taskId, status: 'loading'}))
    try {
        const res = await taskAPI.deleteTask(todolistId, taskId)
        if (res.resultCode === 0) {
            return {todolistId, taskId}
        } else {
            handleServerAppError(res, dispatch)
            return rejectWithValue({})
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue({})
    } finally {
        dispatch(changeTaskStatusAC({todolistId, taskId, status: 'idle'}))
    }
})

export const addTaskTC = createAsyncThunk("tasks/addTask", async ({
                                                                      todolistId,
                                                                      title
                                                                  }: { todolistId: string, title: string }, {
                                                                      dispatch,
                                                                      rejectWithValue
                                                                  }) => {
    dispatch(changeTodolistEntityStatusAC({todolistId, status: 'loading'}))
    try {
        const res = await taskAPI.postTask(todolistId, title)
        if (res.resultCode === 0) {
            return {todolistId, task: res.data.item}
        } else {
            handleServerAppError(res, dispatch)
            return rejectWithValue({})
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue({})
    } finally {
        dispatch(changeTodolistEntityStatusAC({todolistId, status: 'idle'}))
    }
})

export const changeTaskTC = createAsyncThunk("tasks/changeTask", async ({
                                                                            todolistId,
                                                                            taskId,
                                                                            domainModel
                                                                        }: { todolistId: string, taskId: string, domainModel: UpdateDomainModelType }, {
                                                                            dispatch,
                                                                            rejectWithValue,
                                                                            getState
                                                                        }) => {
    dispatch(changeTaskStatusAC({todolistId, taskId, status: 'loading'}))
    const state = getState() as AppRootStateType
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
    try {
        const res = await taskAPI.updateTask(todolistId, taskId, APImodel)
        if (res.resultCode === 0) {
            return {todolistId, taskId, domainModel}
        } else {
            handleServerAppError(res, dispatch)
            return rejectWithValue({})
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue({})
    } finally {
        dispatch(changeTaskStatusAC({todolistId, taskId, status: 'idle'}))
    }
})

const slice = createSlice({
    name: "tasks",
    initialState: {} as TasksStateType,
    reducers: {
        changeTaskStatusAC(state, action: PayloadAction<{ todolistId: string, taskId: string, status: RequestStatusType }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(task => task.id === action.payload.taskId)
            if (index > -1) tasks[index].entityStatus = action.payload.status
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchTodolistTC.fulfilled, (state, action) => {
            action.payload.todolists.forEach(todolist => state[todolist.id] = [])
        })
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = []
        })
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            delete state[action.payload.todolistID]
        })
        builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks.map(task => ({...task, entityStatus: "idle"}))
        })
        builder.addCase(removeTaskTC.fulfilled, (state, action) => {
            state[action.payload.todolistId] = state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)
        })
        builder.addCase(addTaskTC.fulfilled, (state, action) => {
            state[action.payload.todolistId].unshift({...action.payload.task, entityStatus: "idle"})
        })
        builder.addCase(changeTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload!.todolistId]
            const index = tasks.findIndex(task => task.id === action.payload!.taskId)
            if (index > -1) tasks[index] = {...tasks[index], ...action.payload!.domainModel}
        })
    }
})

export const taskReducer = slice.reducer
export const {changeTaskStatusAC} = slice.actions

export type UpdateDomainModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
    entityStatus?: RequestStatusType
}

export type TasksStateType = {
    [key: string]: Array<GetTaskType & { entityStatus: RequestStatusType }>
}


