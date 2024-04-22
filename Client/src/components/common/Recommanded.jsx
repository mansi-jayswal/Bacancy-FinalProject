import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Recommanded = ({ text, link }) => {
  return (
    <div className="bg-gray-100 border border-gray-300 rounded-md shadow-md p-4 mb-4 md:mb-0 mr-4 w-64 h-16 text-center">
      <Link to={link} className="block">
        <p className="text-lg font-semibold text-gray-800">
          {text}{" "}
          <FaLongArrowAltRight className="inline text-black  cursor-pointer" />
        </p>
      </Link>
    </div>
  );
};

export default Recommanded;
