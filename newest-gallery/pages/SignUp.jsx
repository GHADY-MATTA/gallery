import { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css"; // This goes up one level from /pages to /src and imports App.css


const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Signed Up:", formData);
  };

    return (
      <div className="container " >
    <form onSubmit={handleSubmit} className="box center">
      <input type="text" name="username" placeholder="Username" onChange={handleChange} className="input-btn"/>
      <input type="email" name="email" placeholder="Email" onChange={handleChange} className="input-btn"/>
      <input type="password" name="password" placeholder="Password" onChange={handleChange} className="input-btn"/>
      <button type="submit" className="back-btn">Sign Up</button>
            </form>
            </div>
  );
};

export default SignupForm;
