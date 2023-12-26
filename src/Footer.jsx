import React from "react";
import "./footer.css";
import { NavLink } from "react-router-dom";

const Footer = () => (
  <div className="gpt3__footer section__padding">
    <div className="gpt3__footer-heading">
      <h1 className="gradient__text">
        Do you want to step in to the future before others
      </h1>
    </div>

    <div className="gpt3__footer-btn">
      <NavLink to="/contact">
        <p>Request Early Access</p>
      </NavLink>
    </div>

    <div className="gpt3__footer-links">
      <div className="gpt3__footer-links_logo">
        <p>
          TeamOlap <br /> All Rights Reserved
        </p>
      </div>
      <div className="gpt3__footer-links_div">
        <h4>Links</h4>
        <p>Overons</p>
        <p>Social Media</p>
        <p>Counters</p>
        <p>Contact</p>
      </div>
      <div className="gpt3__footer-links_div">
        <h4>Company</h4>
        <p>Terms & Conditions </p>
        <p>Privacy Policy</p>
        <p>Contact</p>
      </div>
      <div className="gpt3__footer-links_div">
        <h4>Get in touch</h4>
        <p>AnalytiCube</p>
        <p>021-12345678</p>
        <p>TeamOlap@business.net</p>
      </div>
    </div>

    <div className="gpt3__footer-copyright">
      <p>@2023 TeamOlap. All rights reserved.</p>
    </div>
  </div>
);

export default Footer;
