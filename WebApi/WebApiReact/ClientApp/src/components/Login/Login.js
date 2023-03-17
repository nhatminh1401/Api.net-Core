import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from '../../utils/Common';

function Login(props) {
  const [loading, setLoading] = useState(false);
  const email = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
  

  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    const url = "https://localhost:5001/api/Users/login";
    axios.post(url, { email: email.value, password: password.value }).then(response => {
      setLoading(false);
      setUserSession(response.data.accessToken, email.value);
      console.log (response);
      console.log (sessionStorage);
      if(setUserSession!= null){
        window.location.href = "/deparment";
      }
      // props.history.push("/deparment");
      else{
        window.Message("Fail");
      }
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  return (
    <div>
      Login<br /><br />
      <div>
        email<br />
        <input type="text" {...email} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
    </div>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default Login;