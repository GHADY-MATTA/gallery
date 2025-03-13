import React from 'react';

const PhotoGallery = ({ photos, onDelete, onEdit }) => {
  return (
    <div className="gallery">
      {photos.map((photo) => (
        <div key={photo.id} className="photo">
          <img src={photo.image_path} alt={photo.title} />
          <h3>{photo.title}</h3>
          <p>{photo.description}</p>
          <p>{photo.tags}</p>
          <button onClick={() => onEdit(photo)}>Edit</button>
          <button onClick={() => onDelete(photo.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default PhotoGallery;
