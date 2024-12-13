import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import SessionForm from "./SessionForm";
import SessionList from "./SessionList";
import SessionShow from "./SessionShow";
import SessionCountdown from "./SessionCountdown";
import AsanaList from "./AsanaList";
import AsanaShow from "./AsanaShow";
import NavLayout from "./NavLayout";
import "../App.css";

function Main() {
  const [sessions, setSessions] = useState([]);
  const [asanas, setAsanas] = useState([]);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/sessions")
      .then((response) => response.json())
      .then((data) => setSessions(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/asanas")
      .then((response) => response.json())
      .then((data) => setAsanas(data));
  }, []);

  const handleCreateSession = (name, description) => {
    fetch("http://localhost:3000/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ session: { name, description } }),
    })
      .then((response) => response.json())
      .then((newSession) => setSessions([...sessions, newSession]))
      .catch((error) => console.error("Error:", error));
  };

  const handleDeleteSession = (sessionId) => {
    fetch(`http://localhost:3000/sessions/${sessionId}`, {
      method: "DELETE",
    })
      .then(() =>
        setSessions(sessions.filter((session) => session.id !== sessionId))
      )
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="App">
      {!isHomePage && <NavLayout />}
      <div className="App max-w-2xl mx-auto p-4">
        <h1 className="text-5xl font-zen mb-4 text-black hidden">
          Yin Yoga Timer
        </h1>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SessionList
                  sessions={sessions}
                  onDelete={handleDeleteSession}
                />
                <SessionForm onCreate={handleCreateSession} />
                <button
                  className="bg-gold text-white px-4 py-2 rounded-lg w-full mt-4"
                  onClick={() => navigate("/asanas")}
                >
                  Explore All Asanas
                </button>
              </>
            }
          />
          <Route path="/sessions/:id" element={<SessionShow />} />
          <Route
            path="/sessions/:id/countdown"
            element={<SessionCountdown />}
          />
          <Route path="/asanas" element={<AsanaList asanas={asanas} />} />
          <Route path="/asanas/:id" element={<AsanaShow />} />
        </Routes>
      </div>
    </div>
  );
}

export default Main;
