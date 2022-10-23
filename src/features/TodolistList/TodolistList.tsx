import React, {useCallback, useEffect} from 'react';
import {Container, Grid, Paper, Typography} from "@mui/material";
import AddItemForm from "../../components/AddItemForm";
import TodoList from "./Todolist/TodoList";
import {addTodolistTC, fetchTodolistTC} from "./todolistReducer";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {fetchTasksTC} from "./taskReducer";
import {Navigate} from "react-router-dom";

export const TodolistList = () => {

    const isLoggedIn = useAppSelector(state=>state.auth.isLoggedIn)
    const todolists = useAppSelector(state => state.todolists)
    const dispatch = useAppDispatch()

    const AddNewTodoList = useCallback((title: string) => {
        dispatch(addTodolistTC({title}))
    }, [dispatch])

    useEffect(() => {
        if(!isLoggedIn){
            return
        }
        dispatch(fetchTodolistTC())
    }, [])

    if(!isLoggedIn){
        return <Navigate to={'login'}/>
    }

    return (
           <>
                <Grid container style={{padding: "10px", margin:'20px 0 40px'}} >
                <Paper elevation={3} style={{padding: "10px", minHeight: "80px"}}>
                    <AddItemForm callback={AddNewTodoList} title="" label='Create new Todolist'/>
                    <Typography sx={{margin:'10px 0 0 5px'}} variant="body2" color="text.secondary">
                        Enter the name and press <b>+</b>
                    </Typography>
                </Paper>
                </Grid>
                <Grid container spacing={6} justifyContent="space-between">
                    {
                        todolists.map((el) => {
                            return <Grid item key={el.id}>
                                <Paper style={{padding: "10px", minHeight: "400px"}} elevation={3}>
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
           </>
    );
};