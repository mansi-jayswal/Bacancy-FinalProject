import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "../../common/Button";
import {
  getRecipes,
  getRecipesByUserId,
  updateRecipe,
  updateUser,
} from "../../../utils/axios";
import { toast } from "react-toastify";
import { setRole } from "../../../redux/actions/actions";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";

function ProfilePage() {
  const user = useSelector((state) => state.role.user);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [recipesOfUser, setRecipesOfUser] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const [editedUser, setEditedUser] = useState({
    name: user.name,
    email: user.email,
    password: user.password,
    preference: user.preference,
  });
  const [cuisineOptions, setCuisineOptions] = useState([]);

  useEffect(() => {
    getRecipes()
      .then((res) => {
        const cuisines = res.data.map((recipe) => recipe.cuisine);
        const uniqueCuisines = [...new Set(cuisines)];
        setCuisineOptions(uniqueCuisines);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleUpdateProfile = () => {
    updateUser(user.id, editedUser)
      .then((res) => {
        toast.success("Profile updated successfully!");
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
        toast.error("Error updating profile, please try again!");
      });

    const newUser = {
      id: user.id,
      name: editedUser.name,
      email: editedUser.email,
      password: editedUser.password,
      preference: editedUser.preference,
      saved_recipes: user.saved_recipes,
      created_recipes: user.created_recipes,
      reviews: user.reviews,
    };

    dispatch(setRole("user", newUser));

    // Update authorName in the recipe schema only if user's name is changed otherwise there's no need to make api call to update recipe everytime
    if (user.name !== editedUser.name) {
      getRecipesByUserId(user.id)
        .then((res) => {
          res.data.forEach((recipe) => {
            const updatedRecipe = { ...recipe, authorName: editedUser.name };
            updateRecipe(recipe.id, updatedRecipe)
              .then((res) => {
                console.log("Recipe updated:", res.data);
              })
              .catch((err) => {
                console.error("Error updating recipe:", err);
              });
          });
        })
        .catch((err) => {
          console.error("Error fetching recipes:", err);
        });
    }
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-lg mx-auto bg-customLightBeige shadow-md rounded-xl p-8 mb-32">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4 text-customRed font-dancing ">
            Profile Information
          </h2>
        </div>
        {isEditing ? (
          <>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold mb-2"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={editedUser.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-customRed"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold mb-2"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={editedUser.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-customRed"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-semibold mb-2"
              >
                Password:
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={editedUser.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-customRed pr-10"
                />
                <span
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
                  onClick={handleTogglePassword}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-customRed" />
                  ) : (
                    <FaEye className="text-customRed" />
                  )}
                </span>
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="preference"
                className="block text-gray-700 font-semibold mb-2"
              >
                Preference:
              </label>
              <select
                id="preference"
                name="preference"
                value={editedUser.preference}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-customRed"
              >
                {cuisineOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-center">
              <Button handleClick={handleUpdateProfile} children="Update" />
              <Button handleClick={() => setIsEditing(false)} children="Back" />
            </div>
          </>
        ) : (
          <>
            <div className="mb-4">
              <strong>Name:</strong> {user.name}
            </div>
            <div className="mb-4">
              <strong>Email:</strong> {user.email}
            </div>
            <div className="mb-4">
              <strong>Password:</strong>{" "}
              {user.password.split("").map((char, index) => (
                <span key={index}>*</span>
              ))}
            </div>
            <div className="mb-4">
              <strong>Preference:</strong> {user.preference}
            </div>
            <div className="text-center">
              <Button handleClick={() => setIsEditing(true)}>
                <>
                  <CiEdit className="inline mr-2 font-semibold" size={20} />{" "}
                  Edit Profile
                </>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
