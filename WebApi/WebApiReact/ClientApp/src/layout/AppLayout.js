import { Outlet } from "react-router-dom";
import React from 'react'
import Sidebar from "../components/sidebar/Sidebar";

const AppLayout = () => {
    return (
        <>
            <div style={{ padding: '0px 0px 0px 370px' }}>
                <Sidebar />
                <Outlet />
            </div>
            <div style={{ padding: '50px 100px 0px 370px' }}>

            </div>
        </>
    );
};

export default AppLayout;
