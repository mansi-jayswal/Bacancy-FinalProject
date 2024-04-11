import React, { useState , useEffect } from 'react';
import { CiSearch } from 'react-icons/ci';
import useDebounce from './useDebounce';

const SearchBar = ({ onSearch, placeholder, value }) => {
  const [inputValue, setInputValue] = useState(value);
  const debouncedValue = useDebounce(inputValue, 300); 

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  return (
    <div className="flex items-center">
      <div className="relative">
        <CiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-customRed text-xl" />
        <input
          type="text"
          value={inputValue}
          placeholder={placeholder}
          onChange={handleChange}
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-yellow-400"
        />
      </div>
    </div>
  );
};

export default SearchBar;
