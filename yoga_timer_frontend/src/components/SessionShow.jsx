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
    <div className="max-w-2xl p-6">
      <h2 className="text-5xl font-semibold text-black font-zen mb-4">{session.name}</h2>
      <p className="text-gray-700 mb-2 text-black font-ubuntu text-lg">{session.description}</p>
      <div className="timers mt-2">
        {session.timers.length === 0 ? (
          <h2 className="text-black font-ubuntu text-xl mb-4">No timers added yet, add one</h2>
        ) : (
          session.timers.map(timer => (
            <Timer key={timer.id} duration={timer.duration} title={timer.title} />
          ))
        )}
      </div>
      <TimerForm onAddTimer={handleAddTimer} />
      <div className="mt-4">
        <button
          onClick={handleStartSession}
          className="bg-gold text-white p-2 rounded w-full mx-auto"
        >
          Start
        </button>
      </div>
    </div>
  );
}

export default SessionShow;
