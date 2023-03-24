import React, { useEffect, useState } from "react";
import roleApi from "../../api/roleApi";
import { Link } from "react-router-dom";
import { Table, Button, Alert } from "react-bootstrap";
//import RequestService from "../../service/request"

const Role = () => {
    const [role, setRole] = useState([]);
    const [isShow, setShow] = useState(true);

    const fetchRole = async () => {
        const result = await roleApi.getAllAsync();
        setRole(result);
    };

    useEffect(() => {
        const isShow = sessionStorage.getItem("token") == null ? true :false;
        setShow(isShow);
        const role = sessionStorage.getItem("role");
        //console.log(sessionStorage.getItem("role"));if (role == '"Admin"' || role == '"Role"')
        if(!isShow){
            if (role == "1"){
                fetchRole();
            }
            else{
                alert("Không có quyền truy cập")
            }
        }

        return () => {
            // alert ("Login first")
        }
    }, []);

    

    const deleteRole = async (id) => {
        const result = await roleApi.deleteAsync(id);
        fetchRole();
    };
   
    return (
        <>
            <div style={{ padding: "20px 50px 0px 0px" }}>
                <Link to="/role/create">
                    <Button>Add</Button>
                </Link>

                <h1>Role</h1>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            {/* <th>ID</th> */}
                            <th>Name</th>
                            <th colSpan={2}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {role.map((item, key) => (
                            <tr key={key}>
                                <td>{key + 1}</td>
                                {/* <td style={{ maxWidth: "120px" }}>{item.roleId}</td> */}
                                <td style={{ maxWidth: "120px" }}>{item.roleName}</td>
                                <td>
                                    <Link to={`/role/${item.roleId}/edit`}>
                                        <Button variant="warning">
                                            <i className="bx bx-edit">Sửa</i>
                                        </Button>
                                    </Link>
                                </td>
                                {/* <td>
                                        <Popup modal trigger={<button>Edit</button>}>
                                            <PopupEdit/>
                                        </Popup>
                                </td> */}
                                <td>
                                    <Button
                                        variant="danger"
                                        onClick={() => {
                                            let check =
                                                window.confirm(`Ban co chac xoa id: ${item.roleId} - ten:${item.roleName}?`);
                                            // alert(check)
                                            if (check) deleteRole(item.roleId);
                                        }}
                                    >
                                        <i className="bi bi-trash">Xóa</i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
};

export default Role;
