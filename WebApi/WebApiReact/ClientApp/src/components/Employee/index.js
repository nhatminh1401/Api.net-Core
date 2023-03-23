import React, { useEffect, useState } from 'react';
import employeeApi from '../../api/employeeApi';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';

import Popup from "reactjs-popup";

import CreateEmployee from './CreateNew';
import userApi from '../../api/userApi';
import { setUserSession } from '../../utils/Common';

//const defaultImageSrc = 'https://localhost:7246/Images/1635775567220443732.png';

const Employee = () => {

    const [employee, setEmployee] = useState([]);
    const [isShow, setShow] = useState(true);
    //const [emailApi, setUserRole] = useState(true);
    // const userrole = async () =>{
    //     const result = await userApi.getAllAsync(emailId)
    //     setUserRole(result);
    // }

    useEffect(() => { const isShow = sessionStorage.getItem("token") == null ? true : false; //const isShow = sessionStorage.getItem("role") == "Admin" /*|| sessionStorage.getItem("role") == "Employee" */ ? true :false;
        setShow(isShow);
        //fetchEmployee();
        const role = sessionStorage.getItem("role");
        console.log(role);
        if(!isShow){
            if (role == '"Admin"' || role == '"Employee"'){
                fetchEmployee();
            }
            else{
                alert("Không có quyền truy cập");
            }
        }
        return () => {
             //alert ("Login first");
        }
    }, []);

    const fetchEmployee = async () => {
        // var contentsq = sessionStorage.getItem("email");
        // console.log(contentsq)
        const result = await employeeApi.getAllAsync();
        setEmployee(result);
    }
    const deleteEmployee = async (id) => {
        const result = await employeeApi.deleteAsync(id)
        fetchEmployee();
    }
    
    return (
        <>
        {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Open modal for @mdo</button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">New message</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form>
          <div className="mb-3">
            <label htmlFor="recipient-name" className="col-form-label">Recipient:</label>
            <input type="text" className="form-control" id="recipient-name"/>
          </div>
          <div className="mb-3">
            <label htmlFor="message-text" className="col-form-label">Message:</label>
            <textarea className="form-control" id="message-text"></textarea>
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Send message</button>
      </div>
    </div>
  </div>
</div> */}


            <div style={{ padding: '20px 50px 0px 0px' }}>
                <Link to='/employee/create'>
                    <Button>Add</Button>
                </Link>

                <h1>Employee</h1>
                <Table striped bordered hover size="sm">
                    <thead >
                        <tr>
                            <th>#</th>
                            <th>Name</th>    
                            <th>Email</th>
                            <th>Deparment ID</th>                    
                            <th colSpan={2}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employee.map((item, key) => (
                                <tr key={key}>
                                    <td>{key + 1}</td>
                                    <td style={{ maxWidth: '120px' }}>{item.employeeName}</td>
                                    <td style={{ maxWidth: '120px' }}>{item.emailId}</td>
                                    <td style={{ maxWidth: '120px' }}>{item.departmentId}</td>
                                    <td>
                                        <Link
                                            to={`/employee/${item.employeeID}/edit`}
                                        >
                                            <Button
                                                variant="warning"
                                            >
                                                <i className='bx bx-edit'></i>Sửa</Button>
                                        </Link>
                                    </td>
                                    <td>
                                        <Popup modal trigger={<button>Edit</button>}>
                                            <CreateEmployee/>
                                        </Popup>
                                    </td>
                                    <td>
                                        <Button
                                            variant="danger"
                                            onClick={() => {
                                                let check = window.confirm(`Ban co chac xoa id: ${item.employeeID} - ten: ${item.employeeName}?`)
                                                // alert(check)
                                                if (check)
                                                deleteEmployee(item.employeeID)
                                            }
                                            }
                                        >
                                            <i className="bi bi-trash"></i>Xóa</Button>
                                    </td>

                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default Employee;