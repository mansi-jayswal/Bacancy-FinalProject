import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormAction from '../../../common/Auth/formActions';
import { RegisterSubAdmin, getSubAdmins } from '../../../../utils/axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function AdminAddSubadmin() {
  const navigate = useNavigate();

  const [subAdmins, setSubAdmins] = useState([]);

  const schema = yup.object().shape({
    name: yup.string().required('Name is required').min(3,'Min 3 characters required').max(10 ,'Maximum 10 characters allowed!'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup
    .string()
    .required('Password is required!')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{4,}$/,
      'Password must contain at least one capital letter, one small letter, one special character, and one number!'
    ),
    category: yup.string().required('Category is required!'),
  });
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    getSubAdmins()
      .then((res) => setSubAdmins(res.data))
      .catch((err) => console.log('error in fetching all sub admins'));
  }, []);



  const onSubmit = async (data) => {
    try {
      await createAccount(data);
    } catch (error) {
      console.error('Error creating sub-admin:', error);
    }
  };

  const createAccount = async (formData) => {
    const newSubAdmin = {
      id: subAdmins.length !== 0 ? (parseInt(subAdmins[subAdmins.length - 1].id) + 1).toString() : '1',
      name: formData.name,
      email: formData.email,
      password: formData.password,
      assignedCategory: formData.category,
      tags: [],
    };

    try {
      const res = await RegisterSubAdmin(newSubAdmin);
      console.log('Sub admin created successfully by admin! ' + res.data);
      toast.success('Sub-admin created Successfully!');
      navigate('/admin');
    } catch (err) {
      console.log(err);
      toast.error('Failed to create sub-admin');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Add New Subadmin</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            {...register('name')}
            placeholder="Enter name"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
              errors.name ? 'border-red-500' : 'focus:border-blue-500'
            }`}
          />
          {errors.name && <p className="text-red-500 mt-1">{errors.name.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            {...register('email')}
            placeholder="Enter email"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
              errors.email ? 'border-red-500' : 'focus:border-blue-500'
            }`}
          />
          {errors.email && <p className="text-red-500 mt-1">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            {...register('password')}
            placeholder="Enter password"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
              errors.password ? 'border-red-500' : 'focus:border-blue-500'
            }`}
          />
          {errors.password && <p className="text-red-500 mt-1">{errors.password.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 font-bold mb-2">
            Assign new Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            {...register('category')}
            placeholder="Enter category"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
              errors.category ? 'border-red-500' : 'focus:border-blue-500'
            }`}
          />
          {errors.category && <p className="text-red-500 mt-1">{errors.category.message}</p>}
        </div>
        <div className="text-center">
          <FormAction handleSubmit={handleSubmit} text="Register sub admin" />
        </div>
      </form>
    </div>
  );
}

export default AdminAddSubadmin;

