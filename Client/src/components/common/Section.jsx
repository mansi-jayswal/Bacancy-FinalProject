import React from 'react';
import italian from '../../assets/italian.jpg'
import indian from '../../assets/indian.jpeg'
import chinese from '../../assets/chinese.jpg'
import mexican from '../../assets/mexican.jpg'
import Thaii from '../../assets/Thaii.jpg'
import Heading from './Heading';

function Section() {
  const cuisines = [
    { name: "Italian", image: italian },
    { name: "Mexican", image: mexican },
    { name: "Chinese", image: chinese },
    { name: "Indian", image: indian },
    { name: "Thai", image: Thaii },
  ];

  return (
    <>
    <Heading text="Search by Cuisines" />  
    <div className='flex w-full  m-2 p-4 rounded justify-center'>
      {cuisines.map((cuisine, index) => (
        <div key={index} className="flex items-center flex-col mr-8">
                <div className="relative w-20 h-20 rounded-full overflow-hidden mb-2 cursor-pointer transition-transform transform hover:scale-110">
          <img 
            src={cuisine.image} 
            alt={cuisine.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50 transition-opacity duration-300 ease-in-out  hover:opacity-50"></div>
          <p className="absolute bottom-7 left-0 right-0 text-center text-white font-bold z-10">{cuisine.name}</p>
        </div>
        </div>
      ))}
    </div>
    </>


  );
}

export default Section;
