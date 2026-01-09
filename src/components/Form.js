import React, { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    mobile: "",
  });

  const [error, setError] = useState({});

  const validate = (name, value) => {
    let error = "";

    if (name === "name") {
      if (!/^[a-zA-Z\s]+$/.test(value)) {
        error = "Name should contain only letters";
      }
    }

    if (name === "address") {
      if (/[^a-zA-Z0-9\s]/.test(value)) {
        error = "Address should not contain special characters";
      }
    }

    if (name === "email") {
      if (!value.includes("@") || !value.endsWith(".com")) {
        error = "Email should contain @ and .com";
      }
    }

    if (name === "mobile") {
      if (!/^\d{10}$/.test(value)) {
        error = "Mobile number must be 10 digits";
      }
    }

    return error;
  };

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const errorMessage = validate(name, value);

    setError((prev) => ({
      ...prev,
      [name]: errorMessage,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    let newError = {};
    let valid = true;

    Object.entries(formData).forEach(([key, value]) => {
      const errorMessage = validate(key, value);
      if (errorMessage) {
        newError[key] = errorMessage;
        valid = false;
      }
    });

    setError(newError);

    if (!valid) return;

    setFormData({
      name: "",
      address: "",
      email: "",
      mobile: "",
    });

    setError({});
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          name="name"
          onChange={handleChange}
        />
        {error.name && (
          <p className="errorMessage" style={{ color: "red" }}>
            {error.name}
          </p>
        )}

        <label>Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          placeholder="Address"
          onChange={handleChange}
        />
        {error.address && (
          <p className="errorMessage" style={{ color: "red" }}>
            {error.address}
          </p>
        )}

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email"
          onChange={handleChange}
        />
        {error.email && (
          <p className="errorMessage" style={{ color: "red" }}>
            {error.email}
          </p>
        )}

        <label>Mobile</label>
        <input
          type="tel"
          name="mobile"
          value={formData.mobile}
          placeholder="Mobile"
          onChange={handleChange}
        />
        {error.mobile && (
          <p className="errorMessage" style={{ color: "red" }}>
            {error.mobile}
          </p>
        )}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
