// import {TasksType, TodolistsType} from "../App";
// import {taskReducer} from "./taskReducer";
// import {addTodolistAC, removeTodolistAC, todolistReducer} from "./todolistReducer";
// import {v1} from "uuid";
//
// test('ids should be equals', () => {
//     const startTasksState: TasksType = {}
//     const startTodolistsState: Array<TodolistsType> = []
//     let newId = v1()
//     const action = addTodolistAC(newId,'new todolist')
//
//     const endTasksState = taskReducer(startTasksState, action)
//     const endTodolistsState = todolistReducer(startTodolistsState, action)
//
//     const keys = Object.keys(endTasksState)
//     const idFromTasks = keys[0]
//     const idFromTodolists = endTodolistsState[0].id
//
//     expect(idFromTasks).toBe(action.payload.todolistID)
//     expect(idFromTodolists).toBe(action.payload.todolistID)
// })
//
// test('property with todolistId should be deleted', () => {
//     const startState: TasksType = {
//         'todolistId1': [
//             {id: '1', title: 'CSS', isDone: false},
//             {id: '2', title: 'JS', isDone: true},
//             {id: '3', title: 'React', isDone: false}
//         ],
//         'todolistId2': [
//             {id: '1', title: 'bread', isDone: false},
//             {id: '2', title: 'milk', isDone: true},
//             {id: '3', title: 'tea', isDone: false}
//         ]
//     }
//
//     const action = removeTodolistAC('todolistId2')
//
//     const endState = taskReducer(startState, action)
//
//
//     const keys = Object.keys(endState)
//
//     expect(keys.length).toBe(1)
//     expect(endState['todolistId2']).not.toBeDefined()
// })

export default ()=>{}