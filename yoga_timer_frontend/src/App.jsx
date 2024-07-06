import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SessionForm from './components/SessionForm';
import SessionList from './components/SessionList';
import SessionShow from './components/SessionShow';
import SessionCountdown from './components/SessionCountdown';
import './App.css';

function App() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/sessions')
      .then(response => response.json())
      .then(data => setSessions(data));
  }, []);

  const handleCreateSession = (name, description) => {
    fetch('http://localhost:3000/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ session: { name, description } }),
    })
      .then(response => response.json())
      .then(newSession => setSessions([...sessions, newSession]))
      .catch(error => console.error('Error:', error));
  };

  const handleDeleteSession = (sessionId) => {
    fetch(`http://localhost:3000/sessions/${sessionId}`, {
      method: 'DELETE',
    })
      .then(() => setSessions(sessions.filter(session => session.id !== sessionId)))
      .catch(error => console.error('Error:', error));
  };

  return (
    <Router>
      <div className="App max-w-2xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Yin Yoga Timer</h1>
        <Routes>
          <Route path="/" element={
            <>
              <SessionForm onCreate={handleCreateSession} />
              <SessionList sessions={sessions} onDelete={handleDeleteSession} />
            </>
          }/>
          <Route path="/sessions/:id" element={<SessionShow /> }/>
          <Route path="/sessions/:id/countdown" element={<SessionCountdown /> }/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
