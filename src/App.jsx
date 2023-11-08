import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Offer from "./pages/Offer";

import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offers/:id" element={<Offer />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
