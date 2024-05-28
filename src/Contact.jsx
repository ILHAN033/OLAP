import React, { useState } from "react";
import "./contact.css";
import Nav from "./Nav";

const Contact = () => {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // logic here for finalizing at the end****
    console.log("Form submitted:", formData);
  };

  return (
    <>
      <div className=" h-screen flex items-center bg-radial-gradient">
        <div className="contact-form-container">
          <h2>Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="subject">Subject:</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />

            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit" className="text-white">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
