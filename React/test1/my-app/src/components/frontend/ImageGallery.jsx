import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch images when the component mounts
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('http://localhost/backend/getImages.php');
        console.log('Response Data:', response.data);

        if (response.data.images) {
          setImages(response.data.images);
        } else {
          setError('No images found.');
        }
      } catch (err) {
        console.error('Error fetching images:', err);
        setError('Failed to fetch images.');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Function to handle deletion
  const handleDeleteFromState = async (id) => {
    console.log("Deleting Image - ID:", id);
    try {
      const response = await axios.post('http://localhost/backend/deleteImage.php', { id });
      console.log('Delete response:', response.data);

      if (response.data.message === "Image deleted successfully") {
        // Remove the image from the state after successful deletion
        setImages(prevImages => prevImages.filter(img => img.id !== id));
      } else {
        setError('Failed to delete image.');
      }
    } catch (err) {
      console.error('Error deleting image:', err);
      setError('Error deleting image.');
    }
  };

  return (
    <div>
      <h1>Image Gallery</h1>
      {loading && <p>Loading images...</p>}
      {error && <p>{error}</p>}
      <div className="gallery">
        {images.length > 0 ? (
          images.map((image, index) => (
            <div key={index} className="box">
              <img className="img-fetch" src={image.photo} alt={`Image ${index + 1}`} />
              <button
  onClick={() => {
    console.log("Button clicked!"); // Debugging log
    handleDeleteFromState(image.id);
  }}
  className="delete-button"
  style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px', cursor: 'pointer' }}
>
  Delete
</button>
            </div>
          ))
        ) : (
          <p>No images available.</p>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
