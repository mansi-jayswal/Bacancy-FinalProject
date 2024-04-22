import React from 'react'
import newsLetterImage from "../../assets/newsLetterImage.png";
import { toast } from "react-toastify";


const handleSubscription = (e) =>{
    e.preventDefault();
    console.log('sub clicked!');
    toast.success('Email Sent succesfully!');
}

function NewsLetterSub() {
  return (
    <div>
       <div className="bg-gray-400 py-8 mb-2">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold font-dancing text-center mb-4 md:mb-6 text-customRed">Subscribe to Our Newsletter</h2>
          <form className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between" onSubmit={handleSubscription}>
            <img src={newsLetterImage} alt='image' className='mr-2'></img>
            <div className='mt-16'>     
            <div className='text-center mb-4'>
            <h1 className='text-yellow-800  font-semibold font-xl'>FLAVOURREALM COOKBOOK</h1>  
            </div>
            <p className='mb-2 text-white'>The eBook includes our most popular 25 recipes in a beautiful, easy to download format. Enter your email and we'll send it right over!</p>  
            <input
              type="email"
              placeholder="Your email address"
              className="w-full md:w-3/5 px-4 py-3 md:mr-2 rounded-md border border-gray-300 focus:outline-none focus:border-customRed"
              required
            />
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-3 mt-4 md:mt-0 md:ml-0 bg-customRed text-white rounded-md hover:bg-customRedDark focus:outline-none focus:bg-customRedDark transition duration-300"
            >
              Subscribe
            </button>
            </div>
          </form>
          <p className="text-sm text-center mt-4 md:mt-6 text-black/60">Get updates on our latest recipes, tips, and more!</p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default NewsLetterSub;