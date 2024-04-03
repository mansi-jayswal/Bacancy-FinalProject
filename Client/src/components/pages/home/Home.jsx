import React from 'react';
import banner from '../../../assets/banner.png';

function Home() {
  return (
    <div className="relative">
      <img src={banner} alt="banner" className="w-full h-auto mr-4 " />
      {/* <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 flex justify-center items-center text-white text-4xl font-bold">
        Welcome to Our Website */}
      </div>
    // </div>
  );
}

export default Home;
