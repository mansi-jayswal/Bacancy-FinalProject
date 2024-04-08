import React, { useEffect, useState } from 'react';
import FormAction from '../../../common/Auth/formActions';
import { RegisterSubAdmin, getSubAdmins } from '../../../../utils/axios';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function AdminAddSubadmin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    category: '',
  });

  const [subAdmins , setSubAdmins]= useState([]);

  useEffect(()=>{
    getSubAdmins()
    .then(res=> setSubAdmins(res.data))
    .catch(err=> console.log('error in fetching all sub admins'))
  },[])

  //handling change in the form fields 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      await createAccount();
    } catch (error) {
      console.error("Error creating sub-admin:", error);
    }
  };

  const createAccount = async () => {
    const newSubAdmin = {
      id: subAdmins.length !== 0 ? (parseInt(subAdmins[subAdmins.length - 1].id) + 1).toString() : "1",
      name: formData.name,
      email: formData.email,
      password: formData.password,
      assignedCategory: formData.category,
      tags: []
    };
    console.log(newSubAdmin);

    try {
      const res = await RegisterSubAdmin(newSubAdmin);
      console.log("Sub admin created successfully by admin! " + res.data);
      toast.success('Sub-admin created Successfully!');
      navigate("/admin");
    } catch (err) {
      console.log(err);
      toast.error('Failed to create sub-admin');
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Add New Subadmin</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Assign new Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter category"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="text-center">
        <FormAction handleSubmit={handleSubmit} text="Register sub admin" />

          {/* <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Add Subadmin</button> */}
        </div>
      </form>
    </div>
  );
}

export default AdminAddSubadmin;
