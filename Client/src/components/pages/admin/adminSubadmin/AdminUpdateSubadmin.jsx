import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';
import { getSubAdminById, updateSubAdmin } from '../../../../utils/axios';
import { toast } from 'react-toastify';
import FormAction from '../../../common/Auth/formActions';

function AdminUpdateSubadmin() {
  const { id } = useParams();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup
    .string()
    .required('Password is required!')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{4,}$/,
      'Password must contain at least one capital letter, one small letter, one special character, and one number!'
    ),       category: yup.string().required('Category is required'),
  });



  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getSubAdminById(id);
        setValue('name', data.name);
        setValue('email', data.email);
        setValue('password', data.password);
        setValue('category', data.assignedCategory);
      } catch (error) {
        console.error('Error fetching subadmin:', error);
        toast.error('Failed to fetch subadmin data');
      }
    };
    fetchData();
  }, [id, setValue]);



  const onSubmit = async (data) => {
    try {
      await updateAccount(data);
    } catch (error) {
      console.error('Error updating sub-admin:', error);
      toast.error('Failed to update sub-admin');
    }
  };

  const updateAccount = async (formData) => {
    try {
      await updateSubAdmin(id, formData);
      toast.success('Sub-admin updated Successfully!');
      navigate("/admin");
    } catch (err) {
      throw err;
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Update Subadmin</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            {...register('name')}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
              errors.name ? 'border-red-500' : 'focus:border-blue-500'
            }`}
            required
          />
          {errors.name && <p className="text-red-500 mt-1">{errors.name.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            {...register('email')}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
              errors.email ? 'border-red-500' : 'focus:border-blue-500'
            }`}
            required
          />
          {errors.email && <p className="text-red-500 mt-1">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            {...register('password')}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
              errors.password ? 'border-red-500' : 'focus:border-blue-500'
            }`}
            required
          />
          {errors.password && <p className="text-red-500 mt-1">{errors.password.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Assign new Category</label>
          <input
            type="text"
            id="category"
            name="category"
            {...register('category')}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
              errors.category ? 'border-red-500' : 'focus:border-blue-500'
            }`}
            required
          />
          {errors.category && <p className="text-red-500 mt-1">{errors.category.message}</p>}
        </div>
        <div className="text-center">
          <FormAction handleSubmit={handleSubmit} text="Update sub admin" />
        </div>
      </form>
    </div>
  );
}

export default AdminUpdateSubadmin;
