import React, { useEffect, useState } from "react";
import departmentApi from "../../api/deparmentApi";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { setUserSession } from "../../utils/Common";
//const defaultImageSrc = 'https://localhost:7246/Images/1635775567220443732.png';

const Deparment = () => {
    const [deparment, setDeparment] = useState([]);
    const [isShow, setShow] = useState(true);

    const fetchDeparment = async () => {
        const result = await departmentApi.getAllAsync();
        setDeparment(result);
    };

    useEffect(() => {
        const isShow = sessionStorage.getItem("token") == null ? true :false;
        setShow(isShow);
        console.log(sessionStorage.getItem("token"))
        if(!isShow){
            fetchDeparment();
            console.log(sessionStorage.getItem("token"))
        }
        return () => {
            // alert ("Login first")
        }
    }, []);

    

    const deleteDeparment = async (id) => {
        const result = await departmentApi.deleteAsync(id);
        fetchDeparment();
    };
   
    return (
        <>
            <div style={{ padding: "20px 50px 0px 0px" }}>
                <Link to="/deparment/create">
                    <Button>Add</Button>
                </Link>

                <h1>Deparment</h1>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th colSpan={2}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deparment.map((item, key) => (
                            <tr key={key}>
                                <td>{key + 1}</td>
                                <td style={{ maxWidth: "120px" }}>{item.departmentName}</td>
                                <td>
                                    <Link to={`/deparment/${item.departmentId}/edit`}>
                                        <Button variant="warning">
                                            <i className="bx bx-edit">Sửa</i>
                                        </Button>
                                    </Link>
                                </td>
                                <td>
                                    <Button
                                        variant="danger"
                                        onClick={() => {
                                            let check =
                                                window.confirm(`Ban co chac xoa id: ${item.departmentId} - ten:
                            ${item.departmentName}?`);
                                            // alert(check)
                                            if (check) deleteDeparment(item.departmentId);
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

export default Deparment;
