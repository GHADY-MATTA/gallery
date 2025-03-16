import { useState } from "react";
import axios from "axios";

function UploadForm({ refreshGallery }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags);
    formData.append("file", file);

    await axios.post("http://localhost/backend/upload.php", formData);
    refreshGallery();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} required />
      <input type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
      <input type="text" placeholder="Tags (comma-separated)" onChange={(e) => setTags(e.target.value)} />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
      <button type="submit">Upload</button>
    </form>
  );
}

export default UploadForm;
