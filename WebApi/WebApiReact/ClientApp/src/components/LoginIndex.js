import React, { Route, useState } from "react";
import { Modal } from 'react-bootstrap';

// const initialValues: ILoginModel = {
//   userName: '',
//   password: '',
// }


const LoginIndex = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isShow, setShow] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const handleHide = () => {
    setShow(false);
  }

//   const handleResult = (result: Boolean) => {
//     if (result) {
//         setTimeout(() => {
//             //navigate(HOME);
//             window.location.href = HOME
//         });
//     } 
//   }

  

  const handleChangeUserName = (e) => {

    setUserName(e.target.value);
  }

  const handleChangePassword= (e) => {   
      setPassword(e.target.value);
  }

  const isValid = userName != "" && password != "";

  return (
    <>
      <div className='container'>
        <Modal 
          show={isShow}
          onHide={handleHide}
          backdrop="static"
          dialogClassName="modal-90w"
          aria-labelledby="login-modal"
          id="login-modal"
        >
          <Modal.Header>
            <Modal.Title>
              Login
            </Modal.Title>

          </Modal.Header>

          <Modal.Body>
            <Route>
              
              {(actions) => (
                <Route className='intro-y'>
                  <Route id="userName" name="userName" label="Username" onKeyUp={handleChangeUserName} isrequired />
                  <Route id="password" name="password" label="Password" onKeyUp ={handleChangePassword} isPassword isrequired />

                  <div className="text-center mt-5">
                    <button className="btn btn-danger btn-login"
                       type="submit" disabled={!isValid}>
                      Login
                      {(isLoading) && <img src="/oval.svg" className='w-4 h-4 ml-2 inline-block' />}
                    </button>
                  </div>
                </Route>
              )}
            </Route>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default LoginIndex;
