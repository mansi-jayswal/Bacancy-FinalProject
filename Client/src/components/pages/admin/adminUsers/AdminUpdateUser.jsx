import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signupFields } from "../../../common/constants/formFields";
import FormAction from "../../../common/Auth/formActions";
import Input from "../../../common/Auth/Input";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API, getUserById, updateUser } from "../../../../utils/axios";

const fields = signupFields;

const schema = yup.object().shape({
  name: yup.string().required("Username is required").min(3,'Min 3 characters required').max(10 ,'Maximum 10 characters allowed!'),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
  .string()
  .required('Password is required!')
  .matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{4,}$/,
    'Password must contain at least one capital letter, one small letter, one special character, and one number!'
  ),   
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  preference: yup.string().required("Preferred Cuisine is required"),
});

export default function AdminUpdateUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getUserData();
  }, [id]);

  const getUserData = () => {
    getUserById(id)
      .then((res) => setUserData(res.data))
      .catch((err) => console.log(err));
  };

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (userData) {
      //setting the initial values of existing user
      fields.forEach(field => setValue(field.id, userData[field.id]));
    }
  }, [userData, setValue]);

  const onSubmit = async (data) => {
    try {
      await updateUser(id, data);
      toast.success("User updated Successfully!");
      navigate("/admin-users");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user");
    }
  };

  return (
    <>
      {userData && (
        <div className="min-h-full h-vh flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <h1 className="text-xl text-customRed">Update User</h1>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="">
                {fields.map((field) => (
                  <div key={field.id}>
                    <label
                      htmlFor={field.id}
                      className="block text-sm font-medium text-gray-700"
                    >
                      {field.labelText}
                    </label>
                    {field.type === "dropdown" ? (
                      <select
                        id={field.id}
                        {...register(field.id)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-customRed focus:border-customRed sm:text-sm rounded-md"
                      >
                        <option value="" disabled>
                          {field.placeholder}
                        </option>
                        {field.options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <Input
                        register={register}
                        labelText={field.labelText}
                        labelFor={field.labelFor}
                        id={field.id}
                        name={field.name}
                        type={field.type}
                        isRequired={field.isRequired}
                        placeholder={field.placeholder}
                        error={errors[field.id]}
                      />
                    )}
                    {/* {errors[field.id] && (
                      <span className="text-red-500">{errors[field.id].message}</span>
                    )} */}
                  </div>
                ))}
                <FormAction text="Update user" />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

