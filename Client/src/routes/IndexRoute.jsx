import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Lazy-loaded components
const Layout = React.lazy(() => import('../components/layout/Layout'));
const PrivateRoutesUser = React.lazy(() => import('./privateRoutes/privateRoutesUser/PrivateRoutesUser'));
const PrivateRoutesAdmin = React.lazy(() => import('./privateRoutes/privateRoutesAdmin/PrivateRoutesAdmin'));
const PrivateRoutesSubAdmin = React.lazy(() => import('./privateRoutes/privateRoutesSubAdmin/PrivateRoutesSubAdmin'));
const Home = React.lazy(() => import('../components/pages/home/Home'));
const LoginPage = React.lazy(() => import('../components/pages/auth/LoginPage'));
const SignupPage = React.lazy(() => import('../components/pages/auth/SignupPage'));
const RecipeListing = React.lazy(() => import('../components/pages/recipe/RecipeListing'));
const RecipeDetails = React.lazy(() => import('../components/pages/recipe/RecipeDetails'));
const SavedRecipes = React.lazy(() => import('../components/pages/user/SavedRecipes'));
const CreatedRecipes = React.lazy(() => import('../components/pages/user/CreatedRecipes'));
const CreateRecipe = React.lazy(() => import('../components/pages/recipe/newRecipe/CreateRecipe'));
const UpdateRecipe = React.lazy(() => import('../components/pages/recipe/newRecipe/UpdateRecipe'));
const ErrorPage = React.lazy(() => import('../components/pages/error/ErrorPage'));


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
