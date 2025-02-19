import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GoogleDocumentEmbedder = () => {
  const navigate = useNavigate();
  const [fileUrl, setFileUrl] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    const inputUrl = event.target.value;
    const docId = extractGoogleDocsId(inputUrl);

    if (docId) {
      const embedUrl = `https://docs.google.com/document/d/${docId}/preview`;
      setFileUrl(embedUrl);
      setError("");
    } else {
      setError("Invalid Google Docs link. Please provide a valid shareable link.");
    }
  };

  const extractGoogleDocsId = (url) => {
    const match = url.match(/\/document\/d\/([-\w]+)/);
    return match ? match[1] : null;
  };

  return (
    <div className="App">
      <h1>Embed Google Docs Document</h1>

      <div className="input-container">
        <h3>Enter Google Docs Link:</h3>
        <input
          type="text"
          placeholder="Paste Google Docs link here..."
          onChange={handleInputChange}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        {error && <p className="error-message">{error}</p>}
      </div>

      {fileUrl && (
        <div className="preview-section">
          <h3>Document Preview:</h3>
          <iframe
            src={fileUrl}
            width="100%"
            height="800px"
            title="Google Docs Preview"
            style={{ border: "1px solid #ccc", borderRadius: "10px" }}
          />
        </div>
      )}

      <div className="actions">
        <button onClick={() => navigate("/")}>Back to Landing Page</button>
      </div>
    </div>
  );
};

export default GoogleDocumentEmbedder;
