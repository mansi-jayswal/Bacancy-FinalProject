import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from './navbar/Navbar'
import Footer  from './footer/Footer'
import NavbarFile from './navbar/Navbar/NavbarFile'

const Layout = () => {
  
  return (
    <>
      {/* <Navbar /> */}
      <NavbarFile />
      <div className="min-h-[85vh]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;