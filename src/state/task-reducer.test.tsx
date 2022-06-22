import React, {useReducer} from "react";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {v1} from "uuid";
import {TasksStateType} from "../App";

test("task must be added", ()=>{

    let todolistId1 = v1();
    let todolistId2 = v1();

    let startState:TasksStateType={
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    };

    const endState:TasksStateType = tasksReducer(startState,addTaskAC(todolistId2, "TS book"))

    expect(endState[todolistId2][2].title==="TS book")
    expect(endState[todolistId2].length===3)
})

test("Correct task should be removed", ()=>{

    let todolistId1 = v1();
    let todolistId2 = v1();

    let taskId = v1()

    let startState:TasksStateType={
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "XXXX", isDone: true},
            {id: taskId, title: "YYYY", isDone: true},
            {id: v1(), title: "ZZZZ", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    };

    const endState:TasksStateType = tasksReducer(startState,removeTaskAC(todolistId1, taskId))

    expect(endState[todolistId1].length===4)
    expect(endState[todolistId1][2].title==="ZZZZ")

})

test('Status should be changed', ()=>{
    let todolistId1 = v1();
    let todolistId2 = v1();

    let taskIdJS = v1()

    let startState:TasksStateType={
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "XXXX", isDone: true},
            {id: v1(), title: "YYYY", isDone: true},
            {id: v1(), title: "ZZZZ", isDone: true},
            {id: taskIdJS, title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    };

    const endState:TasksStateType = tasksReducer(startState,changeTaskStatusAC(todolistId1, taskIdJS, false ))


    expect(!endState[todolistId1][4].isDone)
})


test("Task title should be changed", ()=>{
    let todolistId1 = v1();
    let todolistId2 = v1();

    let taskIdJS = v1()

    let startState:TasksStateType = {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "XXXX", isDone: true},
            {id: v1(), title: "YYYY", isDone: true},
            {id: v1(), title: "ZZZZ", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: taskIdJS, title: "React Book", isDone: true}
        ]
    };

    let endState = tasksReducer(startState, changeTaskTitleAC(todolistId2,taskIdJS, "Chicken"))
        expect(endState[todolistId2][1].title="Chicken")
})