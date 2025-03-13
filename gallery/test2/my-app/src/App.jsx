import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UploadPhoto from './components/frontend/UploadPhoto';
import PhotoGallery from './components/frontend/PhotoGallery';
import EditPhoto from './components/frontend/EditPhoto';


const App = () => {
    const [photos, setPhotos] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [photoToEdit, setPhotoToEdit] = useState(null);

    // Fetch all photos
    useEffect(() => {
        axios.get('http://localhost/backend-gallery/get_photos.php')
            .then(response => {
                setPhotos(response.data);
            })
            .catch(error => console.error(error));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost/backend-gallery/delete_photo.php`, {
            data: { id }
        })
        .then(() => {
            setPhotos(photos.filter(photo => photo.id !== id));
        })
        .catch(error => console.error(error));
    };

    const handleEdit = (photo) => {
        setIsEditing(true);
        setPhotoToEdit(photo);
    };

    return (
        <div>
            <h1>Photo Gallery</h1>
            {!isEditing ? (
                <div>
                    <UploadPhoto setPhotos={setPhotos} />
                    <PhotoGallery photos={photos} onDelete={handleDelete} onEdit={handleEdit} />
                </div>
            ) : (
                <EditPhoto photo={photoToEdit} setPhotos={setPhotos} setIsEditing={setIsEditing} />
            )}
        </div>
    );
};

export default App;
