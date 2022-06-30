import React  from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./components/AddItemForm";
import {
    addTodolistAC,
} from "./reducers/todolistReducer";
import Header from "./components/Header";
import {Container, Grid, Paper} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./reducers/store";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FiltersType = "all" | "completed" | "active"

export type TodolistsType = {
    id: string
    title: string
    filter: FiltersType
}

export type TasksType = {
    [key: string]: Array<TaskType>
}


function App() {

    const todolists = useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolists)
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootStateType, TasksType>(state=>state.tasks)

    const AddNewTodoList = (title: string) => {
        const action = addTodolistAC(v1(),title)
        dispatch(action)
    }

    return (
        <div className="App">
            <Header/>
            <Container fixed>
                <Grid container style={{padding: "10px"}}>
                    <AddItemForm callback={AddNewTodoList} title=""/>
                </Grid>
                <Grid container spacing={6}>
                    {
                        todolists.map((el) => {

                            return <Grid item key={el.id}>
                                <Paper style={{padding: "10px", minHeight: "400px"}}>
                                    <TodoList
                                        todolistID={el.id}
                                        title={el.title}
                                        filter={el.filter}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
