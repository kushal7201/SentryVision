import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

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
  const [phoneError, setPhoneError] = React.useState("");
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

  const validatePhone = (inputPhone) => {
    const pattern = /^[1-9][0-9]{9}$/; // Regular expression for the pattern
    if (!pattern.test(inputPhone)) {
      setPhoneError("Invalid phone number format.");
    } else {
      setPhoneError("");
    }
  };

  const handleSubmit = async (event) => {

    if(phoneError !== "") {
      return;
    }
    event.preventDefault(); // Prevent default form submission behavior

    if (!phone || !firstName || !lastName || !email || !password || !confirmPassword) {
      setErrorMessage("Please fill in all required fields.");
      return; // Stop the function if any required field is empty
    }

    console.log(`phone: ${phone}`)
    console.log(`firstname: ${firstName}`)
    console.log(`lastname: ${lastName}`)
    console.log(`email: ${email}`)
    console.log(`password: ${password}`)
    console.log(`confirmPassword: ${confirmPassword}`)
    // console.log(`Username: ${err}`)

    event.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      if (navigator.vibrate) {
        navigator.vibrate(100);
      }
      return;
    }

    try {
      const formData = new FormData();
      formData.append('phone', phone);
      formData.append('firstname', firstName);
      formData.append('lastname', lastName);
      formData.append('email', email);
      formData.append('password', password);
      // formData.append('confirmpassword', confirmPassword);

      const response = await fetch('https://sentryvision.onrender.com/signup', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        // const errorData = await response.json();
        // setErrorMessage(errorData.detail);
        toast.error("Email OR Phone no. already exist", {
          position: "top-right",
          autoClose: 3000, // Close the toast after 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        throw new Error('Email OR Phone no. already exist!');
      } else {
        console.log('Signup successfull:');
        navigate('/sign-in');
        toast.success("Signup successfull", {
          position: "top-right",
          autoClose: 3000, // Close the toast after 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      // setErrorMessage('An error occurred while signing up. Please try again later.');
    }

    setErrorMessage("");
  };


  // Check if username or email already exist
  // const checkData = {
  //   username,
  //   email,
  // };

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
      <ToastContainer />
      <Container
        component="main"
        style={{
          marginTop:'3vh',
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
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }} />
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
                  label="Phone"
                  name="phone"
                  autoComplete="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onBlur={() => validatePhone(phone)}
                  error={phoneError !== ""}
                  helperText={phoneError}
                  inputProps={{
                    pattern: "[1-9][0-9]{9}",
                    placeholder: "ex: 7123456786"
                  }}
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
