import Profile from "./pages/Profile.jsx";
import Home from "./pages/Home.jsx";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Products from "./pages/Products.jsx";
import Counter from "./pages/Counter.jsx";
import SignupForm from "./pages/SignUp.jsx";
import "./App.css";
import SignupForm2 from "./pages/Employe_signup.jsx";
import EditEmployee from "./pages/edit.jsx";

const App = () => {
  return (
    <BrowserRouter>
      {/* Navbar or links */}
      <nav className="container" >
        <Link to="/home">Home</Link> | 
        <Link to="/profile">Profile</Link> | 
        <Link to="/products">Products</Link> | 
        <Link to="/counter">Counter</Link> | 
        <Link to="/edit">edit</Link> |
        <Link to="/employe_signup">Go to employe_signup</Link> Corrected Link placement
      </nav>

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products" element={<Products />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/edit" element={<EditEmployee />} />
        <Route path="/employe_signup" element={<SignupForm2 />} />
        <Route path="/signup" element={<SignupForm />} /> {/* Ensure SignUp route is defined */}
        <Route path="/*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
