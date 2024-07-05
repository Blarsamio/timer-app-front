import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Timer from './Timer';
import TimerForm from './TimerForm';

function SessionShow() {
  const { id } = useParams();
  const [session, setSession] = useState(null);
  const [currentTimerIndex, setCurrentTimerIndex] = useState(0);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:3000/sessions/${id}`)
      .then(response => response.json())
      .then(data => {
        setSession(data);
        if (data.timers.length > 0) {
        setTimeLeft(data.timers[0].duration);
      }
    });
  }, [id]);

  const handleAddTimer = (duration) => {
    fetch(`http://localhost:3000/sessions/${id}/timers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ timer: { duration } }),
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
    if (!session || session.timers.length === 0) return;
    setIsSessionActive(true);
    setCurrentTimerIndex(0);
    setIsPaused(false);
    setTimeLeft(session.timers[0].duration);
  };

  const handlePauseResumeSession = () => {
    setIsPaused(!isPaused);
  };

  const handleResetSession = () => {
    setIsSessionActive(false);
    setIsPaused(false);
    setCurrentTimerIndex(0);
    if (session && session.timers.length > 0) {
      setTimeLeft(session.timers[0].duration);
    }
  };

  useEffect(() => {
    let interval = null;
    if (isSessionActive && !isPaused && currentTimerIndex < session.timers.length) {
      interval = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft > 0) {
            return prevTimeLeft - 1;
          } else {
            clearInterval(interval);
            if (currentTimerIndex + 1 < session.timers.length) {
              setCurrentTimerIndex((prevIndex) => prevIndex + 1);
              setTimeLeft(session.timers[currentTimerIndex + 1].duration);
            } else {
              setIsSessionActive(false);
            }
            return 0;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSessionActive, isPaused, currentTimerIndex, session]);

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div className="session-show">
      <h2 className="text-xl font-semibold">{session.name}</h2>
      <p className="text-gray-700 mb-2">{session.description}</p>
      <TimerForm onAddTimer={handleAddTimer} />
      <div className="timers mt-2">
        {session.timers.map((timer, index) => (
          <div key={timer.id} className={index === currentTimerIndex && isSessionActive ? 'current-timer' : ''}>
            <Timer duration={timer.duration} isActive={index === currentTimerIndex && isSessionActive} />
          </div>
        ))}
      </div>
      <div className="mt-4">
        <button
          onClick={handleStartSession}
          className="bg-green-500 text-white p-2 rounded mr-2"
        >
          Start Session
        </button>
        <button
          onClick={handlePauseResumeSession}
          className="bg-yellow-500 text-white p-2 rounded mr-2"
          disabled={!isSessionActive}
        >
          {isPaused ? 'Resume' : 'Pause'}
        </button>
        <button
          onClick={handleResetSession}
          className="bg-red-500 text-white p-2 rounded"
          disabled={!isSessionActive}
        >
          Reset Session
        </button>
      </div>
      {isSessionActive && (
        <div className="current-timer-display mt-4">
          <p>Current Timer: {Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)}</p>
        </div>
      )}
    </div>
  );
}

export default SessionShow;
