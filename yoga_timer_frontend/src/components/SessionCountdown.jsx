import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

function SessionCountdown() {
  const { id } = useParams();
  const [session, setSession] = useState(null);
  const [currentTimerIndex, setCurrentTimerIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(true);
  const [key, setKey] = useState(0); // Key to restart the timer
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/sessions/${id}`)
      .then(response => response.json())
      .then(data => {
        setSession(data);
        if (data.timers.length > 0) {
          setKey((prevKey) => prevKey + 1); // Restart timer
        }
      });
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:3000/sessions/${id}`)
      .then(response => response.json())
      .then(data => {
        setSession(data);
        if (data.timers.length > 0) {
          setKey((prevKey) => prevKey + 1); // Restart timer
        }
      });
  }, [id]);

  const handleComplete = () => {
    if (currentTimerIndex + 1 < session.timers.length) {
      setCurrentTimerIndex((prevIndex) => prevIndex + 1);
      setKey((prevKey) => prevKey + 1); // Restart timer
    } else {
      setIsSessionActive(false);
      navigate(`/sessions/${id}/complete`); // Redirect to a completion page or some other page
    }
    return { shouldRepeat: false };
  };

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div className="session-countdown">
      <h2 className="text-xl font-semibold">{session.name}</h2>
      <p className="text-gray-700 mb-2">{session.description}</p>
      <div className="timer-display mt-4">
        <CountdownCircleTimer
          key={key}
          isPlaying={isSessionActive && !isPaused}
          duration={session.timers[currentTimerIndex].duration}
          colors={['#004777', '#F7B801', '#A30000', '#A30000']}
          colorsTime={[7, 5, 2, 0]}
          onComplete={handleComplete}
        >
          {({ remainingTime }) => (
            <div className="timer">
              <p>Current Timer: {Math.floor(remainingTime / 60)}:{('0' + (remainingTime % 60)).slice(-2)}</p>
            </div>
          )}
        </CountdownCircleTimer>
      </div>
      {/* Placeholder for countdown animation library */}
      <div className="countdown-animation">
        {/* Add your countdown animation component here */}
      </div>
    </div>
  );
}

export default SessionCountdown;
