import axios from 'axios'

export const API = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 5000,
  });
// *******************************API calls on user Schema***********************************

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
        success: false,
        data: [],
        error: error.message,
      };
    }
  };

  export const getUserById = async (userId) => {
    try {
      const res = await API.get(`users/${userId}`);
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

  export const getRecipesByUserId = async (userId) => {
    try {
      const res = await API.get(`recipes?authorId=${userId}`);
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

  export const updateUser = async (userId , userData ) => {
    try {
      const res = await API.patch(`users/${userId}`, userData);
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

  export const deleteUser = async (userId) => {
    try {
      const res = await API.delete(`users/${userId}`);
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


// *******************************API calls on Recipe Schema***********************************
 
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
        success: false,
        data: [],
        error: error.message,
      };
    }
  };

  export const getRecipeById = async (recipeId) => {
    try {
      const res = await API.get(`recipes/${recipeId}`);
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

  export const deleteRecipe = async (id) => {
    try {
        const res = await API.delete(`/recipes/${id}`);
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


 //******************************API calls on reviews****************************/

 export const getReviewsOnRecipe = async (recipeId) => {
  try {
    const res = await API.get(`reviews?postId=${recipeId}`);
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


 export const getAllReviews = async () => {
  try {
    const res = await API.get('reviews');
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

export const placeNewReview = async (review) => {
  try {
    const res = await API.post("reviews", review);
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

export const deleteReview = async (reviewId) => {
  try {
    const res = await API.delete(`reviews/${reviewId}`);
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

//******************************API calls on Subadmin schema *****************/

export const getSubAdmins = async () => {
  try {
    const res = await API.get("sub-admins");
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

export const RegisterSubAdmin = async (userData) => {
  try {
    const res = await API.post("sub-admins", userData);
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

export const updateSubAdmin = async (subAdminId , subAdminData ) => {
  try {
    const res = await API.patch(`sub-admins/${subAdminId}`, subAdminData);
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

export const getSubAdminById = async (subAdminId) => {
  try {
    const res = await API.get(`sub-admins/${subAdminId}`);
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

export const deleteSubAdmin = async (subAdminId) => {
  try {
    const res = await API.delete(`sub-admins/${subAdminId}`);
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
