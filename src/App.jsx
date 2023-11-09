//REACT COMPONENTS
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

//Components
import Header from "./components/Header";

//Pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

//Static assets
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/offers/:id" element={<Offer />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
