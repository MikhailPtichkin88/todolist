import axios from 'axios';

export type GetTaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
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
    completed: boolean
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
}
export type DeleteType = {
    resultCode: number
    messages: string[]
    data: {}
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
        return instance.get<GetTaskType[]>(`todo-lists/${todolistId}/tasks`)
            .then(res => res.data)
    },

    postTask(todolistId: string, title: string) {
        return instance.post<{ item: GetTaskType }>(`todo-lists/${todolistId}/tasks`,
            {title})
            .then(res => res.data)
    },

    updateTask(todolistId: string, taskId: string, data: UpdateTaskType) {
        return instance.put<GetTaskType>(`/todo-lists/${todolistId}/tasks/${taskId}`,
            data)
            .then(res => res.data)
    },

    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<DeleteType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
            .then(res => res.data)
    },
}