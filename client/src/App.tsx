import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import AboutUs from "./components/AboutUs/AboutUs";
import ContactUs from "./components/ContactUs/ContactUs";

function App() {
  
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/about-us" element={<AboutUs />}/>
        <Route path="/contact-us" element={<ContactUs />}/>
       </Routes>
      <Footer />
    </>
  )
}

export default App
