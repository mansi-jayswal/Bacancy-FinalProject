import React from 'react';
import { GiTrophy } from 'react-icons/gi';

function Heading({ text , showIcon}) {
  return (
    <div className="flex items-center justify-center py-4">
      <div className="border-t border-customRed border-solid flex-grow mr-4"></div>
      <div className='text-center flex justify-center'>
      {showIcon && <GiTrophy className='inline text-yellow-500 mr-2' size={25} />}
      <h2 className="text-customRed text-lg font-bold">{text}</h2>
      </div>
      <div className="border-t border-customRed border-solid flex-grow ml-4"></div>
    </div>
  );
}

export default Heading;