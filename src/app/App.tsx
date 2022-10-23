import React, {useEffect} from 'react';
import './App.css';
import Header from "../components/Header";
import {CircularProgress, Container, LinearProgress} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {initializeAppTC} from "./app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackBar";
import {Navigate, Route, Routes} from "react-router-dom";
import {TodolistList} from "../features/TodolistList/TodolistList";
import {Login} from "../features/Login/Login";

function App() {
    const isInitialized = useAppSelector(state=>state.app.isInitialized)
    const status = useAppSelector(state => state.app.status)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
    return (
        <div className="App">
            <ErrorSnackbar/>
            <Header/>
            {status === "loading" && <LinearProgress color={'success'}/>}
            <Container fixed>
                <Routes>
                    <Route path='/' element={<TodolistList/>}/>
                    <Route path='login' element={<Login/>}/>
                    <Route path='/404' element={<h1>404: PAGE NOT FOUND</h1>} />
                    <Route path='*' element={<Navigate to='404'/>} />
                </Routes>
            </Container>
        </div>
    );
}

export default App;
