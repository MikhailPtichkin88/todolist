import React, {useReducer} from "react";
import {
    addTaskAC,
    addTodoListWithTasksAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./tasks-reducer";
import {v1} from "uuid";
import {TasksStateType} from "../App";

test('correct task should be deleted from correct array', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = removeTaskAC('todolistId2','2', )

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '3', title: 'tea', isDone: false}
        ]
    })
})

test('correct task should be added to correct array', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = addTaskAC('todolistId2','juice', )

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juice')
    expect(endState['todolistId2'][0].isDone).toBe(false)
})

test('status of specified task should be changed', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = changeTaskStatusAC('todolistId2','2', false, )

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].isDone).toBe(false)
    expect(endState["todolistId1"][1].isDone).toEqual(!endState["todolistId2"][1].isDone)
    expect(endState["todolistId2"][1].isDone).toEqual(!startState["todolistId2"][1].isDone)
})




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
    expect(endState[todolistId2].length===2)
    expect(endState[todolistId1][2].title==="ZZZZ")
    //перебор как forEach
    expect(endState[todolistId1].every(t=>t.id!==taskId)).toBeTruthy()

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

    let endState = tasksReducer(startState, changeTaskTitleAC(todolistId2, taskIdJS, "Chicken"))

        expect(endState[todolistId2][1].title="Chicken")
        expect(endState[todolistId2][1].title).not.toEqual(startState[todolistId2][1].title)
})


test('new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = addTodoListWithTasksAC('new todolist')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})