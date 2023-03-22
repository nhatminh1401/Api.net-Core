import React from 'react'
//import { axios } from 'axios';
import { Button } from 'react-bootstrap';
import { getUser} from '../../utils/Common';

const Blank = () => {
    const user = getUser();
    const handleLogout = (e) => {
        e.preventDefault ();
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("role");

        alert("Đã Logout!");
        //window.alert('content');
        window.location.href = "/";
    }
    if (sessionStorage.getItem("token")!= null)
    {
        return <div>
            <h5>HELLO: {user} </h5>
            <Button  onClick={handleLogout} > Logout </Button>
        </div>
                
    }else{
    return <div><h1>HELLO  </h1></div>
    }
};

export default Blank