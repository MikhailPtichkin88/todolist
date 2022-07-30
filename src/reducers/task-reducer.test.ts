// import React, {useReducer} from "react";
// import {
//     addTaskAC, changeNameAC, changeStatusAC,
//
//     removeTaskAC, taskReducer,
//
// } from "./taskReducer";
// import {v1} from "uuid";
// import {TasksType, TaskType} from "../App";
// import {addTodolistAC} from "./todolistReducer";
//
//
// let startState: TasksType
// let todolistId1: string
// let todolistId2: string
// let startState1: TasksType
//
// beforeEach(() => {
//     startState = {
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
//     todolistId1 = v1()
//     todolistId2 = v1()
//
//     startState1 = {
//         [todolistId1]: [
//             {id: v1(), title: "HTML&CSS", isDone: true},
//             {id: v1(), title: "XXXX", isDone: true},
//             {id: v1(), title: "YYYY", isDone: true},
//             {id: v1(), title: "ZZZZ", isDone: true},
//             {id: v1(), title: "JS", isDone: true}
//         ],
//         [todolistId2]: [
//             {id: v1(), title: "Milk", isDone: true},
//             {id: v1(), title: "React Book", isDone: true}
//         ]
//     }
// })
//
// test('correct task should be deleted from correct array', () => {
//
//     const action = removeTaskAC('todolistId2', '2',)
//
//     const endState = taskReducer(startState, action)
//
//     expect(endState).toEqual({
//         'todolistId1': [
//             {id: '1', title: 'CSS', isDone: false},
//             {id: '2', title: 'JS', isDone: true},
//             {id: '3', title: 'React', isDone: false}
//         ],
//         'todolistId2': [
//             {id: '1', title: 'bread', isDone: false},
//             {id: '3', title: 'tea', isDone: false}
//         ]
//     })
// })
//
// test('correct task should be added to correct array', () => {
//
//     const action = addTaskAC('todolistId2', 'juice',)
//
//     const endState = taskReducer(startState, action)
//
//     expect(endState['todolistId1'].length).toBe(3)
//     expect(endState['todolistId2'].length).toBe(4)
//     expect(endState['todolistId2'][0].id).toBeDefined()
//     expect(endState['todolistId2'][0].title).toBe('juice')
//     expect(endState['todolistId2'][0].isDone).toBe(false)
// })
//
// test('status of specified task should be changed', () => {
//
//     const action = changeStatusAC('todolistId2', '2', false,)
//
//     const endState = taskReducer(startState, action)
//
//     expect(endState["todolistId2"][1].isDone).toBe(false)
//     expect(endState["todolistId1"][1].isDone).toEqual(!endState["todolistId2"][1].isDone)
//     expect(endState["todolistId2"][1].isDone).toEqual(!startState["todolistId2"][1].isDone)
// })
//
//
// test("task must be added", () => {
//
//     let todolistId1 = v1();
//     let todolistId2 = v1();
//
//     let startState = {
//         [todolistId1]: [
//             {id: v1(), title: "HTML&CSS", isDone: true},
//             {id: v1(), title: "JS", isDone: true}
//         ],
//         [todolistId2]: [
//             {id: v1(), title: "Milk", isDone: true},
//             {id: v1(), title: "React Book", isDone: true}
//         ]
//     };
//
//     const endState = taskReducer(startState, addTaskAC(todolistId2, "TS book"))
//
//     expect(endState[todolistId2][2].title === "TS book")
//     expect(endState[todolistId2].length === 3)
// })
//
// test("Correct task should be removed", () => {
//
//     let taskId = v1()
//     startState1[todolistId1][2].id = taskId
//
//     const endState = taskReducer(startState1, removeTaskAC(todolistId1, taskId))
//
//     expect(endState[todolistId1].length === 4)
//     expect(endState[todolistId2].length === 2)
//     expect(endState[todolistId1][2].title === "ZZZZ")
//     //перебор как forEach
//     expect(endState[todolistId1].every(t => t.id !== taskId)).toBeTruthy()
//
// })
//
// test('Status should be changed', () => {
//
//     let taskIdJS = v1()
//     startState1[todolistId1][4].id = taskIdJS
//
//     const endState = taskReducer(startState1, changeStatusAC(todolistId1, taskIdJS, false))
//
//
//     expect(!endState[todolistId1][4].isDone)
// })
//
//
// test("Task title should be changed", () => {
//
//
//     let taskIdJS = v1()
//     startState1[todolistId2][1].id = taskIdJS
//
//     let endState = taskReducer(startState1, changeNameAC(todolistId2, taskIdJS, "Chicken"))
//
//     expect(endState[todolistId2][1].title = "Chicken")
//     expect(endState[todolistId2][1].title).not.toEqual(startState1[todolistId2][1].title)
// })
//
//
// test('new array should be added when new todolist is added', () => {
//
//     let newId = v1()
//     const action = addTodolistAC(newId, 'new todolist')
//
//     const endState = taskReducer(startState, action)
//
//     const keys = Object.keys(endState)
//     const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
//     if (!newKey) {
//         throw Error('new key should be added')
//     }
//
//     expect(keys.length).toBe(3)
//     expect(endState[newKey]).toEqual([])
// })

export default ()=>{}