import axios from 'axios'

export const API = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 5000,
  });

  export const getRecipes = async () => {
    try {
      const res = await API.get("recipes");
      return {
        success: true,
        data: res.data,
        error: null,
      };
    } catch (error) {
      return {
        sucess: false,
        data: [],
        error: error.message,
      };
    }
  };

  export const getUsers = async () => {
    try {
      const res = await API.get("users");
      return {
        success: true,
        data: res.data,
        error: null,
      };
    } catch (error) {
      return {
        sucess: false,
        data: [],
        error: error.message,
      };
    }
  };


  export const RegisterUser = async (userData) => {
    try {
      const res = await API.post("users", userData);
      return {
        success: true,
        data: res.data,
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.message,
      };
    }
  };
  
  export const placeNewRecipe = async (recipe) => {
    try {
      const res = await API.post("recipes", recipe);
      return {
        success: true,
        data: res.data,
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.message,
      };
    }
  };

  export const updateRecipe = async (id, recipe) => {
    try {
        const res = await API.patch(`/recipes/${id}`, recipe);
        return {
            success: true,
            data: res.data,
            error: null,
        };
    } catch (error) {
        return {
            success: false,
            data: [],
            error: error.message,
        };
    }
  };
  