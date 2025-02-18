import React, { useState } from "react";

const PDFViewer = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfLink, setPdfLink] = useState("");
  const [error, setError] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(URL.createObjectURL(file));
      setError("");
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
      } else {
        setError("Unable to extract file ID from the Google Drive link.");
      }
    } else {
      setPdfFile(pdfLink);
      setError("");
    }
  };

  // Extract the Google Drive file ID from the shared link
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
    <div style={{ padding: "20px" }}>
      <h1>PDF Viewer</h1>
      <div>
        <h3>Upload a PDF File:</h3>
        <input type="file" accept="application/pdf" onChange={handleFileUpload} />
      </div>
      <div>
        <h3>Or Enter a PDF Link:</h3>
        <input
          type="text"
          placeholder="Enter PDF link (Google Drive link also supported)"
          value={pdfLink}
          onChange={(e) => setPdfLink(e.target.value)}
        />
        <button onClick={handleLinkSubmit}>Load PDF</button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <h3>View PDF:</h3>
        <button onClick={openPDFInNewWindow} disabled={!pdfFile}>
          Open PDF in New Window
        </button>
      </div>
      {pdfFile && (
        <div style={{ marginTop: "20px" }}>
          <h3>Preview:</h3>
          <iframe
            src={pdfFile}
            width="100%"
            height="500px"
            title="PDF Preview"
            style={{ border: "1px solid #ccc" }}
          />
        </div>
      )}
    </div>
  );
};

export default PDFViewer;
