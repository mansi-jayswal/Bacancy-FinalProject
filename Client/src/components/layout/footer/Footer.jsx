import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-customLightBeige text-black/60 py-8 sticky  top-full width-0 ">
      <div className="container mx-auto p-4 md:py-3 flex flex-col min-h-full">
        <div className="flex-grow">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-4 md:mb-0">
              <h4 className="text-lg font-bold mb-2">Quick Links</h4>
              <ul>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-400">Home</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-400">Recipes</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-400">Login</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-400">Contact Us</a>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/3 mb-4 md:mb-0">
              <h4 className="text-lg font-bold mb-2">Follow Us</h4>
              <ul>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-400">Facebook</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-400">Twitter</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-400">Instagram</a>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h4 className="text-lg font-bold mb-2">Contact Info</h4>
              <p>Email: mansi.jayswal@bacancy.com</p>
              <p>Phone: 7096205446</p>
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
