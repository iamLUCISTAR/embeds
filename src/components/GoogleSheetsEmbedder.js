import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GoogleSheetsEmbedder = () => {
  const navigate = useNavigate();
  const [sheetLink, setSheetLink] = useState("");
  const [embedUrl, setEmbedUrl] = useState("");
  const [error, setError] = useState("");

  const handleEmbed = () => {
    const fileId = extractGoogleSheetsId(sheetLink);
    if (fileId) {
      setEmbedUrl(`https://docs.google.com/spreadsheets/d/${fileId}/preview`);
      setError("");
    } else {
      setError("Invalid Google Sheets link. Please enter a valid link.");
    }
  };

  const extractGoogleSheetsId = (link) => {
    const regex = /\/d\/([a-zA-Z0-9-_]+)/;
    const match = link.match(regex);
    return match ? match[1] : null;
  };

  return (
    <div className="embed-container">
      <h1>Google Sheets Embedder</h1>
      <input
        type="text"
        placeholder="Enter Google Sheets link"
        value={sheetLink}
        onChange={(e) => setSheetLink(e.target.value)}
      />
      <button onClick={handleEmbed}>Embed Google Sheet</button>
      {error && <p className="error-message">{error}</p>}
      {embedUrl && (
        <div className="preview-section">
          <h3>Preview:</h3>
          <iframe
            src={embedUrl}
            width="100%"
            height="500px"
            title="Google Sheets Preview"
          />
        </div>
      )}
      <div className="actions">
        <button onClick={() => navigate("/")}>Back to Landing Page</button>
      </div>
    </div>
  );
};

export default GoogleSheetsEmbedder;