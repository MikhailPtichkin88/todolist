import React, {useCallback, useEffect} from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddItemForm from "./components/AddItemForm";
import {
    addTodolistTC, setTodolistTC, TodolistType,
} from "./reducers/todolistReducer";
import Header from "./components/Header";
import {Container, Grid, Paper} from "@mui/material";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./reducers/store";
import {useAppDispatch} from "./reducers/hooks";

function App() {

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const dispatch = useAppDispatch()


    const AddNewTodoList = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    useEffect(() => {
        dispatch(setTodolistTC())
    }, [])

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
