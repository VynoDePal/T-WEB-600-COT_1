import React from "react";
import Accueil from "./Pages/ClientPage/Accueil";
import Register from "./Pages/ClientPage/Register";
import Product from "./Pages/ClientPage/Product";
import Login from "./Pages/ClientPage/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/AdminPage/AdminDashboard";
import DescriptionProduit from "./Pages/ClientPage/DescriptionProduit";

function App() {
  return (
    <div className="font-sans">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product" element={<Product />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/description" element={<DescriptionProduit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
