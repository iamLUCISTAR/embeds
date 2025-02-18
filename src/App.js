import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PDFEmbedder from "./components/PdfEmbedder";
import ImageEmbedder from "./components/ImageEmbedder";
import LandingPage from "./components/LandingPage";
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/embed-pdf" element={<PDFEmbedder />} />
        <Route path="/embed-image" element={<ImageEmbedder />} />
      </Routes>
    </Router>
  );
};

export default App;
