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
import userApi from './../../api/axios';

function Login(props) {
  const [loading, setLoading] = useState(false);
  const email = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
  //const []
  

  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    const url = "https://localhost:5001/api/Token";
    
    axios.post(url, { email: email.value, password: password.value }).then(response => {
      setLoading(false);
      setUserSession(response.data, email.value);
      //console.log (response);
      //console.log ("abc",sessionStorage);

      
      if(setUserSession != null){
        window.location.href = "/deparment";
        //props.history.push("/deparment");
      }
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }


  // //const handleRegister = () => {
  //   //const navigate = useNavigate();

  //   // const {
  //   //     register,
  //   //     handleSubmit,
  //   //     formState: { errors }
  //   // } = useForm();

  //   const handleRegister = async (content) => {
  //       var data = await userApi.addAsync(content);
  //       console.log(data)
  //       if (data !== "") {
  //           alert("Da tao thanh cong!");
  //           //navigate(-1);
  //       }
  //     }
  // //}

  const [justifyActive, setJustifyActive] = useState('tab1');;

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  return (
    // <MDBContainer fluid>

    //   <MDBRow className='d-flex justify-content-center align-items-center h-100'>
    //     <MDBCol col='12'>

    //       <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
    //         <MDBCardBody className='p-5 w-100 d-flex flex-column'>

    //           <h2 className="fw-bold mb-2 text-center">Sign in</h2>
    //           <p className="text-white-50 mb-3">Please enter your login and password!</p>

    //           <MDBInput wrapperClass='mb-4 w-100' label='Email address' id='formControlLg' type='email' {...email} size="lg"/>
    //           <MDBInput wrapperClass='mb-4 w-100' label='Password' id='formControlLg' type='password'{...password} size="lg"/>

    //           <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' />

    //           <MDBBtn size='lg' onClick={handleLogin} disabled={loading}>
    //             Login
    //           </MDBBtn>
    //           <hr className="my-4" />

    //           <MDBBtn className="mb-2 w-100" size="lg" style={{backgroundColor: '#dd4b39'}}>
    //             <MDBIcon fab icon="google" className="mx-2"/>
    //             Sign in with google
    //           </MDBBtn>

    //           <MDBBtn className="mb-4 w-100" size="lg" style={{backgroundColor: '#3b5998'}}>
    //             <MDBIcon fab icon="facebook-f" className="mx-2"/>
    //             Sign in with facebook
    //           </MDBBtn>


    //           <div>
                
    //             <p className="mb-0">Don't have an account? <a href="/register">Sign Up</a></p>

    //           </div>


    //         </MDBCardBody>
    //       </MDBCard>

    //     </MDBCol>
    //   </MDBRow>

    // </MDBContainer>

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
          <p className="text-center">Not a member? <a href="#!">Register</a></p>

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

          <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email'/>
          <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password'/>
          <MDBInput wrapperClass='mb-4' label='Confirm Password' id='form1' type='password'/>
          <MDBInput wrapperClass='mb-4' label='First Name' id='form1' type='text'/>
          <MDBInput wrapperClass='mb-4' label='Last Name' id='form1' type='text'/>
          <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='text'/>


          <div className='d-flex justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
          </div>

          <MDBBtn className="mb-4 w-100">Sign up</MDBBtn> {/*onClick={handleRegister} disabled={loading}*/}

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