import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ImageEmbedder = () => {
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [imageLink, setImageLink] = useState("");
  const [error, setError] = useState("");
  const [isLinkMode, setIsLinkMode] = useState(true);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(URL.createObjectURL(file));
      setError("");
      setIsLinkMode(false); // Switch to file mode after uploading
    } else {
      setError("Please upload a valid image file.");
    }
  };

  const handleLinkSubmit = () => {
    const isGoogleDriveLink = imageLink.includes("drive.google.com");
    if (isGoogleDriveLink) {
      const fileId = extractGoogleDriveFileId(imageLink);
      if (fileId) {
        const googleDriveImageLink = `https://drive.google.com/uc?export=view&id=${fileId}`;
        setImageFile(googleDriveImageLink);
        setError("");
        setIsLinkMode(true); // Switch to link mode after entering a link
      } else {
        setError("Unable to extract file ID from the Google Drive link.");
      }
    } else {
      setImageFile(imageLink);
      setError("");
      setIsLinkMode(true); // Switch to link mode after entering a link
    }
  };

  // Extract Google Drive file ID from the shared link
  const extractGoogleDriveFileId = (link) => {
    const regex = /(?:https:\/\/drive\.google\.com\/.*?\/d\/)([^\/]+)/;
    const match = link.match(regex);
    return match ? match[1] : null;
  };

  return (
    <div className="App">
      <h1>Image Embedder</h1>
      <div className="input-container">
        <h3>Embed Image:</h3>
        <div className="embed-options">
          <button
            className={isLinkMode ? "active" : ""}
            onClick={() => setIsLinkMode(true)}
          >
            Enter Image Link
          </button>
          <button
            className={!isLinkMode ? "active" : ""}
            onClick={() => setIsLinkMode(false)}
          >
            Upload Image
          </button>
        </div>

        {isLinkMode ? (
          <div>
            <input
              type="text"
              placeholder="Enter image link here"
              value={imageLink}
              onChange={(e) => setImageLink(e.target.value)}
            />
            <button onClick={handleLinkSubmit}>Load Image</button>
          </div>
        ) : (
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
            />
          </div>
        )}
        {error && <p className="error-message">{error}</p>}
      </div>

      {imageFile && (
        <div className="preview-section">
          <h3>Preview:</h3>
          <img
            src={imageFile}
            alt="Preview"
            width="100%"
            style={{ border: "none", borderRadius: "10px" }}
          />
        </div>
      )}

      <div className="actions">
        <button onClick={() => navigate("/")}>Back to Landing Page</button>
      </div>
    </div>
  );
};

export default ImageEmbedder;
