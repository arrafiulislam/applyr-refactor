import React from 'react';
import { Outlet } from 'react-router-dom';
import SideMenuAgent from '../components/sidemenu/SideMenuAgent';
import Navbar from '../components/nav/Navbar';

const AgentLayout = () => {
    return (
        <div>
        <Navbar></Navbar>
        
         <div style={{ display: 'flex' ,maxHeight: '80vh' }}>
            <SideMenuAgent></SideMenuAgent>
            <div className="content w-full bg-white overflow-y-auto">
            <Outlet></Outlet>
            </div>
        </div>
    </div>
    );
};

export default AgentLayout;