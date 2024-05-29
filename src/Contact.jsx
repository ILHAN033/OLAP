import React, { useState, useRef } from "react";
import "./contact.css";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const form = useRef();
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
    emailjs
      .sendForm("service_cc1qxie", "template_d0ry255", form.current, {
        publicKey: "NRea4h6VrLBU6V8I0",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          toast.success("Message sent successfully!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
    setFormData({ email: "", subject: "", message: "" });
    // console.log("Form submitted:", formData);
  };

  return (
    <>
      <div className=" h-screen flex items-center bg-radial-gradient">
        <div className="contact-form-container">
          <h2>Contact Us</h2>
          <form ref={form} onSubmit={handleSubmit}>
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
