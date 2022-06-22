import {TasksStateType} from "../App";
import {v1} from "uuid";
import {TaskType} from "../Todolist";

export const tasksReducer = (tasks: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "ADD-TASK": {
            let newId = v1()
            let newTask: TaskType = {id: newId, title: action.payload.title, isDone: false}
            return {...tasks, [action.payload.todoListId]: [newTask, ...tasks[action.payload.todoListId]]}
        }
        case "REMOVE-TASK": {

            return {
                ...tasks,
                [action.payload.todoListId]: tasks[action.payload.todoListId].filter(t => t.id !== action.payload.taskId)
            }
        }
        case "CHANGE-STATUS": {

            return {
                ...tasks,
                [action.payload.todoListId]: tasks[action.payload.todoListId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    isDone: action.payload.status
                } : t)
            }
        }
        case "CHANGE-TASK-TITLE": {

            return {
                ...tasks,
                [action.payload.todoListId]: tasks[action.payload.todoListId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    title: action.payload.newTitle
                } : t)
            }
        }
        case "REMOVE-TODOLIST": {
            delete tasks[action.payload.todoListId]
            return tasks
        }
        case "ADD-TODOLIST": {

            return {...tasks, [action.payload.todoListId]: [
                    {id: v1(), title: "New Task", isDone: false},
                    {id: v1(), title: "New Task", isDone: false}
                ]}
        }

        default:
            return tasks
    }
}

type ActionType =
    addTaskACType
    | removeTaskACType
    | changeTaskStatusACType
    | changeTaskTitleACType
    | removeTodoListACType
    | addTodoListWithTasksACType

type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todoListId: string, title: string) => {
    return {
        type: "ADD-TASK",
        payload: {
            todoListId,
            title
        }
    } as const
}

type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todoListId: string, taskId: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            todoListId,
            taskId,
        }
    } as const
}

type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todoListId: string, taskId: string, status: boolean) => {
    return {
        type: "CHANGE-STATUS",
        payload: {
            todoListId,
            taskId,
            status,
        }
    } as const
}

type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (todoListId: string, taskId: string, newTitle: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        payload: {
            todoListId,
            taskId,
            newTitle,
        }
    } as const
}

type removeTodoListACType = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (todoListId: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {
            todoListId,
        }
    } as const
}

type addTodoListWithTasksACType = ReturnType<typeof addTodoListWithTasksAC>
export const addTodoListWithTasksAC = (todoListId: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {
            todoListId,
        }
    } as const
}