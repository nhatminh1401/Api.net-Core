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

function App() {

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
