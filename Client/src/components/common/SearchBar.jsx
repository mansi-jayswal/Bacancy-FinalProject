import React from 'react';
import { CiSearch } from 'react-icons/ci';

const SearchBar = ({ onSearch, placeholder , value}) => {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="flex items-center">
      <div className="relative">
        <CiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-customRed text-xl" />
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-yellow-400"
        />
      </div>
    </div>
  );
};

export default SearchBar;
