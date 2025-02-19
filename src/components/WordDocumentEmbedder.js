import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const WordDocumentEmbedder = () => {
  const navigate = useNavigate();
  const [fileUrl, setFileUrl] = useState("");
  const [embedUrl, setEmbedUrl] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    const inputUrl = event.target.value;
    setFileUrl(inputUrl);

    // Extract the document ID or use the correct format
    const previewUrl = generateEmbedUrl(inputUrl);
    if (previewUrl) {
      setEmbedUrl(previewUrl);
      setError("");
    } else {
      setError("Invalid Microsoft Word document link.");
    }
  };

  const generateEmbedUrl = (url) => {
    if (url.includes("onedrive.live.com") || url.includes("sharepoint.com")) {
      // Convert the OneDrive/SharePoint link into an embeddable URL
      return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`;
    }
    return null;
  };

  return (
    <div className="App">
      <h1>Embed Online Word Document</h1>

      <div className="input-container">
        <h3>Enter OneDrive/SharePoint Word Document Link:</h3>
        <input
          type="text"
          placeholder="Paste document link here..."
          value={fileUrl}
          onChange={handleInputChange}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        {error && <p className="error-message">{error}</p>}
      </div>

      {embedUrl && (
        <div className="preview-section">
          <h3>Document Preview:</h3>
          <iframe
            src={embedUrl}
            width="100%"
            height="800px"
            title="Word Document Preview"
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

export default WordDocumentEmbedder;
