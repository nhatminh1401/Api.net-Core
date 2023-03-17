import React, {useState, useEffect} from 'react';
import './custom.css';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import Blank from './views/pages/Blank';
import Deparment from './components/Deparment';
import CreateDeparment from './components/Deparment/create';
import EditDeparment from './components/Deparment/edit';
import Employee from './components/Employee';
import CreateEmployee from './components/Employee/CreateNew';
import EditEmployee from './components/Employee/UpdateEmp';
import Login from './components/Login/Login';
import Register from './components/Regitser/Register';
import Signin from './components/Login/Signin';


import axios from 'axios';
import { getToken, removeUserSession, setUserSession } from './utils/Common';
function App() {

  const [authLoading, setAuthLoading] = useState(true);
  const [isShow, setShow] = useState(true);

  useEffect(() => {
    const token = getToken();
    console.log(sessionStorage.token)
    //const token = localStorage.getItem('token');
    //console.log(localStorage.getItem.getToken)
    if (sessionStorage.token == null) {
      return <Login/>;
    }
    else{
      return<AppLayout/>;
    }
    axios.post(`https://localhost:5001/api/Users/login`).then(response => {
      setUserSession(response.data.accessToken, response.data.user);
      console.log (response);
      console.log (sessionStorage);

      setAuthLoading(true);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  }, []);

  // if (authLoading && getToken()) {
  //   return <div className="content">Checking Authentication...</div>
  // }

  return (
      <Routes>
        <Route>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<Blank />} />
          <Route path='/deparment' element={<Deparment />} />
          <Route path='/deparment/create' element={<CreateDeparment />}></Route>
          <Route path='/deparment/:id/edit' element={<EditDeparment />}></Route>

          <Route path='/employee' element={<Employee />}></Route>
          <Route path='/employee/create' element={<CreateEmployee />}></Route>
          <Route path='/employee/:id/edit' element={<EditEmployee />}></Route>
          <Route path='/login' element={<Login />}></Route>   
          <Route path='/register' element={<Register />}></Route>   
          
          <Route path='/signin' element={<Signin />}></Route> 
                
        </Route>
        </Route>
      </Routes>
  );
}

export default App;

// import React, { useState, useEffect } from 'react';
// import { BrowserRouter, Route, NavLink } from 'react-router-dom';
// import axios from 'axios';

// import Login from './Login';
// import Dashboard from './Dashboard';
// import Home from './Home';

// import PrivateRoute from './utils/PrivateRoute';
// import PublicRoute from './utils/PublicRoute';
// import { getToken, removeUserSession, setUserSession } from './utils/Common';



// function App() {
//   const [authLoading, setAuthLoading] = useState(true);

//   useEffect(() => {
//     const token = getToken();
//     if (!token) {
//       return;
//     }

//     axios.get(`http://localhost:4000/verifyToken?token=${token}`).then(response => {
//       setUserSession(response.data.token, response.data.user);
//       setAuthLoading(false);
//     }).catch(error => {
//       removeUserSession();
//       setAuthLoading(false);
//     });
//   }, []);

//   if (authLoading && getToken()) {
//     return <div className="content">Checking Authentication...</div>
//   }

//   return (
//     <div className="App">
//       <BrowserRouter>
//         <div>
//           <div className="header">
//             <NavLink exact activeClassName="active" to="/">Home</NavLink>
//             <NavLink activeClassName="active" to="/login">Login</NavLink><small>(Access without token only)</small>
//             <NavLink activeClassName="active" to="/dashboard">Dashboard</NavLink><small>(Access with token only)</small>
//           </div>
//           <div className="content">
//             <Route>
//               <Route exact path="/" component={Home} />
//               <PublicRoute path="/login" component={Login} />
//               <PrivateRoute path="/dashboard" component={Dashboard} />
//             </Route>
//           </div>
//         </div>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;