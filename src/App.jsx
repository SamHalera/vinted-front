//REACT COMPONENTS
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

//Components
import Header from "./components/Header";
import Modal from "./components/Modal";

//Pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";

//Static assets
import "./App.css";

function App() {
  const [visible, setVisible] = useState(false);

  const [formAction, setFormAction] = useState("");
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [userId, setUserId] = useState(Cookies.get("userId") || null);

  const [sortFilter, setSortFilter] = useState("price-asc");
  const [titleFilter, setTitleFilter] = useState("");
  const [price, setPrice] = useState([5, 300]);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [allOffers, setAllOffers] = useState(false);
  const [requestedLink, setRequestedLink] = useState("");

  console.log("first", token);
  console.log("userId=>", userId);

  const handleToken = (token) => {
    if (token) {
      Cookies.set("token", token, { expires: 15 });

      setToken(token);
    } else {
      Cookies.remove("token");
      console.log("REMOVE", token);
      setToken(null);
    }
  };
  const handleId = (userId) => {
    console.log("dans le handleId");
    if (userId) {
      Cookies.set("userId", userId, { expires: 15 });

      setUserId(userId);
    } else {
      Cookies.remove("userId");
      console.log("REMOVE", userId);
      setUserId(null);
    }
  };
  console.log("second", token);
  return (
    <>
      <Router>
        <Header
          setVisible={setVisible}
          setFormAction={setFormAction}
          token={token}
          handleToken={handleToken}
          sortFilter={sortFilter}
          setSortFilter={setSortFilter}
          titleFilter={titleFilter}
          setTitleFilter={setTitleFilter}
          price={price}
          setPrice={setPrice}
          requestedLink={requestedLink}
          setRequestedLink={setRequestedLink}
        />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <Home
                token={token}
                setFormAction={setFormAction}
                setVisible={setVisible}
                allOffers={allOffers}
                setAllOffers={setAllOffers}
                sortFilter={sortFilter}
                titleFilter={titleFilter}
                price={price}
                setRequestedLink={setRequestedLink}
              />
            }
          />
          <Route
            path="/offers/:id"
            element={
              <Offer
                token={token}
                userId={userId}
                setVisible={setVisible}
                setFormAction={setFormAction}
                setRequestedLink={setRequestedLink}
              />
            }
          />
          <Route path="/publish" element={<Publish token={token} />} />
          <Route
            path="/payment"
            element={
              <Payment
                token={token}
                userId={userId}
                setVisible={setVisible}
                setFormAction={setFormAction}
              />
            }
          />
        </Routes>
        {visible && (
          <Modal
            setVisible={setVisible}
            formAction={formAction}
            handleToken={handleToken}
            handleId={handleId}
            error={error}
            setError={setError}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            requestedLink={requestedLink}
          />
        )}
      </Router>
    </>
  );
}

export default App;
