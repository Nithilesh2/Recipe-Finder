import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Recipe from "./components/Recipe";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipe />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
