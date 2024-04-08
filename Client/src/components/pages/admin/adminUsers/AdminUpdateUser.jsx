import { useEffect, useState } from "react";
import { signupFields } from "../../../common/constants/formFields";
import FormAction from "../../../common/Auth/formActions";
import Input from "../../../common/Auth/Input";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API, getUserById, updateUser } from "../../../../utils/axios";

const fields = signupFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function AdminUpdateUser() {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetching an individual user's data by id getting from url paramater by useParams
      getUserById(id)
      .then((res) => setUserData(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const [signupState, setSignupState] = useState(fieldsState);

  useEffect(() => {
    if (userData) {
      setSignupState(userData);
    }
  }, [userData]);

  const handleChange = (e) =>
    setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(signupState);
    try {
      // Updating the user data
      await updateUser(id , signupState)
      toast.success("User updated Successfully!");
      navigate("/admin-users");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user");
    }
  };

  return (
    <>
      {userData && ( // Rendering the form only when user data is available
        <div className="min-h-full h-vh flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <h1 className="text-xl text-customRed">Update User</h1>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
                        name={field.name}
                        value={signupState[field.id]}
                        onChange={handleChange}
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
                    </div>
                  ) : (
                    <Input
                      key={field.id}
                      handleChange={handleChange}
                      value={signupState[field.id]}
                      labelText={field.labelText}
                      labelFor={field.labelFor}
                      id={field.id}
                      name={field.name}
                      type={field.type}
                      isRequired={field.isRequired}
                      placeholder={field.placeholder}
                    />
                  )
                )}
                <FormAction handleSubmit={handleSubmit} text="Update user" />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

