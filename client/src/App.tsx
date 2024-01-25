import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import AboutUs from "./components/AboutUs/AboutUs";
import ContactUs from "./components/ContactUs/ContactUs";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import AuthProvider from "./contexts/AuthContext";
import Logout from "./components/Logout/Logout";

function App() {
  
  return (
    <>
      <AuthProvider>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/about-us" element={<AboutUs />}/>
        <Route path="/contact-us" element={<ContactUs />}/>
        <Route path="/users/login" element={<Login />} />
        <Route path="/users/register" element={<Register />} />
        <Route path="/users/logout" element={<Logout />} />
       </Routes>
      <Footer />
      </AuthProvider>
    </>
  )
}

export default App
