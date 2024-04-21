import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Visibility, VisibilityOff } from '@mui/icons-material';

// import AuthContext from 'src/auth/authContext'; // Adjust the import path as necessary

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
// import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CssBaseline from "@mui/material/CssBaseline";
// import InputAdornment from '@mui/material/InputAdornment';
import { createTheme, ThemeProvider } from "@mui/material/styles";

function SignUp() {
  // const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const navigate = useNavigate();
  // const { login } = useContext(AuthContext);
  const [phone, setPhone] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    console.log(`Username: ${phone}`)
    console.log(`Username: ${firstName}`)
    console.log(`Username: ${lastName}`)
    console.log(`Username: ${email}`)
    console.log(`Username: ${password}`)
    console.log(`Username: ${confirmPassword}`)
    // console.log(`Username: ${err}`)
    try {
      const formData = new FormData();
      formData.append('phone', phone);
      formData.append('firstname', firstName);
      formData.append('lastname', lastName);
      formData.append('email', email);
      formData.append('password', password);
      // formData.append('confirmpassword', confirmPassword);

      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.detail);
        throw new Error('Username OR Email already exist!');
      } else {
        console.log('Signup successfull:');
        // Handle successful signup
        // Redirect or display success message
          navigate('/sign-in');
          //  login(); // Update the login state
          //  navigate('/'); // Redirect to the dashboard
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred while signing up. Please try again later.');
    }
  };

    // event.preventDefault();
    // if (password !== confirmPassword) {
      //   setErrorMessage("Passwords do not match");
      //   if (navigator.vibrate) {
    //     navigator.vibrate(100);
    //   }
    //   return;
    // }
  
    // Check if username or email already exist
    // const checkData = {
    //   username,
    //   email,
    // };
  
    // try {
    //   const checkResponse = await fetch('http://127.0.0.1:8000/api/user/check-unique/', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(checkData)
    //   });
  
    //   if (!checkResponse.ok) {
    //     const errorData = await checkResponse.json();
    //     setErrorMessage(errorData.detail);
    //     return;
    //   }
    // } catch (error) {
    //   console.error('Error:', error);
    //   setErrorMessage('An error occurred while checking uniqueness. Please try again later.');
    //   return;
    // }
  
    // If username and email are unique, proceed to register the user
    // const data = {
    //   first_name: firstName,
    //   last_name: lastName,
    //   email,
    //   username,
    //   password,
    // };
  
  

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        component="main"
        style={{
          maxWidth: 500,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "95vh",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "20px",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}/>
          <Typography component="h1" variant="h5">Sign up</Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  autoComplete="given-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="phone"
                  name="phine"
                  autoComplete="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                }}
              />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={errorMessage !== ""}
                    helperText={errorMessage}
                    InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle confirm password visibility"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                    }}
                    />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Create a new account</Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/sign-in" variant="body2">Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;
