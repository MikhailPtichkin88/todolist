import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '9df85157-ef47-4383-94d5-5e90e6d2a59b'
    }
})

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type ResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}

export const todolistAPI = {
    getMyTodolists() {
        const promise = instance.get<Array<TodolistType>>(
            `todo-lists/`)
        return promise
    },

    addNewTodolist(title: string) {
        return instance.post<ResponseType<{item:TodolistType}>>(
            `todo-lists/`,
            {title})
    },

    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(
            `todo-lists/${todolistId}`)
    },

    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(
            `todo-lists/${todolistId}`,
            {title})
    },
}