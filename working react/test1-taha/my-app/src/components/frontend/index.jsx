<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Photo Gallery</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    /* Minimal styling for clarity */
    body { font-family: Arial, sans-serif; padding: 20px; }
    form { margin-bottom: 20px; }
    input, button { margin: 5px 0; }
    .gallery-item {
      display: inline-block;
      border: 1px solid #ddd;
      padding: 10px;
      margin: 10px;
      vertical-align: top;
      width: 220px;
    }
    .gallery-item img {
      max-width: 200px;
      height: auto;
      display: block;
      margin-bottom: 10px;
    }
  </style>
  <!-- React and Babel CDNs -->
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    // UploadForm component: handles uploading new photos
    function UploadForm({ onUploadComplete }) {
      const [title, setTitle] = React.useState("");
      const [description, setDescription] = React.useState("");
      const [tags, setTags] = React.useState("");
      const [file, setFile] = React.useState(null);
      
      const handleFileChange = (e) => {
        setFile(e.target.files[0]);
      };
      
      const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page refresh
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("tags", tags);
        formData.append("file", file);
        
        try {
          const response = await fetch("http://localhost/backend/upload.php", {
            method: "POST",
            body: formData,
          });
          const data = await response.json();
          console.log("Upload response:", data);
          // Clear form fields after successful upload
          setTitle("");
          setDescription("");
          setTags("");
          setFile(null);
          // Notify parent component to refresh the gallery
          onUploadComplete();
        } catch (error) {
          console.error("Error uploading photo:", error);
        }
      };
      
      return (
        <form onSubmit={handleSubmit}>
          <h2>Upload Photo</h2>
          <input 
            type="text" 
            placeholder="Title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          /><br/>
          <input 
            type="text" 
            placeholder="Description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          /><br/>
          <input 
            type="text" 
            placeholder="Tags (comma-separated)" 
            value={tags} 
            onChange={(e) => setTags(e.target.value)} 
          /><br/>
          <input 
            type="file" 
            onChange={handleFileChange} 
            required 
          /><br/>
          <button type="submit">Upload</button>
        </form>
      );
    }
    
    // Gallery component: displays all photos
    function Gallery({ photos, onDelete, onEdit }) {
      return (
        <div>
          <h2>Gallery</h2>
          {photos.length === 0 ? (
            <p>No photos available.</p>
          ) : (
            photos.map((photo) => (
              <div className="gallery-item" key={photo.id}>
                <img src={`http://localhost/uploads/${photo.filename}`} alt={photo.title} />
                <h3>{photo.title}</h3>
                <p>{photo.description}</p>
                <p>Tags: {photo.tags}</p>
                <button onClick={() => onEdit(photo)}>Edit</button>
                <button onClick={() => onDelete(photo.id)}>Delete</button>
              </div>
            ))
          )}
        </div>
      );
    }
    
    // EditPhoto component: allows editing of a photo's metadata
    function EditPhoto({ photo, onCancel, onUpdate }) {
      const [title, setTitle] = React.useState(photo.title);
      const [description, setDescription] = React.useState(photo.description);
      const [tags, setTags] = React.useState(photo.tags);
      
      const handleSubmit = async (e) => {
        e.preventDefault();
        const updateData = { id: photo.id, title, description, tags };
        try {
          const response = await fetch("http://localhost/backend/update.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updateData),
          });
          const data = await response.json();
          console.log("Update response:", data);
          onUpdate();
        } catch (error) {
          console.error("Error updating photo:", error);
        }
      };
      
      return (
        <form onSubmit={handleSubmit}>
          <h2>Edit Photo</h2>
          <input 
            type="text" 
            placeholder="Title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          /><br/>
          <input 
            type="text" 
            placeholder="Description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          /><br/>
          <input 
            type="text" 
            placeholder="Tags" 
            value={tags} 
            onChange={(e) => setTags(e.target.value)} 
          /><br/>
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </form>
      );
    }
    
    // Main App component: combines upload, gallery, and edit functionality
    function App() {
      const [photos, setPhotos] = React.useState([]);
      const [editingPhoto, setEditingPhoto] = React.useState(null);
      
      // Fetch photos from backend
      const fetchPhotos = async () => {
        try {
          const response = await fetch("http://localhost/backend/fetch.php");
          const data = await response.json();
          setPhotos(data);
        } catch (error) {
          console.error("Error fetching photos:", error);
        }
      };
      
      // Load photos on component mount
      React.useEffect(() => {
        fetchPhotos();
      }, []);
      
      // Handle deletion of a photo
      const handleDelete = async (id) => {
        try {
          const response = await fetch(`http://localhost/backend/delete.php?id=${id}`, {
            method: "DELETE",
          });
          const data = await response.json();
          console.log("Delete response:", data);
          fetchPhotos();
        } catch (error) {
          console.error("Error deleting photo:", error);
        }
      };
      
      // Handle edit button click
      const handleEdit = (photo) => {
        setEditingPhoto(photo);
      };
      
      // Cancel editing
      const cancelEdit = () => {
        setEditingPhoto(null);
      };
      
      // After update, refresh gallery and clear editing state
      const handleUpdate = () => {
        setEditingPhoto(null);
        fetchPhotos();
      };
      
      return (
        <div>
          <h1>Photo Gallery</h1>
          {/* Upload form */}
          <UploadForm onUploadComplete={fetchPhotos} />
          <hr />
          {/* Gallery view */}
          <Gallery photos={photos} onDelete={handleDelete} onEdit={handleEdit} />
          
          {/* Edit form if editing a photo */}
          {editingPhoto && (
            <EditPhoto 
              photo={editingPhoto} 
              onCancel={cancelEdit} 
              onUpdate={handleUpdate} 
            />
          )}
        </div>
      );
    }
    
    // Render the App component into the DOM
    ReactDOM.createRoot(document.getElementById("root")).render(<App />);
  </script>
</body>
</html>
