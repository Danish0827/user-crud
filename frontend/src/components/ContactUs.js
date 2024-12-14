import React, { useState } from "react";
import Swal from "sweetalert2";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      formErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      formErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.message.trim()) {
      formErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);
    
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-lg mt-10 shadow-xl">
      <h1 className="text-4xl font-extrabold text-center text-white mb-8 drop-shadow-md">
        Contact Us
      </h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="form-group">
          <label htmlFor="name" className="block text-lg font-semibold text-white mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-4 text-lg text-gray-900 bg-white rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ease-in-out duration-200 ${
              errors.name ? "border-2 border-red-500" : "border-2 border-gray-300"
            }`}
          />
          {errors.name && <p className="text-sm text-red-500 mt-2">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email" className="block text-lg font-semibold text-white mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-4 text-lg text-gray-900 bg-white rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ease-in-out duration-200 ${
              errors.email ? "border-2 border-red-500" : "border-2 border-gray-300"
            }`}
          />
          {errors.email && <p className="text-sm text-red-500 mt-2">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="phone" className="block text-lg font-semibold text-white mb-2">
            Phone (Optional)
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-4 text-lg text-gray-900 bg-white rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ease-in-out duration-200"
          />
        </div>

        <div className="form-group">
          <label htmlFor="message" className="block text-lg font-semibold text-white mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={`w-full p-4 text-lg text-gray-900 bg-white rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ease-in-out duration-200 ${
              errors.message ? "border-2 border-red-500" : "border-2 border-gray-300"
            }`}
          />
          {errors.message && <p className="text-sm text-red-500 mt-2">{errors.message}</p>}
        </div>

        <div className="form-group">
          <button
            type="submit"
            className="w-full py-4 text-lg font-semibold text-white bg-indigo-600 rounded-lg shadow-lg transition-all ease-in-out duration-300 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;
