
import React, { useState } from "react";
import './../styles/App.css';

function App() {
  const [data, setData] = useState({ name: '', address: '', email: '', mobile: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!/^[A-Za-z]+$/.test(data.name)) newErrors.name = 'Name should contain only letters';
    if (!/^[A-Za-z0-9\s]+$/.test(data.address)) newErrors.address = 'Address should not contain special characters';
    if (!/^.+@.+\.com$/.test(data.email)) newErrors.email = 'Email should contain @ and .com';
    if (!/^\d{1,10}$/.test(data.mobile)) newErrors.mobile = 'Mobile number should not be more than 10 characters';

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) alert('Form submitted!');
  };

  return (
    <form onSubmit={handleSubmit}>
      {['name', 'address', 'email', 'mobile'].map((field) => (
        <div key={field}>
          <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
          <input name={field} value={data[field]} onChange={handleChange} />
          {errors[field] && <div className="errorMessage">{errors[field]}</div>}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}

export default App;