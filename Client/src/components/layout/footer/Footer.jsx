import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
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
              <ul>
                <li className="mb-2">
                  <a href="#" className="hover:text-customRed">Facebook</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-customRed">Twitter</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-customRed">Instagram</a>
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
        <div className="">
          {/* Additional content can go here */}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
