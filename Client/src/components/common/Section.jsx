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
          <img src={cuisine.image} alt={cuisine.name} className="w-20 h-20 rounded-full mb-2 object-cover" />
          <p className="text-black text-sm">{cuisine.name}</p>
        </div>
      ))}
    </div>
    </>
  );
}

export default Section;
