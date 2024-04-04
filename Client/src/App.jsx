import { useState , useEffect } from 'react'
import './App.css'
import Footer from './components/layout/footer/Footer'
import Navbar from './components/layout/navbar/Navbar'
import Loader from './components/common/Loader';
import Index from './routes/Index';
import {Bounce , ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [loading , setLoading]=useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulating 2 seconds loading time
  }, []);

  return (

    <>
    <ToastContainer  autoClose={2000} closeOnClick pauseOnFocusLoss={false} pauseOnHover transition={Bounce} />

    {
      loading ? <Loader /> :
       <>
       <div className='min-h-screen'>
      <Navbar />
        <Index />
      <Footer />
      </div>
      </>
    }
    
    </>
  )
}

export default App
