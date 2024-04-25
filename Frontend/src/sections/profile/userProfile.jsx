
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

import {
  Grid,
  Stack,
  Alert,
  Button,
  Avatar,
  TextField,
} from '@mui/material';

import { account } from 'src/_mock/account';


// --- Import statements as belore
const handleSubmit = async (event) => {
  event.preventDefault(); // Prevent the default form submission

  const fileInput = document.getElementById('file');
  const file = fileInput.files[0];
  if (!file) return;
  console.log(fileInput)
  const formData = new FormData();
  formData.append('avatar', file);

  try {
    const response = await fetch(`http://localhost:5000/user/${account.id}/upload/avatar`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    toast.success("Upload successfull", {
      position: "top-right",
      autoClose: 3000, // Close the toast after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    const data = await response.json();
    console.log('Upload successful:', data);
    window.location.reload()
    // Handle the response data as needed
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};


function ImageUpload() {
  return (
    <form id="form" encType='multipart/form-data' onSubmit={handleSubmit}>
      <input
        type="file"
        id="file"
      />
      <button className='upload-btn submit-btn' type="submit">Upload</button>
    </form>
  );
}


// console.log(`the id is: ${account.id}`)


function UserProfile({ user, onChange }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const [profilePhoto, setProfilePhoto] = useState(user.photoURL || '');

  const handleProfilePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePhoto(URL.createObjectURL(file));
      // Handle file upload logic here
    }
  };
  const handleFieldChange = (field, value) => {
    onChange(field, value);
  };

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSavePassword = async () => {
    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match.');
      return;
    }
    if (currentPassword === "" || newPassword === "") {
      setError('Password cannot be empty.');
      return;
    }

    const token = localStorage.getItem('token');
    // console.log(`This is the toke: ${token}`)

    const formData = new FormData();
    formData.append('token', token);
    formData.append("cur_password", currentPassword)
    formData.append("new_password", newPassword)

    if (!token) {
      console.error('Token not found in local storage');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/user/password', {
        method: 'POST',
        body: formData, // Directly pass the FormData object
      });
      if (!response.ok) {
        if (response.status === 401) {
          // Extract the error message from the response body
          const errorData = await response.json();
          console.error('Failed to fetch user details:', errorData.message);
          setError('Current password is incorrect.');

        } else {
          console.error('Failed to fetch user details:', response.statusText);
        }
        return;
      }
      console.log("Password Updated successfully")
      toast.success("Password Updated successfully", {
        position: "top-right",
        autoClose: 3000, // Close the toast after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (e) {
      console.error('Error updating the password:', e.message);
      // return null;
    }


    onChange('password', newPassword);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
  };

  return (
    <Stack spacing={2}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={12} mb={5}>
          <ToastContainer />
          <Avatar alt="Profile Photo" src={profilePhoto} sx={{ width: 150, height: 150 }} />
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="profile-photo"
            type="file"
            onChange={handleProfilePhotoChange}
          />
          {/* <label htmlFor="profile-photo"> */}
          Update Profile Pic
          <ImageUpload />
          {/* </label> */}
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Username"
            id="username"
            fullWidth
            value={user.displayName}
            onChange={(e) => handleFieldChange('username', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Email"
            id="email"
            fullWidth
            value={user.email}
            onChange={(e) => handleFieldChange('email', e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            label="Phone"
            id="phone"
            fullWidth
            value={user.phone}
            onChange={(e) => handleFieldChange('phone', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Current Password"
            id="currentPassword"
            fullWidth
            type="password"
            value={currentPassword}
            onChange={handleCurrentPasswordChange}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="New Password"
            id="newPassword"
            fullWidth
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Confirm Password"
            id="confirmPassword"
            fullWidth
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </Grid>
      </Grid>
      {error && <Alert severity="error">{error}</Alert>}
      <Button className='submit-btn'
        variant="contained"
        color="primary"
        onClick={handleSavePassword}
        sx={{ width: 'fit-content' }}
        style={{ marginLeft: '30px' }}
      >
        Change Password
      </Button>
    </Stack>
  );
}

UserProfile.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    password: PropTypes.string,
    photoURL: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default UserProfile;
