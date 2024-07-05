import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginForm.css'; // Import custom CSS file for styling

const Form = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (validateForm()) {
      localStorage.setItem('user', JSON.stringify({ name, phone, email }));
      navigate('/second');
    }
  };

  const validateForm = () => {
    let valid = true;
    if (!name.trim()) {
      setNameError('Name is required');
      valid = false;
    } else {
      setNameError('');
    }

    if (!phone.trim() || !/^\d+$/.test(phone)) {
      setPhoneError('Phone number is required and must contain only digits');
      valid = false;
    } else {
      setPhoneError('');
    }

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email is required and must be a valid email address');
      valid = false;
    } else {
      setEmailError('');
    }

    return valid;
  };

  return (
    <Container className="login-box">
      <Typography variant="h4" gutterBottom>
        User Information
      </Typography>
      <form onSubmit={(e) => e.preventDefault()}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              variant="outlined"
              error={!!nameError}
              helperText={nameError}
              className="input-field"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              fullWidth
              variant="outlined"
              error={!!phoneError}
              helperText={phoneError}
              inputProps={{ maxLength: 10 }}
              className="input-field"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              variant="outlined"
              error={!!emailError}
              helperText={emailError}
              className="input-field"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              fullWidth
              className="submit-button"
            >
              <b>Submit</b>
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Form;
