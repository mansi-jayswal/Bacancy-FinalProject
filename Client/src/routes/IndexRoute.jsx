import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from '../components/layout/Layout';
import PrivateRoutesUser from './privateRoutes/privateRoutesUser/PrivateRoutesUser';
import PrivateRoutesAdmin from './privateRoutes/privateRoutesAdmin/PrivateRoutesAdmin';
import PrivateRoutesSubAdmin from './privateRoutes/privateRoutesSubAdmin/PrivateRoutesSubAdmin';
import Home from '../components/pages/home/Home';
import LoginPage from '../components/pages/auth/LoginPage';
import SignupPage from '../components/pages/auth/SignupPage';
import RecipeListing from '../components/pages/recipe/RecipeListing'
import RecipeDetails from '../components/pages/recipe/RecipeDetails'
import SavedRecipes from '../components/pages/user/SavedRecipes'
import CreatedRecipes from '../components/pages/user/CreatedRecipes'
import CreateRecipe from '../components/pages/recipe/newRecipe/CreateRecipe'
import UpdateRecipe from '../components/pages/recipe/newRecipe/UpdateRecipe'
import ErrorPage from '../components/pages/error/ErrorPage';


function IndexRoute() {
  const { isAuth, user, sub_admin, admin } = useSelector((state) => state.role);
  const isUserAuth = isAuth ;
  const isAdminAuth = isAuth ;
  const isSubAdminAuth = isAuth ;

  console.log('from indexauth:    ' + isAuth, user , sub_admin , admin);
  console.log("is user auth:    "+ isUserAuth);
  
  return createBrowserRouter([
    {
      
      element: <Layout />,
      children: [
        // user specific routes here
        {
            path:'' ,
            element: <Home />
        }, 
        {
            path:'login',
            element : <LoginPage />
        } , 
        {
            path: 'signup',
            element: <SignupPage />
        } ,
        {
            path: 'recipes',
            element: <RecipeListing />
        },
        {
            path:'recipes/:id',
            element: <RecipeDetails />
        },
        {
          element: <PrivateRoutesUser isUserAuth={isUserAuth} />,
          children: [
            {
                path:'saved-recipes',
                element: <SavedRecipes />
            },
            {
                path:'my-creations',
                element: <CreatedRecipes />
            },
            {
                path:'new-recipe',
                element: <CreateRecipe />
            },
            {
                path:'update-recipe/:id',
                element: <UpdateRecipe />
            }
          ],
        },
        {
          element: <PrivateRoutesAdmin isAdminAuth={isAdminAuth} />,
          children: [
            // Admin-specific routes 
          ],
        },
        {
          element: <PrivateRoutesSubAdmin isSubAdminAuth={isSubAdminAuth} />,
          children: [
            // sub-admin-specific routes 
          ],
        },
      ],
    },
    // Error page
    {
      path:'*',
      element: <ErrorPage />
    }
  ]);
}

export default IndexRoute;
