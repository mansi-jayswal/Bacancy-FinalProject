import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
const ProfilePage = React.lazy(() => import('../components/pages/user/ProfilePage'));
const AdminDashboard = React.lazy(() => import('../components/pages/admin/AdminDashboard'));
const AdminUsersListing = React.lazy(() => import('../components/pages/admin/AdminUsersListing'));
const AdminSubadminsListing = React.lazy(() => import('../components/pages/admin/AdminSubadminsListing'));
const AdminAddUser = React.lazy(() => import('../components/pages/admin/adminUsers/AdminAddUser'));
const AdminUpdateUser = React.lazy(() => import('../components/pages/admin/adminUsers/AdminUpdateUser'));
const SignupComp = React.lazy(() => import('../components/common/Auth/SignupComp'));
const SubAdminDashboard = React.lazy(() => import('../components/pages/subadmin/SubAdminDashboard'));
const AdminAddSubadmin = React.lazy(() => import('../components/pages/admin/adminSubadmin/AdminAddSubadmin'));
const AdminUpdateSubadmin = React.lazy(() => import('../components/pages/admin/adminSubadmin/AdminUpdateSubadmin'));
const SubAdminReviewSection = React.lazy(() => import('../components/pages/subadmin/SubAdminReviewSection'));


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
const AddReview = React.lazy(()=>import('../components/pages/review/AddReview'));

function IndexRoute() {
  const { isAuth, user, sub_admin, admin } = useSelector((state) => state.role);
  const isUserAuth = isAuth ;
  const isAdminAuth = isAuth && !!admin ;
  const isSubAdminAuth = isAuth && !!sub_admin ;

  console.log('from indexauth:    ' + isAuth, user, sub_admin ,admin);
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
            // element: <SignupComp />
        },
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
            },
            {
                path:'add-review/:id',
                element: <AddReview />
            },
            {
                path:'/profile',
                element: <ProfilePage />
            }
          ],
        },
        {
          element: <PrivateRoutesAdmin isAdminAuth={isAdminAuth} />,
          children: [
            // Admin-specific routes 
            {
              path:'/admin',
              // element: <AdminDashboard />
              element: <AdminSubadminsListing />
            },
            {
              path:'/admin-users',
              element: <AdminDashboard />
            },
            // {
            //   path:'/admin-subadmins',
            //   element: <AdminSubadminsListing />
            // },
            {
              path:'/admin-createUser',
              element: <AdminAddUser />
            },
            {
              path:'admin-updateUser/:id',
              element: <AdminUpdateUser />
            },
            {
              path:'/admin-createSubAdmin',
              element: <AdminAddSubadmin />
            },
            {
              path:'admin-updateSubAdmin/:id',
              element: <AdminUpdateSubadmin />
            },
          ],
        },
        {
          element: <PrivateRoutesSubAdmin isSubAdminAuth={isSubAdminAuth} />,
          children: [
            // sub-admin-specific routes 
            {
              path:'/subadmin',
              element: <SubAdminDashboard />
            },
            {
              path:'/subadmin-reviews',
              element: <SubAdminReviewSection />
            },
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
