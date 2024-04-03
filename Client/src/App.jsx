import { useState , useEffect } from 'react'
import './App.css'
import Footer from './components/layout/footer/Footer'
import Navbar from './components/layout/navbar/Navbar'
import Loader from './components/common/Loader';
import Index from './routes/Index';

function App() {
  const [loading , setLoading]=useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulating 2 seconds loading time
  }, []);

  return (

    <>
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
