import React, { useState } from "react";
import axios from "axios";

const UploadPhoto = ({ setPhotos }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags);
    formData.append("image", image);

    axios
      .post("http://localhost/backend-gallery/upload_photo.php", formData)
      .then((response) => {
        setPhotos((prevPhotos) => [
          ...prevPhotos,
          { title, description, tags, image_path: response.data.imagePath },
        ]);
        setTitle("");
        setDescription("");
        setTags("");
        setImage(null);
      })
      .catch((error) => console.error(error));
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
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button type="submit">Upload Photo</button>
    </form>
  );
};

export default UploadPhoto;
