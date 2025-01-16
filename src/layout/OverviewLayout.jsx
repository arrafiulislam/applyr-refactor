import React from "react";
import { Outlet } from "react-router-dom";
import SideMenu from "../components/sidemenu/SideMenu";
import Navbar from "../components/nav/Navbar";

const OverviewLayout = () => {
  return (
    <div>
      <Navbar></Navbar>

      <div style={{ display: "flex", maxHeight: "80vh" }}>
        <SideMenu />
        <div className="content w-full bg-white overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default OverviewLayout;
