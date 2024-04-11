import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { publicLinks, userLinks, adminLinks, subAdminLinks } from "./links";
import { removeRole } from "../../../../redux/actions/actions";
import { toast } from "react-toastify";
import logo from "../../../../assets/logo.png";
import { IoIosLogOut } from "react-icons/io";


const NavbarFile = () => {
  const data = useSelector((state) => state.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = data.user
    ? "user"
    : data.admin
    ? "admin"
    : data.sub_admin
    ? "sub_admin"
    : null;

  const [showLinks, setShowLinks] = useState(false);

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  const handleLinkClick = () => {
    setShowLinks(false); 
  };

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
      <Link
        key={index}
        to={link.path}
        className="block text-center text-black hover:text-white hover:bg-customRed hover:underline-offset-2 md:p-2 rounded-xl"
        onClick={handleLinkClick}
      >
        {link.name}
      </Link>
    ));
  };

  const handleLogout = () => {
    dispatch(removeRole());
    setShowLinks(false);
    toast.success("Logout Successfully!");
    navigate("/");
  };

  return (
    <nav className="bg-white py-4 px-6">
      <div className="container mx-auto flex  md:flex-row justify-between items-center">
        <div className="mx-2 size-[2rem] w-20 h-10">
          <img
            onClick={() => {
              if (role === "admin") navigate("/admin");
              else if (role === "sub_admin") navigate("/sub-admin");
              else navigate("/");
            }}
            src={logo}
            alt="Logo"
            className="h-full w-full"
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="flex justify-end items-center">
          <div className="md:hidden">
            {/* Hamburger button for small devices */}
            <button
              onClick={toggleLinks}
              className="text-black hover:text-gray-700 focus:outline-none"
            >
              <svg
                className="w-6 h-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                {showLinks ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17 3a1 1 0 00-1-1H4a1 1 0 100 2h12a1 1 0 001-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm14 5a1 1 0 100-2H4a1 1 0 000 2h12z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  />
                )}
              </svg>
            </button>
          </div>
          {/* Links */}
          <div className="hidden gap-2 md:flex flex-col md:flex-row place-items-center text-xs lg:text-[15px]">
            {renderLinks()}
          </div>
          {/* Logout button */}
          {data.isAuth ? (
            <button
              onClick={handleLogout}
              className="hidden ml-2 md:block text-black hover:text-gray-700"
            >
              <IoIosLogOut className="inline font-semibold" size={25} title="Logout"/>
            </button>
          ) : (
            <button
              onClick={() =>{ 
            setShowLinks(!showLinks);
            navigate("/login")
          }}
              className=" hidden md:block text-black hover:text-white hover:bg-customRed p-1 ml-2 rounded-xl font-lora"
            >
              Login
            </button>
          )}
        </div>
      </div>
      {/* Dropdown menu for small devices */}
      {showLinks && (
        <div className="md:hidden">
          <div className="flex flex-col items-center mt-2 space-y-2">
            {renderLinks()}
            {data.isAuth ? (
              <button
                onClick={handleLogout}
                className="block text-black hover:text-gray-700"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="block text-black hover:text-gray-700"
              >
                Login/Register
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarFile;
