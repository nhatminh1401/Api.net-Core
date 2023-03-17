
import React, { useState } from 'react';
import swal from 'sweetalert';

import Button from 'react-bootstrap/Button';

import { setUserSession } from '../../utils/Common';


async function loginUser(credentials) {
  return fetch('https://localhost:5001/api/Users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

export default function Signin() {
 // const classes = useStyles();
  const [ email, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await loginUser({
       email,
      password
    });
    if ('accessToken' in response) {
      swal("Success", response.message, "success", {
        buttons: false,
        timer: 2000,
      })
      .then((value) => {
        localStorage.setItem('accessToken', response['accessToken']);
        localStorage.setItem('user', JSON.stringify(response['user']));
        setUserSession(response.data.accessToken, email.value);
        //window.location.href = "/profile";
      });
    } else {
      swal("Failed", response.message, "error");
    }
  }

  return (
    <>
    
          <form noValidate onSubmit={handleSubmit}>
            <input
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              label="Email Address"
              onChange={e => setUserName(e.target.value)}
            />
            <input
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              onChange={e => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              
            >
              Sign In
            </Button>
          </form>
    </>
  );
}

