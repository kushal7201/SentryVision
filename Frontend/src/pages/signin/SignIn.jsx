import React, { useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

import AuthContext from 'src/auth/authContext'; // Adjust the import path as necessary
import { Visibility, VisibilityOff } from '@mui/icons-material';

// import {useNax}

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CssBaseline from '@mui/material/CssBaseline';
// import ToggleButton from '@mui/material/ToggleButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// import { fetchDetails } from 'src/_mock/account';



function SignIn() {
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = React.useState(false);

  // const [alignment, setAlignment] = React.useState('User');
  // const handleChange = (event, newAlignment) => {
  //   setAlignment(newAlignment);
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');
    if (!email || !password) {
      if (!email) setEmailError("Email is required");
      if (!password) setPasswordError("Password is required");
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        body: formData, // Directly pass the FormData object
      });
  
      if (!response.ok) {
        if (response.status === 401) {
          // Extract the error message from the response body
          const errorData = await response.json();
          console.error('Failed to fetch user details:', errorData.message);
      } else {
          console.error('Failed to fetch user details:', response.statusText);
      }
      } else {
        const responseData = await response.json();
        const token1 = responseData.token;
        localStorage.setItem('token', token1);
        
        // console.log(token1)
        console.log('Sign in successful');
        login(); 
        navigate('/')
        // fetchDetails();
        window.location.reload();
           
      }
    } catch (error) {
      console.error('Sign in error:', error.message);
    }
};

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <ToastContainer />
      <Container
        component="main"
        style={{
          maxWidth: 500,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '95vh',
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '20px',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}/>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {/* <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
            sx={{ mt: 2 }}
          >
            <ToggleButton value="Student">User</ToggleButton>
            <ToggleButton value="Admin">Admin</ToggleButton>
          </ToggleButtonGroup> */}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                error={emailError !== ""}
                helperText={emailError}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                error={passwordError !== ""}
                helperText={passwordError}
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
          ),
      }}
      />

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/sign-up" variant="body2">
                  {`Don't have an account? Sign Up`}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;
