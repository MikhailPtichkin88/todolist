// import React, {useEffect, useState} from "react";
// import {DeleteType, GetTaskType, taskAPI, UpdateTaskType} from "../api/task-api";
//
//
// export default {
//     title: 'TASK-API'
// }
//
// export const GetTasks = () => {
//     const [tasks, setTasks] = useState<GetTaskType[] | null>(null)
//
//     useEffect(() => {
//         let todolistId = 'c0451997-2ef9-4a5c-8caf-61eddc793f8a'
//         taskAPI.getTasks(todolistId)
//             .then(res => setTasks(res))
//         console.log(tasks)
//     }, [])
//
//     return <div>{JSON.stringify(tasks)}</div>
// }
//
// export const CreateTask = () => {
//     const [task, setTask] = useState<GetTaskType | null>(null)
//
//     useEffect(() => {
//         let todolistId = '0f5d9d1a-ea95-4199-8803-ca5cf91dbb5a'
//         let title = "Need to buy chicken"
//
//         taskAPI.postTask(todolistId, title)
//             .then(res => setTask(res.item))
//     }, [])
//     return <div>{JSON.stringify(task)}</div>
// }
//
// export const UpdateTask = () => {
//
//     const actualDate = new Date()
//     const dateString = `${actualDate.getFullYear()}-${actualDate.getMonth()}-${actualDate.getDate()} ${actualDate.getHours()}:${actualDate.getMinutes()}:${actualDate.getSeconds()}`
//
//     const [task, setTask] = useState<GetTaskType | null>(null)
//
//     useEffect(() => {
//         let todolistId = 'c0451997-2ef9-4a5c-8caf-61eddc793f8a'
//         let taskId = "08bcf21e-e8c9-4dc8-be6f-7e857916c2d0"
//         let title = "New Task Title"
//         let data: UpdateTaskType = {
//             title: title,
//             startDate: null,
//             completed: false,
//             deadline: null,
//             description: "New added task",
//             priority: 1,
//             status: 1,
//         }
//
//         taskAPI.updateTask(todolistId, taskId, data)
//             .then(res => setTask(res))
//     }, [])
//
//     return <div>{JSON.stringify(task)}</div>
// }
//
// export const DeleteTask = () =>{
//
//     const [task, setTask] = useState<DeleteType | null>(null)
//     let todolistId = 'c0451997-2ef9-4a5c-8caf-61eddc793f8a'
//     let taskId = "08bcf21e-e8c9-4dc8-be6f-7e857916c2d0"
//
//     useEffect(() => {
//         taskAPI.deleteTask(todolistId,taskId)
//             .then(res=>setTask(res))
//         console.log(task)
//     },[])
//     return <div>{JSON.stringify(task)}</div>
// }
//

export default ()=>{}
