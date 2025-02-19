import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <h1>Welcome to the Embedder</h1>
      <p>Embed PDFs, Images, or Google Sheets with ease. Click below to get started.</p>
      <div className="landing-buttons">
        <Link to="/embed-pdf">
          <button className="get-started-btn">Embed PDF</button>
        </Link>
        <Link to="/embed-image">
          <button className="get-started-btn">Embed Image</button>
        </Link>
        <Link to="/embed-google-sheet">
          <button className="get-started-btn">Embed Google Sheet</button>
        </Link>
        <Link to="/embed-google-doc">
            <button className="get-started-btn">Embed Google Docs</button>
        </Link>
        {/* <Link to="/embed-word-doc">
            <button className="get-started-btn">Embed Word Doc</button>
        </Link> */}
      </div>
    </div>
  );
};

export default LandingPage;