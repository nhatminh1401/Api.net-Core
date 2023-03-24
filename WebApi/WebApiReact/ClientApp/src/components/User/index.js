import React, { useEffect, useState } from 'react';
import userApi from '../../api/userApi';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';


const User = () => {

    const [user, setUser] = useState([]);
    const [isShow, setShow] = useState(true);
   

    useEffect(() => { const isShow = sessionStorage.getItem("token") == null ? true : false; //const isShow = sessionStorage.getItem("role") == "Admin" /*|| sessionStorage.getItem("role") == "User" */ ? true :false;
        setShow(isShow);
        //fetchUser();
        const role = sessionStorage.getItem("role");
        //console.log(role);
        if(!isShow){
            if (role == "1"){
                fetchUser();
            }
            else{
                alert("Không có quyền truy cập")
            }
        }
        return () => {
             //alert ("Login first")
        }
    }, []);

    const fetchUser = async () => {
        // var contentsq = sessionStorage.getItem("email");
        // console.log(contentsq)
        const result = await userApi.getAllAsync();
        setUser(result);
    }
    const deleteUser = async (id) => {
        const result = await userApi.deleteAsync(id)
        fetchUser();
    }
    
    return (
        <>
            <div style={{ padding: '20px 50px 0px 0px' }}>
                <Link to='/user/create'>
                    <Button>Add</Button>
                </Link>

                <h1>User</h1>
                <Table striped bordered hover size="sm">
                    <thead >
                        <tr>
                            <th>#</th>
                            <th>Name</th>    
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>                     
                            <th>RoleID</th>               
                            <th colSpan={2}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            user.map((item, key) => (
                                <tr key={key}>
                                    <td>{key + 1}</td>
                                    <td style={{ maxWidth: '120px' }}>{item.userName}</td>
                                    <td style={{ maxWidth: '120px' }}>{item.email}</td>
                                    <td style={{ maxWidth: '120px' }}>{item.firstName}</td>
                                    <td style={{ maxWidth: '120px' }}>{item.lastName}</td>     
                                    <td style={{ maxWidth: '120px' }}>{item.roleId}</td>
                                    <td>
                                        <Link
                                            to={`/user/${item.userId}/edit`}
                                        >
                                            <Button
                                                variant="warning"
                                            >
                                                <i className='bx bx-edit'></i>Sửa</Button>
                                        </Link>
                                    </td>                                   
                                    <td>
                                        <Button
                                            variant="danger"
                                            onClick={() => {
                                                let check = window.confirm(`Ban co chac xoa id: ${key + 1} - ten: ${item.userName}?`)
                                                // alert(check)
                                                if (check)
                                                deleteUser(item.userId)
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

export default User;