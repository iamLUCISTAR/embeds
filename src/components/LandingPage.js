import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <h1>Welcome to the Embedder</h1>
      <p>Embed PDFs or Images with ease. Click below to get started.</p>
      <div className="landing-buttons">
        <Link to="/embed-pdf">
          <button className="get-started-btn">Embed PDF</button>
        </Link>
        <Link to="/embed-image">
          <button className="get-started-btn">Embed Image</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
