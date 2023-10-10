import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import Home from "./components/Home";
import DirectMessages from "./components/DirectMessages";
// import Channels from "./Components/Channels";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem("loggedInUser"))
  );
  const [savedUsers, setSavedUsers] = useState(
    JSON.parse(localStorage.getItem("savedUsers")) || []
  );

  useEffect(() => {
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    if (loggedInUser) {
      const uniqueSavedUsers = savedUsers.filter(
        (user) =>
          user.username !== loggedInUser.username &&
          user.password !== loggedInUser.password
      );

      localStorage.setItem(
        "savedUsers",
        JSON.stringify([...uniqueSavedUsers, loggedInUser])
      );
    }
  }, [loggedInUser]);

  return (
    <Router>
      <header className="headerContainer"></header>

      <main className="mainContainer">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route
            path="/signup"
            element={<SignUpPage savedUsers={savedUsers} />}
          />
          <Route
            path="/login"
            element={<LoginPage setLoggedInUser={setLoggedInUser} />}
          />
          <Route path="/home" element={<Home user={loggedInUser} />} />
          <Route
            path="/direct-messages"
            element={<DirectMessages user={loggedInUser} />}
          />
          {/* <Route path="/channels" element={<Channels user={loggedInUser} />} /> */}
        </Routes>
      </main>

      <footer>
        <h6>2023 Slack-like App</h6>
      </footer>
    </Router>
  );
}

export default App;
