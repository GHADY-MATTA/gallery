import { useEffect, useState } from "react";
import axios from "axios";

function Gallery() {
  const [photos, setPhotos] = useState([]);

  const fetchPhotos = async () => {
    const response = await axios.get("http://localhost/backend/fetch.php");
    setPhotos(response.data);
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <div className="gallery">
      {photos.map((photo) => (
        <div key={photo.id}>
          <img src={`http://localhost/uploads/${photo.filename}`} alt={photo.title} />
          <h3>{photo.title}</h3>
          <p>{photo.description}</p>
          <button onClick={() => axios.get(`http://localhost/backend/delete.php?id=${photo.id}`).then(fetchPhotos)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Gallery;
