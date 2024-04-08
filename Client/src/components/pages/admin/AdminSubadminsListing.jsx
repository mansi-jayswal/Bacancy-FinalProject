import React from 'react';
import Button from '../../common/Button';

function AdminSubadminListing() {
  const handleClick = () =>{
  console.log('add sub-admin button clicked!');
  }
  return (
    <div>
      <div className='text-center'>
        <h1 className='text-xl font-semibold'>Sub admins</h1>
      </div>
      <div className='flex justify-end items-center mb-4'>
        {/* <input 
          type='text' 
          placeholder='Search...' 
          className='appearance-none block w-auto px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm '
        /> */}
        <Button children='+Add sub-admin' handleClick={handleClick} />
      </div>
    </div>
  );
}

export default AdminSubadminListing;
