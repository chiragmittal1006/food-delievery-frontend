import './App.css';
import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"
import Home from "./Pages/Home/Home"
import Cart from "./Pages/Cart/Cart"
import PlaceOrder from "./Pages/PlaceOrder/PlaceOrder"
import Dashboard from "./components/Dashboard/Dashboard"
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import { useState,useEffect } from 'react';
import LoginSignUp from './components/LoginSignUp/LoginSignUp';
import AdminSection from './AdminSection/AdminSection';
import Loader from './components/Loader/Loader';

function App() {

  const [loginpopup, setloginpopup] = useState(false)

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); // Extend the preloader duration

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loader /> // Use the Loader component here
      ) : (
        <Router>
          {loginpopup && <LoginSignUp setloginpopup={setloginpopup} />}
          <Navbar setloginpopup={setloginpopup} />

          <Routes>
            {localStorage.getItem("isAdmin") === "true" ? (
              <>
                <Route exact path='/' element={<Dashboard />} />
                <Route exact path='/cart' element={<Dashboard />} />
                <Route exact path='/order' element={<Dashboard />} />
                <Route exact path='/products' element={<AdminSection />} />
              </>
            ) : (
              <>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/cart' element={<Cart />} />
                <Route exact path='/order' element={<PlaceOrder />} />
              </>
            )}
          </Routes>
          <Footer />
        </Router>
      )}
    </>
  );
}

export default App;
