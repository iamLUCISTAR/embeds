import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PDFEmbedder = () => {
  const navigate = useNavigate();
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfLink, setPdfLink] = useState("");
  const [error, setError] = useState("");
  const [isLinkMode, setIsLinkMode] = useState(true);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(URL.createObjectURL(file));
      setError("");
      setIsLinkMode(false);
    } else {
      setError("Please upload a valid PDF file.");
    }
  };

  const handleLinkSubmit = () => {
    const isGoogleDriveLink = pdfLink.includes("drive.google.com");
    if (isGoogleDriveLink) {
      const fileId = extractGoogleDriveFileId(pdfLink);
      if (fileId) {
        const googleDriveEmbedLink = `https://drive.google.com/file/d/${fileId}/preview`;
        setPdfFile(googleDriveEmbedLink);
        setError("");
        setIsLinkMode(true);
      } else {
        setError("Unable to extract file ID from the Google Drive link.");
      }
    } else {
      setPdfFile(pdfLink);
      setError("");
      setIsLinkMode(true);
    }
  };

  const extractGoogleDriveFileId = (link) => {
    const regex = /(?:https:\/\/drive\.google\.com\/.*?\/d\/)([^\/]+)/;
    const match = link.match(regex);
    return match ? match[1] : null;
  };

  const openPDFInNewWindow = () => {
    if (pdfFile) {
      window.open(pdfFile, "_blank");
    } else {
      setError("No PDF file or link provided.");
    }
  };

  return (
    <div className="App">
      <h1>PDF Embedder</h1>
      <div className="input-container">
        <h3>Embed PDF:</h3>
        <div className="embed-options">
          <button
            className={isLinkMode ? "active" : ""}
            onClick={() => setIsLinkMode(true)}
          >
            Enter PDF Link
          </button>
          <button
            className={!isLinkMode ? "active" : ""}
            onClick={() => setIsLinkMode(false)}
          >
            Upload PDF
          </button>
        </div>

        {isLinkMode ? (
          <div>
            <input
              type="text"
              placeholder="Enter PDF link here"
              value={pdfLink}
              onChange={(e) => setPdfLink(e.target.value)}
            />
            <button onClick={handleLinkSubmit}>Load PDF</button>
          </div>
        ) : (
          <div>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileUpload}
            />
          </div>
        )}
        {error && <p className="error-message">{error}</p>}
      </div>

      {pdfFile && (
        <div className="preview-section">
          <h3>Preview:</h3>
          <iframe
            src={pdfFile}
            width="100%"
            height="800px"
            title="PDF Preview"
            style={{ border: "none", borderRadius: "10px" }}
          />
          <div className="actions">
            <button onClick={openPDFInNewWindow}>Open PDF in New Window</button>
          </div>
        </div>
      )}
      <div className="actions">
        <button onClick={() => navigate("/")}>Back to Landing Page</button>
      </div>
    </div>
  );
};

export default PDFEmbedder;
