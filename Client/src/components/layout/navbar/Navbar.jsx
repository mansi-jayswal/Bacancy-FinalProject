import React, { useState } from "react";
import logo from "../../../assets/logo.png";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <nav
        className="relative flex w-full flex-nowrap items-center justify-between py-2 shadow-dark-mild lg:flex-wrap lg:justify-start lg:py-4"
        data-twe-navbar-ref
      >
        <div className="flex w-full flex-wrap items-center justify-between px-3">
        <div className="mx-2 size-[2rem] w-20 h-10">
            {/* Adjust the dimensions of the logo image */}
            <img
              src={logo}
              alt="Logo"
              className="h-full w-full"
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className="flex items-center space-x-4">
           
            {/* Hamburger button for mobile view */}
            <button
              className="block border-0 bg-transparent px-2 text-black/50 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 lg:hidden"
              type="button"
              onClick={toggleMobileMenu}
              aria-label="Toggle navigation"
            >
              {/* Hamburger icon */}
              <span className="[&>svg]:w-7 [&>svg]:stroke-black/50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </button>
          </div>
          
          {/* Collapsible navbar container */}
          <div
            className={`!visible mt-2 ${
              mobileMenuOpen ? "flex" : "hidden"
            } flex-grow basis-[100%] items-center lg:mt-0 lg:!flex lg:basis-auto`}
            id="navbarSupportedContent11"
            data-twe-collapse-item
          >
            {/* Left links */}
            <ul
              className="list-style-none me-auto flex flex-col ps-0 lg:mt-1 lg:flex-row"
              data-twe-navbar-nav-ref
            >
              {/* Home link */}
              <li
                className="my-4 ps-2 lg:my-0 lg:pe-1 lg:ps-2"
                data-twe-nav-item-ref
              >
                <a
                  className="text-black transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 active:text-black/80 motion-reduce:transition-none lg:px-2"
                  aria-current="page"
                  href="#"
                  data-twe-nav-link-ref
                >
                  Home
                </a>
              </li>
              {/* Features link */}
              <li
                className="mb-4 ps-2 lg:mb-0 lg:pe-1 lg:ps-0"
                data-twe-nav-item-ref
              >
                <a
                  className="p-0 text-black/60 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 active:text-black/80 motion-reduce:transition-none lg:px-2"
                  href="#"
                  data-twe-nav-link-ref
                >
                  Recipes
                </a>
              </li>
              {/* Pricing link */}
              <li
                className="mb-4 ps-2 lg:mb-0 lg:pe-1 lg:ps-0"
                data-twe-nav-item-ref
              >
                <a
                  className="p-0 text-black/60 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 active:text-black/80 motion-reduce:transition-none lg:px-2"
                  href="#"
                  data-twe-nav-link-ref
                >
                  Blogs
                </a>
              </li>
              {/* About link */}
              <li
                className="mb-4 ps-2 lg:mb-0 lg:pe-1 lg:ps-0"
                data-twe-nav-item-ref
              >
                <a
                  className="p-0 text-black/60 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 active:text-black/80 motion-reduce:transition-none lg:px-2"
                  href="#"
                  data-twe-nav-link-ref
                >
                  Login/Register
                </a>
              </li>
            </ul>
          </div>
          <div className="relative">
              <form className="relative w-max">
                <input
                  type="search"
                  className="peer cursor-pointer relative z-10 h-12 w-12 rounded-full border  bg-transparent pl-12 outline-none focus:w-full focus:cursor-text focus:border-customRed focus:pl-16 focus:pr-4"
                  placeholder="Search..."
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-customRed px-3.5 peer-focus:border-customRed peer-focus:stroke-customRed"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </form>
            </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

