import React, { useState, useRef } from 'react';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageLink, setImageLink] = useState(null);
  const [validationError, setValidationError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if(file) {
      const allowedExtension = ['.jpg', '.png'];
      const selectedFileExtension = file.name.split('.').pop().toLowerCase();
      if(allowedExtension.includes('.' + selectedFileExtension)) {
        setSelectedFile(file);
        setValidationError(null);
      } else {
        setSelectedFile(null);
        setValidationError('Invalid file extension. Please select a file with .jpg or .png extension.');
        fileInputRef.current.value = '';
      }
    }
  };

  const handleUpload = async() => {
    if(selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      const response = await fetch('http://localhost/backend-gallery/upload.php', {
        method: 'POST',
        body: formData
      });
      const responseData = await response.json();

      if(responseData.image_link) {
        setImageLink(responseData.image_link);
        setValidationError(null);  // Clear any validation error
      } else {
        setValidationError('File upload failed. Please try again.');
      }

      fileInputRef.current.value = '';  // Reset file input
    } else {
      setValidationError('Please select a file before uploading.');
    }
  };

  return (
    <div className="container">
      <h1 className="mt-5 mb-5 text-center"><b>Upload File in React.js</b></h1>
      <div className="card">
        <div className="card-header">Upload File in React.js</div>
        <div className="card-body">
          <div className="row">
            <div className="col col-2"><b>Select File</b></div>
            <div className="col col-3">
              <input type="file" ref={fileInputRef} onChange={handleFileChange} />
            </div>
            <div className="col col-3">
              <button className="btn btn-primary" onClick={handleUpload}>Upload</button>
            </div>
          </div>
          <div className="row">
            <div className="col col-2">&nbsp;</div>
            <div className="col col-3">
              {validationError && <p className="text-danger">{validationError}</p>}
              {imageLink && (
                <div>
                  <p><b>Uploaded Image: </b></p>
                  <img src={imageLink} className="img-fluid img-thumbnail" alt="Uploaded" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
