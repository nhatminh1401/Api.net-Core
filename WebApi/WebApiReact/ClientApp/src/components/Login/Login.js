import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from '../../utils/Common';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import userApi from '../../api/userApi';


import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';




function Login(props) {
  const [loading, setLoading] = useState(false);
  const email = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
  //const []
  

  // handle button click of login form
  const handleLogin = async () => {
    setError(null);
    setLoading(true);
    
    const url = "https://localhost:5050/api/Token";
    
    axios.post(url,{ email: email.value, password: password.value  }).then(response => {
      setLoading(false);
      console.log(response.data)
      let a = response.data.role
      const iterator = a.values();
      for (const value of iterator) 
      {
        console.log(value);
        const userrole = value.roleId;

        const usernames = value.userName;
        //console.log(userrole);
        setUserSession(response.data.accessToken, email.value, userrole, usernames);
        console.log(setUserSession)
      }      

      if(setUserSession != null){
        window.location.href = "/";
      }
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  const {
      register,
      handleSubmit,
      formState: { errors }
  } = useForm();
    const onSubmit = async (content) => {
      var data = await userApi.addAsync(content);
      console.log(data)
      if (data !== "") {
          alert("Da tao thanh cong!");
          //navigate(-1);
      }
    }
  const [justifyActive, setJustifyActive] = useState('tab1');;

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }
    setJustifyActive(value);
  };

  return (    
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

      <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>

        <MDBTabsPane show={justifyActive === 'tab1'}>

          <div className="text-center mb-3">
            <p>Sign in with:</p>

            <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='facebook-f' size="sm"/>
                {/* <MDBIcon fab icon="facebook" /> */}
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='twitter' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='google' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='github' size="sm"/>
              </MDBBtn>
            </div>

            <p className="text-center mt-3">or:</p>
          </div>

          <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email'{...email}/>
          <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password'{...password}/>

          <div className="d-flex justify-content-between mx-4 mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a href="!#">Forgot password?</a>
          </div>

          <MDBBtn className="mb-4 w-100"  onClick={handleLogin} disabled={loading} >Sign in</MDBBtn>
          <p className="text-center">Not a member? <a href="/Register">Register</a></p>

        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === 'tab2'}>

          <div className="text-center mb-3">
            <p>Sign un with:</p>

            <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='facebook-f' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='twitter' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='google' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='github' size="sm"/>
              </MDBBtn>
            </div>

            <p className="text-center mt-3">or:</p>
          </div>

          <Container>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                //placeholder="Email"
                                //defaultValue="Email"
                                {...register('email')}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <Form.Label>UserName</Form.Label>
                            <Form.Control
                                type="text"
                                //placeholder="UserName"
                                //defaultValue="UserName"
                                {...register('userName')}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"    
                                rules={[
                                  {required: true, message: 'Vui lòng nhập mật khẩu'},
                                  {max: 16, message: 'Vui lòng không nhập quá 16 kí tự'},
                                  {min: 6, message: 'Vui lòng không nhập dưới 6 kí tự'}
                              ]}                            
                                {...register('password')}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <Form.Label>confirmPassword</Form.Label>
                            <Form.Control
                                type="password"
                                rules={[
                                    {required: true, message: 'Vui lòng nhập mật khẩu'},
                                    {max: 16, message: 'Vui lòng không nhập quá 16 kí tự'},
                                    {min: 6, message: 'Vui lòng không nhập dưới 6 kí tự'}
                                ]}
                                {...register('confirmPassword')}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <Form.Label>firstName</Form.Label>
                            <Form.Control
                                type="text"
                                //placeholder="firstname"
                                //defaultValue="firstname"
                                {...register('firstName')}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <Form.Label>lastName</Form.Label>
                            <Form.Control
                                type="text"
                                //placeholder="Last name"
                                //defaultValue="Last name"
                                {...register('lastName')}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>                    
                    </Row>
                    <Button className="text-center mb-4 w-100" type="submit">Submit form</Button>
                </Form>
            </Container>
        </MDBTabsPane>

      </MDBTabsContent>

    </MDBContainer>
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