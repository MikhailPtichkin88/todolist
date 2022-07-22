import React, {useEffect, useState} from 'react'
import {todolistAPI, TodolistType} from "../api/todolist-api";


export default {
    title: 'TODOLIST-API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<Array<TodolistType> | null>(null)
    useEffect(() => {
        todolistAPI.getMyTodolists()
            .then(res => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<string | null>(null)
    useEffect(() => {
        let title = "New-Added_todolist"
        todolistAPI.addNewTodolist(title)
            .then(res => {
                setState(res.data.data.item.title)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<{}|null>(null)
    useEffect(() => {
        let todolistId = '1520724f-4a42-4a6b-ad07-20117a25c913'
        todolistAPI.deleteTodolist(todolistId)
            .then(res => {
                setState(res.data.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = '1520724f-4a42-4a6b-ad07-20117a25c913'
        todolistAPI.updateTodolist(todolistId, "New-Titled-Todolist")
            .then(res => {
                setState(res.data.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

