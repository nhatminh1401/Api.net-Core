import React, { useEffect, useState } from 'react';
import employeeApi from '../../api/employeeApi';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';

import Popup from "reactjs-popup";

import CreateEmployee from './CreateNew';
import { getToken, getRole } from '../../utils/Common';


const Employee = () => {

    const [employee, setEmployee] = useState([]);
    const [isShow, setShow] = useState(true);
    const token = getToken();
    const role = getRole();

    useEffect(() => { const isShow = token == null ? true : false; //const isShow = sessionStorage.getItem("role") == "Admin" /*|| sessionStorage.getItem("role") == "Employee" */ ? true :false;
        setShow(isShow);
        //fetchEmployee();
        //const role = sessionStorage.getItem("role");
        //console.log(role);
        if(!isShow){
            if (role == "1" || role == "3"){
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
        
        const result = await employeeApi.getAllAsync();
        setEmployee(result.data);
        console.log("1111", result.data);
    }
    const deleteEmployee = async (id) => {
        const result = await employeeApi.deleteAsync(id)
        fetchEmployee();
    }
    
    return (
        <>
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
                                    {/* <td>
                                        <Popup modal trigger={<button>Edit</button>}>
                                            <CreateEmployee/>
                                        </Popup>
                                    </td> */}
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