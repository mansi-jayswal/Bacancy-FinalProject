import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function ProfilePage() {
    const user = useSelector(state=>state.role.user)
    const navigate=useNavigate();
  return (
    <div>
       <div className="h-auto mt-6  dark:bg-gray-800 flex flex-wrap items-center justify-center ml-4 mr-4 lg:m-0 lg:mb-auto">
      <div className="container lg:w-2/6 xl:w-2/7 sm:w-full md:w-2/3 bg-customLightBeige shadow-lg transform duration-200 easy-in-out">
        <div className="h-32 overflow-hidden">
          <img
            className="w-full h-48 rounded-lg rounded-b-none object-cover"
            src="https://media.istockphoto.com/id/1081790292/vector/restaurant-staff-characters-design-include-chef-assistants-manager-waitress-professionals.jpg?s=612x612&w=0&k=20&c=WwuLspU3iOpCZx12KtjVZ89H_sXZBN0BDqBVuIJov7M="
            alt=""
          />
        </div>
        <div className="flex justify-center px-5 -mt-12">
          <img
            className="h-32 w-32 bg-white p-2 rounded-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmrMQ7_EPPcAO_2lI0YFEDJR_IcHS3NDXFg0CGPJ7shA&s"
            alt=""
          />
        </div>
        <div>
          <div className="text-center px-14">
            <h2 className="text-gray-800 text-3xl font-bold">{user.name}</h2>
            <a
              className="text-gray-400 mt-2 hover:text-blue-500"
              href="https://www.instagram.com/immohitdhiman/"
              target="_blank"
              rel="noopener noreferrer"
            >
            </a>
            <p className="mt-2 text-gray-500 text-sm">
              Email: {user.email}
            </p>
            <p className="mt-2 text-gray-500 text-sm">
            Password: {user.password}
            </p>
          </div>
          <hr className="mt-6" />
          <div className="flex bg-gray-50">
            <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
              <button onClick={()=>navigate('/saved-recipes')}>
                <span className="font-semibold">{user.saved_recipes.length}</span> Saved recipes
              </button>
            </div>
            <div className="border"></div>
            <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
              <button onClick={()=> navigate('/my-creations')}>
                <span className="font-semibold">{user.created_recipes.length}</span> Created recipes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
      
    </div>
  )
}

export default ProfilePage