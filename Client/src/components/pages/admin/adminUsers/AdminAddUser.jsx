import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signupFields } from "../../../common/constants/formFields";
import FormAction from "../../../common/Auth/formActions";
import Input from "../../../common/Auth/Input";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { API, RegisterUser } from "../../../../utils/axios";
import { toast } from "react-toastify";

const fields = signupFields;

const schema = yup.object().shape({
  name: yup.string().required("Username is required"),
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

export default function AdminAddUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [users, setUsers] = useState();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    API.get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  });

  const onSubmit = async (data) => {
    try {
      
      await createAccount(data);
      toast.success("User created Successfully!");
      navigate("/admin-users");
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Failed to create user");
    }
  };

  const createAccount = (userData) => {
    const newUser = {
      id:
      users.length !== 0
      ? (parseInt(users[users.length - 1].id) + 1).toString()
      : "1",
      name: userData.name,
      email: userData.email,
      password: userData.password,
      saved_recipes: [],
      created_recipes: [],
      reviews: [],
      preference: userData.preference,
    };

    return RegisterUser(newUser)
      .then((res) =>{
        console.log("user created successfully by admin! " + res.data)})
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="min-h-full h-vh flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-xl text-customRed">Create new User</h1>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="">
              {fields.map((field) =>
                field.type === "dropdown" ? (
                  <div key={field.id}>
                    <label
                      htmlFor={field.id}
                      className="block text-sm font-medium text-gray-700"
                    >
                      {field.labelText}
                    </label>
                    <select
                      id={field.id}
                      {...register(field.id)}
                      required={field.isRequired}
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
                    {errors[field.id] && (
                      <span className="text-red-500">{errors[field.id].message}</span>
                    )}
                  </div>
                ) : (
                  <Input
                    key={field.id}
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
                )
              )}
              <FormAction text="Register user" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

