import React, { useEffect, useState } from "react";
import axios from "axios";

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Adjust the URL to match where your PHP file is hosted
    axios
      .get("http://localhost/fetchphotos.php")
      .then((response) => {
        setPhotos(response.data);
      })
      .catch((err) => {
        setError("Error fetching photos: " + err.message);
      });
  }, []);

  return (
    <div className="">
      <h2 className="h-tag">Photo Gallery</h2>
      {error && <p>{error}</p>}
      <div className="photo-grid ">
        {photos.length > 0 ? (
          photos.map((photo) => (
            <div key={photo.id} className="photo-item">
              <img className="box"
                src={`http://localhost/${photo.photo}`}
                alt={`${photo.username} ${photo.lastname}`}
              />
              <p className="p-tag"> tag:
                {photo.username} {photo.lastname}
              </p>
            </div>
          ))
        ) : (
          <p>No photos available.</p>
        )}
      </div>
    </div>
  );
};

export default PhotoGallery;
