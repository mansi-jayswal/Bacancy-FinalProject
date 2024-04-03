import React from 'react'
import { BrowserRouter , Routes , Route} from 'react-router-dom'
import Home from '../components/pages/home/Home'
import LoginPage from '../components/pages/auth/LoginPage'
import SignupPage from '../components/pages/auth/SignupPage'
import RecipeListing from '../components/pages/recipe/RecipeListing'
import RecipeDetails from '../components/pages/recipe/RecipeDetails'

function Index() {
  return (
    <>
    
        {/* <BrowserRouter > */}
        <Routes>
            <Route path='/' exact element={<Home />}></Route>
            <Route path='/login' exact element={<LoginPage /> }></Route>
            <Route path='/signup' exact element={<SignupPage />}></Route>
            <Route path='/recipes' exact element={<RecipeListing />}></Route>
            <Route path="/recipes/:id" element={<RecipeDetails />} /> {/* Dynamic route with recipe ID */}

        </Routes>
        {/* </BrowserRouter> */}
   
    </>
  )
}

export default Index
