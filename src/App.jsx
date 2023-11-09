//REACT COMPONENTS
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

//Components
import Header from "./components/Header";
import Modal from "./components/Modal";

//Pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

//Static assets
import "./App.css";

function App() {
  const [visible, setVisible] = useState(false);

  const [formAction, setFormAction] = useState("");
  return (
    <>
      <Router>
        <Header
          visible={visible}
          setVisible={setVisible}
          setFormAction={setFormAction}
        />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/offers/:id" element={<Offer />} />
        </Routes>
        {visible && <Modal setVisible={setVisible} formAction={formAction} />}
      </Router>
    </>
  );
}

export default App;
