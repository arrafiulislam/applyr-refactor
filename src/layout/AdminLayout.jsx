import React from "react";
import Navbar from "../components/nav/Navbar";
import SideMenuAdmin from "../components/sidemenu/SideMenuAdmin";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div style={{ display: "flex", maxHeight: "80vh" }}>
        <SideMenuAdmin></SideMenuAdmin>
        <div className="content w-full bg-white overflow-y-auto">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
