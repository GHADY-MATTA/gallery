import React, { useState } from 'react';
import axios from 'axios';

const UploadImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedImage || !title) {
      setMessage('Please provide an image and a title.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedImage); // Changed 'photo' to 'file'
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tags', tags);

    console.log('FormData Entries:', [...formData.entries()]); // Debugging output

    try {
      setLoading(true);
      setMessage('Uploading image...');

      const response = await axios.post('http://localhost/backend/upload.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Response:', response);

      if (response.data.success) {
        setMessage('Image uploaded successfully!');
      } else {
        setMessage(response.data.message || 'Failed to upload image, try again.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setMessage('Error connecting to the server. Please check the backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Upload Image</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        <input type="text" placeholder="Tags (comma separated)" value={tags} onChange={(e) => setTags(e.target.value)} />
        <input type="file" name="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit" disabled={loading}>{loading ? 'Uploading...' : 'Upload'}</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadImage;
