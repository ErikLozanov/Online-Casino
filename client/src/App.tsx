import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import AboutUs from "./components/AboutUs/AboutUs";

function App() {
  
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/about-us" element={<AboutUs />}/>
       </Routes>
      <Footer />
    </>
  )
}

export default App
