import React, { useState } from 'react';


const Form = () => {
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        email: "",
        mobile: "",
    })
    const [error, setError] = useState({});
    function handleChange(e) {
        const { name, value } = e.target
        setFormData(newFormData =>( {
            ...newFormData,
            [name]: value
        })
        )
      
    }
    const validate = (name, value) => { 
        let error = ""
        if (name == "name") {
            if (!/^[a-zA-z\s]+$/.test(value)) {
                error ="Name should contain only letters"
            }
        }
        if (name == "address") {
            if(/[^a-zA-z0-9\s]/.test(value)) {
                error = "Address should not contain special characters"
            }
        }
        if (name == "email") {
            if(!value.includes("@")|| !value.endsWith(".com")) {
                error = "Email should contain @ and .com"
            }
        }
        if (name == "mobile") {
            if (value.length != 10) {
                error ="Mobile number should not be more than 10 characters"
            }
        }
        return error;

    }
    function handleSubmit(e) {
        e.preventDefault();

        let valid = true;
        let newError = {};

        Object.entries(formData).forEach(([key, value]) => {
            const error = validate(key, value);
            if (error) {
                newError[key] = error;
                valid = false;
            }
        });

        setError(newError);

        if (!valid) return;

        setFormData({
            name: "",
            address: "",
            email: "",
            mobile: ""
        });
    }


    return (
        <div>
            <form
            onSubmit={handleSubmit}
            >
                <label>Name</label>
                <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    name="name"
                    onChange={handleChange}

                />
                {error.name && <p className='errorMessage' style={{color: "red"}}>{error.name}</p>}
                <label>Address</label>
                <input
                    type="text"
                    name='address'
                    value={formData.address}
                    placeholder='Address'
                    onChange= { handleChange }
                />
                {error.address && <p className='errorMessage' style={{color: "red"}}>{error.address}</p>}
                <label>Email</label>
                <input
                    type="email"
                    name='email'
                    value={formData.email}
                    placeholder='Email'
                    onChange= { handleChange }
                />
                {error.email && <p className='errorMessage' style={{color: "red"}}>{error.email}</p>}
                <label>Mobile</label>
                <input
                type='tel'
                    name='mobile'
                    value={formData.mobile}
                    placeholder='Mobile'
                    onChange={ handleChange }
                />
                {error.mobile && <p className='errorMessage' style={{color: "red"}}>{error.mobile}</p>}
                <button type="submit">Submit</button>
           </form>
        </div>
    )
}
export default Form;