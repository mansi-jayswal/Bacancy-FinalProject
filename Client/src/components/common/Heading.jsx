import React from 'react';

function Heading({ text }) {
  return (
    <div className="flex items-center justify-center py-4">
      <div className="border-t border-customRed border-solid flex-grow mr-4"></div>
      <h2 className="text-customRed text-lg font-bold">{text}</h2>
      <div className="border-t border-customRed border-solid flex-grow ml-4"></div>
    </div>
  );
}

export default Heading;
