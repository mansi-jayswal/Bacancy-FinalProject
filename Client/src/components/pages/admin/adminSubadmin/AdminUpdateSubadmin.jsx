import React, { useEffect, useState } from 'react';
import FormAction from '../../../common/Auth/formActions';
import { toast } from 'react-toastify';
import { getSubAdminById, updateSubAdmin } from '../../../../utils/axios';
import { useParams, useNavigate } from 'react-router-dom';

function AdminUpdateSubadmin() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subAdmin , setSubAdmin] = useState();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    category: '',
  });
  useEffect(() => {
    getSubAdminById(id)
      .then((res) => {
        setSubAdmin(res.data)
        console.log(subAdmin)
      })
      .catch((err) => {
        console.log('Error fetching subadmin:', err);
        toast.error('Failed to fetch subadmin data');
      });
  }, []);

  useEffect(() => {
    if (subAdmin) {
      const { name, email, password, assignedCategory } = subAdmin;
      setFormData({ name, email, password, category: assignedCategory });    }
  }, [subAdmin]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateAccount();
      // toast.success('Sub-admin updated Successfully!');
      // navigate("/admin-subadmins");
    } catch (error) {
      console.error('Error updating sub-admin:', error);
      toast.error('Failed to update sub-admin');
    }
  };

  const updateAccount = async () => {
    const updatedSubAdmin = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      assignedCategory: formData.category,
      tags: [...subAdmin.tags] ,
    };
    try {
      await updateSubAdmin(id, updatedSubAdmin);
       toast.success('Sub-admin updated Successfully!');
      navigate("/admin");
    } catch (err) {
      throw err;
    }
  };

  if(!subAdmin) return <div>loading...</div>

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Update Subadmin</h2>
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
          <FormAction handleSubmit={handleSubmit} text="Update sub admin" />
        </div>
      </form>
    </div>
  );
}

export default AdminUpdateSubadmin;
