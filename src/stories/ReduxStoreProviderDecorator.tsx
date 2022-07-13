import {AppRootStateType} from "../reducers/store";
import {Provider} from "react-redux";
import React from "react";
import {combineReducers, createStore} from "redux";
import {taskReducer} from "../reducers/taskReducer";
import {todolistID1, todolistID2, todolistReducer} from "../reducers/todolistReducer";
import {v1} from "uuid";

const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists:todolistReducer,
})

let initialGlobalState = {
    todolists:  [
        {id: 'todolistId1', title: 'What to learn', filter: 'all'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all'},
    ],
    tasks: {
        'todolistId1': [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        'todolistId2': [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Potato", isDone: true},
            {id: v1(), title: "Tomatoes", isDone: false},
            {id: v1(), title: "Fish", isDone: false},
            {id: v1(), title: "Fruits", isDone: false},
        ]
    }

}
export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType)

export const ReduxStoreProviderDecorator = (storyFn:()=>JSX.Element) =>{
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}