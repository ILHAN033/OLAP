import React from "react";
import "./header.css";
import header_cube from "./assets/header_cube.png";

const Header = () => {
  return (
    <div className="olap_header section_padding id=home">
      <div className="olap_header-content">
        <h1 className="gradient_text">
          Unleash the power of data with AnalytiCube
        </h1>
        <p>
          AnalytiCube is an innovative online analytical processing (OLAP)
          system designed to revolutionize the way businesses interact with and
          derive insights from their data. With cutting-edge technology and
          intuitive features, AnalytiCube transforms raw data into meaningful
          and actionable intelligence. Dive deep into your data, explore trends,
          and make informed decisions with ease. Experience the next level of
          analytics with AnalytiCube, where the power of data meets the
          simplicity of use.
        </p>
        <div className="olap_header-content_input">
          <input type="email" placeholder="Your Email Address" />
          <button>Get Started</button>
        </div>

        <div className="olap_header-image">
          <img src={header_cube} alt="header_cube" />
        </div>
      </div>
    </div>
  );
};

export default Header;
