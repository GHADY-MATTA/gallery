import React, { useState } from 'react';
import axios from 'axios';

const UploadImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [message, setMessage] = useState('');  // State to hold success/error message
  const [loading, setLoading] = useState(false); // State to manage loading spinner
  
  // Function to handle image selection
  const handleFileChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure a file has been selected
    if (!selectedImage) {
      setMessage("Please select an image first.");
      return;
    }

    // Create FormData to send the file
    const formData = new FormData();
    formData.append("photo", selectedImage);

    try {
      setLoading(true); // Start loading
      setMessage("Uploading image..."); // Display loading message

      // Send the file to the PHP backend via Axios POST request
      const response = await axios.post("http://localhost/backend/uplPic.php", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Check the response from the server
      if (response.status === 200) {
        setMessage("Image uploaded successfully!");
      } else {
        setMessage("Failed to upload image, try again.");
      }

    } catch (error) {
      console.error("Error uploading image:", error);
      setMessage("Error connecting to the server. Please check the backend.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div>
      <h1>Upload Image</h1>
      
      {/* Form for file upload */}
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="photo"
          accept="image/*"
          onChange={handleFileChange}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>

      {/* Display message after submitting the form */}
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadImage;
