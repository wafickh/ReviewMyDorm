import React, { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from '../navbar/Navbar'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useNavigate, useLocation } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from "./styles"
import Input from './Input'
import { signin, signup } from '../../actions/auth';
import "./Auth.css";

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

function Auth() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  

  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useNavigate();
  const classes = useStyles();
  const location = useLocation();

  if (user){
    history('/');

  }
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(form,history));

    } else {
      dispatch(signin(form,history));

    }
  };


  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  useEffect(() => {
    const token = user?.token;

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (

    <div>
    <Navbar />
    <div className="bod wwaw">
    {!user ? (
      <div className='sas'><Container component="main" maxWidth="xs" sx={{ m: 2 }}>
        <Paper className={classes.paper} elevation={6}>
          <Avatar style={{ backgroundColor: '#FF3C0C' }} className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography style={{ color: '#562F4A' }} component="h1" variant="h5">{isSignup ? 'Sign up' : 'Sign in'}</Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignup && (
                <>
                  <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                  <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                </>
              )}
              <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
              <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
              {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
            </Grid>
            <Button type="submit" fullWidth variant="contained" style={{ backgroundColor: '#562F4A', color: 'white' }} className={classes.submit}>
              {isSignup ? 'Sign Up' : 'Sign In'}
            </Button>

            <Grid container justify="flex-end">
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container></div>
    ):(
      <><h3> You are not authorized to do that!</h3></>
    )
    
    }
      </div>
    
      
      
    </div>
  )
}

export default Auth
