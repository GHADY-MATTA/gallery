import { useState } from "react";
import axios from "axios";
import PhotoGallery from "./PhotoGallery";

const UserForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    lastName: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setFormData((prev) => ({ ...prev, image: base64 }));
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(formData);
      
    try {
      const response = await axios.post("http://localhost/storephoto.php", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("User data submitted:", response.data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
    };
    

  return (
    <div className="container" >
      <h2 className="h-tag" >User Information Form</h2>
          <form className="box" onSubmit={handleSubmit}>
              <p className="small-text center p-tag" >user name:</p>
              <input className="input-btn" type="text" name="username" placeholder="Username" required onChange={handleChange} />
              <p className="small-text center p-tag" >last name:</p>
              <input className="input-btn" type="text" name="lastName" placeholder="Last Name" required onChange={handleChange} />
              <p className="small-text center p-tag" >insert-img :</p>
        <input className="input-btn" type="file" accept="image/*" required onChange={handleImageUpload} />
        <button type="submit">Submit</button>
          </form>
          <div className="box-white"><PhotoGallery/></div>
      </div>
      
  );
};

export default UserForm;
