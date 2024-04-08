
import React from 'react';

const InputField = ({ label, type, register, error , id  , name}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700">{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        className={`border rounded-md py-2 px-3 mt-1 w-full ${error ? 'border-red-500' : 'border-gray-300'}`}
        {...register}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error?.message}</p>}
    </div>
  );
};

export default InputField;
