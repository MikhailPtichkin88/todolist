import React from 'react';
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {LogoutTC} from "../features/Login/auth-reducer";

const Header = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    const onClickHandler = () => {
        dispatch(LogoutTC())
    }
    return (
        <AppBar position="static">
            <Container fixed>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" sx={{marginRight: "auto"}}>
                        Todolist
                    </Typography>
                    {
                        isLoggedIn
                            ? <Button variant='outlined'
                                      color="inherit"
                                      size={'large'}
                                      onClick={onClickHandler}>Logout</Button>
                            : <Button variant='outlined'
                                      color="inherit"
                                      size={'large'}>Login</Button>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Header;