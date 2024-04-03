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
  