import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PDFEmbedder from "./components/PdfEmbedder";
import ImageEmbedder from "./components/ImageEmbedder";
import GoogleSheetsEmbedder from "./components/GoogleSheetsEmbedder";
import LandingPage from "./components/LandingPage";
import GoogleDocumentEmbedder from "./components/GoogleDocEmbedder";
import WordDocumentEmbedder from "./components/WordDocumentEmbedder";
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/embed-pdf" element={<PDFEmbedder />} />
        <Route path="/embed-image" element={<ImageEmbedder />} />
        <Route path="/embed-google-sheet" element={<GoogleSheetsEmbedder />} />
        <Route path="/embed-google-doc" element={<GoogleDocumentEmbedder />} />
        <Route path="/embed-word-doc" element={<WordDocumentEmbedder />} />
      </Routes>
    </Router>
  );
};

export default App;