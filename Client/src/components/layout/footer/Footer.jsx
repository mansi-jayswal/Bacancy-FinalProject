import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { BsInstagram } from "react-icons/bs";
import { FaPinterest } from "react-icons/fa6";





const Footer = () => {
  return (
    <>
    <footer className="bg-customLightBeige text-black/60 py-8 sticky top-full width-0 ">
      <div className="container mx-auto p-4 md:py-3 flex flex-col min-h-full">
        <div className="flex-grow">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-4 md:mb-0">
              <h4 className="text-lg font-bold mb-2">Quick Links</h4>
              <ul>
                <li className="mb-2">
                  <Link to="/" className="hover:text-customRed">Home</Link>
                </li>
                <li className="mb-2">
                  <Link to="/recipes" className="hover:text-customRed">Recipes</Link>
                </li>
                <li className="mb-2">
                  <Link to="/login" className="hover:text-customRed">Login</Link>
                </li>
                <li className="mb-2">
                  <Link to="/about" className="hover:text-customRed">About Us</Link>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/3 mb-4 md:mb-0">
              <h4 className="text-lg font-bold mb-2">Follow Us</h4>
              <ul className='flex gap-4'>
                <li className="mb-2">
                  <Link href="#" className="hover:text-customRed"><FaFacebook size={25} /></Link>
                </li>
                <li className="mb-2">
                  <Link href="#" className="hover:text-customRed"><FaXTwitter size={25}/></Link>
                </li>
                <li className="mb-2">
                  <Link href="#" className="hover:text-customRed"><BsInstagram size={25}/></Link>
                </li>
                <li className="mb-2">
                  <Link href="#" className="hover:text-customRed"><FaPinterest size={25}/></Link>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h4 className="text-lg font-bold mb-2">Contact Info</h4>
              <p>Email: flavourrealm@info.com</p>
              <p>Phone: 079-12345678</p>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center bg-customRed text-white mt-4 py-2">
        <p className="text-sm">&copy; {new Date().getFullYear()} Mansi Jayswal. All rights reserved.</p>
      </div>
    </footer>
    </>
  );
}

export default Footer;
