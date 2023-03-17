import React, { useState } from "react";
import axios from "axios"
import { Link, Outlet } from "react-router-dom";
import CreateNew from "./CreateNew";

function Employee() {
  const [employeeList, setemployeeList] = useState([]);
   const [showFormCreate, setshowFormCreate] = useState(false);
  function GetAllEmployee() {
    const url = "https://localhost:5001/api/Employee/GetEmployee";

    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((reposnserFromServer) => {
        console.log(reposnserFromServer);
        setemployeeList(reposnserFromServer);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleDelete (id) {
    const empApi = (url = "https://localhost:5001/api/Employee") => {
      return {
        fetchAll: () => axios.get(url),
        create: (newRecord) => axios.post(url, newRecord),
        update: (id, updateRecord) => axios.put(`${url}/${id}`, updateRecord),
        delete: (id) => axios.delete(`${url}/${id}`),
      };
    };
    let response = empApi().delete(id);
    setemployeeList(response.data);
  }

  return (
    <div className="table-responsive mt-5">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Deparment</th>
          </tr>
        </thead>
        <tbody>
          {employeeList.map((emp) => (
            <tr key={emp.employeeID}>
              <th scope="row"> {emp.employeeID} </th>
              <td>{emp.employeeName}</td>
              <td>{emp.emailId}</td>
              <td>{emp.departmentId}</td>

              <td>                
                <button><Link to={`${emp.employeeID.toString()}`} key={emp.employeeID} >
                          Update
                        </Link>
                </button>
                <Outlet></Outlet>
                    <button onClick ={()=> {if(window.confirm(`Are you sure delete id: ${emp.employeeID} - Name: ${emp.employeeName}`)) 
                        handleDelete(emp.employeeID)}}>Delete</button>
                </td>


            </tr>
          ))}
        </tbody>
      </table>  
      <div>
        <button onClick={() =>GetAllEmployee()}>Get All</button>
        <button onClick={() =>setshowFormCreate(true)} >
          Create New Products
        </button>
      </div>
    {showFormCreate && <CreateNew></CreateNew>}
    </div>
    
  );
}

export default Employee;
