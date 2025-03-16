import { useState } from "react";

function SimpleForm() {
  const [formData, setFormData] = useState({
    username: "",
    lastName: "",
    text1: ""
  });

  const [submissions, setSubmissions] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmissions([...submissions, formData]);
    console.log(submissions);
  };

  return (
    <div>
      <h2>Simple Form</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
        <input type="text" name="text1" placeholder="Enter text" value={formData.text1} onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>

      <h3>Stored Data:</h3>
      <pre>{JSON.stringify(submissions, null, 2)}</pre>
    </div>
  );
}

export default SimpleForm;
