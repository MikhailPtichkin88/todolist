import axios, {AxiosResponse} from 'axios';
type GetResponseType ={
    items: Array<GetTaskType>
    totalCount: number
    error: string
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
}

export type GetTaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string | null
    deadline: string | null
}

export type ResponseUpdateType<T = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: Array<string>
    data: T
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '9df85157-ef47-4383-94d5-5e90e6d2a59b'
    }
})

export const taskAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetResponseType>(`todo-lists/${todolistId}/tasks`)
            .then(res => res.data)
    },

    postTask(todolistId: string, title: string) {
        return instance.post<ResponseUpdateType<{item:GetTaskType}>>(`todo-lists/${todolistId}/tasks`,
            {title})
            .then(res => res.data)
    },

    updateTask(todolistId: string, taskId: string, task:UpdateTaskType) {

        return instance.put<UpdateTaskType, AxiosResponse<ResponseUpdateType<{item:GetTaskType}>>>(`/todo-lists/${todolistId}/tasks/${taskId}`,
            task)
            .then(res => res.data)
    },

    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseUpdateType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
            .then(res => res.data)
    },
}