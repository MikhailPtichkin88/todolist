import {instance} from "./instance";


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
        return instance.get<Array<TodolistType>>(
            `todo-lists/`)
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