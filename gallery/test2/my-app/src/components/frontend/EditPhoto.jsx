import React, { useState } from 'react';
import axios from 'axios';

const EditPhoto = ({ photo, setPhotos, setIsEditing }) => {
    const [title, setTitle] = useState(photo.title);
    const [description, setDescription] = useState(photo.description);
    const [tags, setTags] = useState(photo.tags);
    const [image, setImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('id', photo.id);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('tags', tags);
        if (image) {
            formData.append('image', image);
        }

        axios.put('http://localhost/backend-gallery/update_photo.php', formData)
            .then(() => {
                setPhotos(prevPhotos =>
                    prevPhotos.map(p =>
                        p.id === photo.id ? { ...p, title, description, tags, image_path: image ? image.name : p.image_path } : p
                    )
                );
                setIsEditing(false);
            })
            .catch(error => console.error(error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="text"
                placeholder="Tags (comma separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
            />
            <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
            />
            <button type="submit">Update Photo</button>
        </form>
    );
};

export default EditPhoto;
