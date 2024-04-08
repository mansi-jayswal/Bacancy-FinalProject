// Navbar.js

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { publicLinks, userLinks, adminLinks, subAdminLinks } from "./links";
import { removeRole } from "../../../../redux/actions/actions";
import { toast } from "react-toastify";
import logo from "../../../../assets/logo.png";


const NavbarFile = () => {
    const data = useSelector((state) => state.role);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const role = data.user ? "user" : data.admin ? "admin" : data.sub_admin ? "sub_admin" : null;
    console.log('role from navbarfile: ', role);
    
  const renderLinks = () => {
    let links = [];

    switch (role) {
      case "user":
        links = userLinks;
        break;
      case "admin":
        links = adminLinks;
        break;
      case "sub_admin":
        links = subAdminLinks;
        break;
      default:
        links = publicLinks;
        break;
    }

    return links.map((link, index) => (
      <Link key={index} to={link.path} className="block  text-black hover:text-gray-700">
        {link.name}
      </Link>
    ));
  };

  const handleLogout=()=>{
    dispatch(removeRole());
    toast.success('Logout Successfully!');
    navigate('/')
}

  return (
    <nav className="bg-white py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
      <div className="mx-2 size-[2rem] w-20 h-10">
            <img onClick={()=>{
              if(role==='admin') navigate('/admin')
              else if(role==='sub_admin') navigate('/sub-admin')
              else navigate('/')
            }}
              src={logo}
              alt="Logo"
              className="h-full w-full"
              style={{ cursor: "pointer" }}
            />
          </div>
        <div className="flex space-x-4 ">{renderLinks()}</div>
        {
            !data.isAuth ? 
            <button onClick={()=>navigate('/login')} className="block  text-black hover:text-gray-700 ">
                Login/Register
            </button>
            :
            <button onClick={handleLogout} className="block  text-black hover:text-gray-700">
                Logout
            </button>

        }
      </div>

    </nav>
  );
};

export default NavbarFile;
