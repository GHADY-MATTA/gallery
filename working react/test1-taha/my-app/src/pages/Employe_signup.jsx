import { useState } from "react";
import { Link } from "react-router-dom";
// import "../App.css";
import axios from 'axios';

const SignupForm2 = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    position: "",
    startDate: "",
    resume: null,
    coverLetter: "",
    medicalReport: null,
    passport: null,
    emergencyName: "",
    emergencyPhone: ""
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  console.log("User Signed Up:", formData);

  // Create a new FormData object for submission
  const formDataToSend = new FormData();

  // Append text fields
  formDataToSend.append('firstName', formData.firstName);
  formDataToSend.append('lastName', formData.lastName);
  formDataToSend.append('email', formData.email);
  formDataToSend.append('phone', formData.phone);
  formDataToSend.append('dob', formData.dob);
  formDataToSend.append('position', formData.position);
  formDataToSend.append('startDate', formData.startDate);
  formDataToSend.append('coverLetter', formData.coverLetter);
  formDataToSend.append('emergencyName', formData.emergencyName);
  formDataToSend.append('emergencyPhone', formData.emergencyPhone);

  // Append files
  formDataToSend.append('resume', formData.resume);
  formDataToSend.append('medicalReport', formData.medicalReport);
  formDataToSend.append('passport', formData.passport);

  // Send data via axios to the back-end
  axios
    .post('http://localhost/store.php', formDataToSend)
    .then((response) => {
      console.log('Data successfully submitted:', response.data);
    })
    .catch((error) => {
      console.error('There was an error!', error);
    });
};


  return (
    <div className="container">
      <h1>New Employee Onboarding Form</h1>
      <form className="form-container center" onSubmit={handleSubmit}>
        {/* Personal Information Section */}
        <fieldset>
          <legend>Personal Information</legend>
          <label htmlFor="firstName">First Name *</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            onChange={handleChange}
          />

          <label htmlFor="lastName">Last Name *</label>
          <input className=" center"
            type="text"
            id="lastName"
            name="lastName"
            required
            onChange={handleChange}
          />

          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={handleChange}
          />

          <label htmlFor="phone">Phone Number *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            onChange={handleChange}
          />

          <label htmlFor="dob">Date of Birth *</label>
          <input
            type="date"
            id="dob"
            name="dob"
            required
            onChange={handleChange}
          />
        </fieldset>

        {/* Job Details Section */}
        <fieldset>
          <legend>Job Details</legend>
          <label htmlFor="position">Position Applied For *</label>
          <input
            type="text"
            id="position"
            name="position"
            required
            onChange={handleChange}
          />

          <label htmlFor="startDate">Preferred Start Date *</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            required
            onChange={handleChange}
          />
        </fieldset>

        {/* Documents Section */}
        <fieldset>
          <legend>Documents</legend>
          <label htmlFor="resume">Upload Resume/CV *</label>
          <input
            type="file"
            id="resume"
            name="resume"
            accept=".pdf,.doc,.docx"
            required
            onChange={handleChange}
          />

          <label htmlFor="coverLetter">Cover Letter</label>
          <textarea
            id="coverLetter"
            name="coverLetter"
            rows="5"
            placeholder="Optional cover letter..."
            onChange={handleChange}
          ></textarea>
        </fieldset>

        {/* Medical and Passport Upload Section */}
        <fieldset>
          <legend>Medical and Passport Submission</legend>
          <label htmlFor="medicalReport">
            Upload Medical Report (PDF) *
          </label>
          <input
            type="file"
            id="medicalReport"
            name="medicalReport"
            accept=".pdf"
            required
            onChange={handleChange}
          />

          <label htmlFor="passport">Upload Passport Copy (PDF) *</label>
          <input
            type="file"
            id="passport"
            name="passport"
            accept=".pdf"
            required
            onChange={handleChange}
          />
        </fieldset>

        {/* Emergency Contact Section */}
        <fieldset>
          <legend>Emergency Contact</legend>
          <label htmlFor="emergencyName">Contact Name *</label>
          <input
            type="text"
            id="emergencyName"
            name="emergencyName"
            required
            onChange={handleChange}
          />

          <label htmlFor="emergencyPhone">Phone Number *</label>
          <input
            type="tel"
            id="emergencyPhone"
            name="emergencyPhone"
            required
            onChange={handleChange}
          />
        </fieldset>

        <button type="submit">Submit Application</button>
        {/* 
          Optionally, if you want a separate submit for medical/passport,
          you can include another button with a different formAction
          and manage its behavior in handleSubmit.
        */}
      </form>
    </div>
  );
};

export default SignupForm2;
