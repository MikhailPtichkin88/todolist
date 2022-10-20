import React, {useCallback, useEffect} from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddItemForm from "./components/AddItemForm";
import {
    addTodolistTC, fetchTodolistTC, TodolistType,
} from "./reducers/todolistReducer";
import Header from "./components/Header";
import {Container, Grid, LinearProgress, Paper} from "@mui/material";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./reducers/store";
import {useAppDispatch} from "./reducers/hooks";
import {RequestStatusType} from "./reducers/app-reducer";
import {ErrorSnackbar} from "./components/ErrorSnackBar";

function App() {

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const dispatch = useAppDispatch()


    const AddNewTodoList = useCallback((title: string) => {
        dispatch(addTodolistTC({title}))
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchTodolistTC())
    }, [])

    return (
        <div className="App">
            <ErrorSnackbar/>
            <Header/>
            {status === "loading" && <LinearProgress color={'success'}/>}
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
                                        entityStatus={el.entityStatus}
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
