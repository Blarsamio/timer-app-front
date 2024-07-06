import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Timer from './Timer';
import TimerForm from './TimerForm';

function SessionShow() {
  const { id } = useParams();
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/sessions/${id}`)
      .then(response => response.json())
      .then(data => setSession(data));
  }, [id]);

  const handleAddTimer = (duration, title) => {
    fetch(`http://localhost:3000/sessions/${id}/timers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ timer: { duration, title } }),
    })
      .then(response => response.json())
      .then(newTimer => {
        setSession(prevSession => ({
          ...prevSession,
          timers: [...prevSession.timers, newTimer],
        }));
      });
  };

  const handleStartSession = () => {
    navigate(`/sessions/${id}/countdown`);
  };


  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div className="session-show">
      <h2 className="text-xl font-semibold">{session.name}</h2>
      <p className="text-gray-700 mb-2">{session.description}</p>
      <TimerForm onAddTimer={handleAddTimer} />
      <div className="timers mt-2">
        {session.timers.map(timer => (
          <Timer key={timer.id} duration={timer.duration} title={timer.title} />
        ))}
      </div>
      <div className="mt-4">
        <button
          onClick={handleStartSession}
          className="bg-green-500 text-white p-2 rounded mr-2"
        >
          Start Session
        </button>
      </div>
    </div>
  );
}

export default SessionShow;
