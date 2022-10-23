import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {LoginTC} from "./auth-reducer";
import {Navigate} from "react-router-dom";
import {Card, CardActions, CardContent, Link, Typography, Paper} from "@mui/material";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = () => {
    const isLoggedIn = useAppSelector(state=>state.auth.isLoggedIn)
const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate:(values)=>{
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }else if (values.password.length < 4 ) {
                errors.password = 'Password is too short (must be 5 symbols or more)'
            }
            return errors
    },
        onSubmit: values => {
         dispatch(LoginTC(formik.values))
            formik.resetForm()
        },
    });

if(isLoggedIn){
    return <Navigate to={'/'}/>
}

    return <Grid container justifyContent={'center'} sx={{marginTop:'40px'}}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Typography variant="h5" component="div" mb={1}>
                                   For sign up please visit
                                    <Link href={'https://social-network.samuraijs.com/'}
                                          underline="hover"
                                          sx={{paddingLeft:'8px'}}
                                       target={'_blank'}>this website
                                    </Link>
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    or use common test account credentials:
                                </Typography>
                                <Typography variant="body2">
                                    Email: free@samuraijs.com
                                    <br />
                                    Password: free
                                </Typography>
                            </CardContent>
                        </Card>
                    </FormLabel>
                    <Paper elevation={3} sx={{marginTop:'40px', padding:'20px'}}>
                    <FormGroup>
                        <Typography variant="h4" textAlign='center'>
                           Log In
                        </Typography>
                        <TextField label="Email"
                                   margin="normal"
                                   {...formik.getFieldProps('email')}/>
                        {
                          formik.touched.email && formik.errors.email ? <div style={{color:"red"}}>{formik.errors.email}</div>:null
                        }
                        <TextField type="password"
                                   label="Password"
                                   margin="normal"
                            {...formik.getFieldProps('password')}
                        />
                        {
                            formik.touched.password && formik.errors.password? <div style={{color:"red"}}>{formik.errors.password}</div>:null
                        }
                        <FormControlLabel label={'Remember me'}
                                          sx={{margin:"20px 0"}}
                                          control={<Checkbox {...formik.getFieldProps('rememberMe')}/>}
                        />

                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>

                    </FormGroup>
                    </Paper>
                </FormControl>
            </form>
        </Grid>
}