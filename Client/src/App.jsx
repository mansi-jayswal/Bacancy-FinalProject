import { RouterProvider } from "react-router-dom";
import { useState, useEffect, Suspense } from "react";
import "./App.css";
import Loader from "./components/common/Loader";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IndexRoute from "./routes/IndexRoute";

function App() {
  const [loading, setLoading] = useState(true);
  const router = IndexRoute();

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1000); // Simulating 2 seconds loading time
  // }, []);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <ToastContainer
          autoClose={2000}
          closeOnClick
          pauseOnFocusLoss={false}
          pauseOnHover
          transition={Bounce}
        />
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}

export default App;
