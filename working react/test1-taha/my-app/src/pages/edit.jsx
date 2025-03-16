import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditEmployee = () => {
  // State for manually entering the employee ID
  const [userId, setUserId] = useState('');
  // State for text fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    position: '',
    startDate: '',
    coverLetter: '',
    emergencyName: '',
    emergencyPhone: '',
  });
  // Separate state for file inputs (cannot be prepopulated)
  const [files, setFiles] = useState({
    resume: null,
    medicalReport: null,
    passport: null,
  });
  const [loading, setLoading] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);

  // Handle change for employee ID input
  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
    setDataFetched(false); // Reset dataFetched when the id changes
  };

  // Function to fetch employee data by the manually entered ID
  const fetchEmployeeData = () => {
    if (!userId) {
      alert("Please enter a valid Employee ID");
      return;
    }
    setLoading(true);
    axios
      .get(`http://localhost/edit.php?id=${userId}`)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
          setDataFetched(false);
        } else {
          const data = response.data;
          setFormData({
            firstName: data.first_name || '',
            lastName: data.last_name || '',
            email: data.email || '',
            phone: data.phone || '',
            dob: data.dob || '',
            position: data.position || '',
            startDate: data.start_date || '',
            coverLetter: data.cover_letter || '',
            emergencyName: data.emergency_name || '',
            emergencyPhone: data.emergency_phone || '',
          });
          setDataFetched(true);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching employee data:', error);
        setLoading(false);
      });
  };

  // Handle changes in text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle changes in file inputs
  const handleFileChange = (e) => {
    const { name, files: fileList } = e.target;
    setFiles(prev => ({
      ...prev,
      [name]: fileList[0],
    }));
  };

  // Handle form submission to update employee data
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userId) {
      alert("Employee ID is missing!");
      return;
    }
    // Prepare FormData to send both text fields and file uploads
    const dataToSend = new FormData();
    dataToSend.append('userId', userId);
    dataToSend.append('firstName', formData.firstName);
    dataToSend.append('lastName', formData.lastName);
    dataToSend.append('email', formData.email);
    dataToSend.append('phone', formData.phone);
    dataToSend.append('dob', formData.dob);
    dataToSend.append('position', formData.position);
    dataToSend.append('startDate', formData.startDate);
    dataToSend.append('coverLetter', formData.coverLetter);
    dataToSend.append('emergencyName', formData.emergencyName);
    dataToSend.append('emergencyPhone', formData.emergencyPhone);

    // Append new file uploads if selected (if not, backend will keep the old file paths)
    if (files.resume) {
      dataToSend.append('resume', files.resume);
    }
    if (files.medicalReport) {
      dataToSend.append('medicalReport', files.medicalReport);
    }
    if (files.passport) {
      dataToSend.append('passport', files.passport);
    }

    axios
      .post('http://localhost/edit.php', dataToSend)
      .then((response) => {
        console.log('Update response:', response.data);
        alert('Employee updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating employee:', error);
        alert('Error updating employee.');
      });
  };

  return (
    <div>
      <h2>Edit Employee</h2>
      {/* Input field to manually enter Employee ID */}
      <div>
        <label>Employee ID:</label>
        <input 
          type="text" 
          value={userId} 
          onChange={handleUserIdChange} 
          placeholder="Enter Employee ID" 
        />
        <button type="button" onClick={fetchEmployeeData}>Fetch Employee Data</button>
      </div>
      {loading && <p>Loading...</p>}
      {dataFetched && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>First Name:</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
          </div>
          <div>
            <label>Last Name:</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div>
            <label>Phone:</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
          </div>
          <div>
            <label>Date of Birth:</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
          </div>
          <div>
            <label>Position:</label>
            <input type="text" name="position" value={formData.position} onChange={handleChange} />
          </div>
          <div>
            <label>Start Date:</label>
            <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
          </div>
          <div>
            <label>Cover Letter:</label>
            <textarea name="coverLetter" value={formData.coverLetter} onChange={handleChange} />
          </div>
          <div>
            <label>Emergency Contact Name:</label>
            <input type="text" name="emergencyName" value={formData.emergencyName} onChange={handleChange} />
          </div>
          <div>
            <label>Emergency Contact Phone:</label>
            <input type="text" name="emergencyPhone" value={formData.emergencyPhone} onChange={handleChange} />
          </div>
          <div>
            <label>Upload New Resume (leave blank to keep existing):</label>
            <input type="file" name="resume" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
          </div>
          <div>
            <label>Upload New Medical Report (PDF, leave blank to keep existing):</label>
            <input type="file" name="medicalReport" accept=".pdf" onChange={handleFileChange} />
          </div>
          <div>
            <label>Upload New Passport (PDF, leave blank to keep existing):</label>
            <input type="file" name="passport" accept=".pdf" onChange={handleFileChange} />
          </div>
          <button type="submit">Update Employee</button>
        </form>
      )}
    </div>
  );
};

export default EditEmployee;
