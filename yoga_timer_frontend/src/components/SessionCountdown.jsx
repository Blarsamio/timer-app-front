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

  const handleSkip = () => {
    if (currentTimerIndex + 1 < session.timers.length) {
      setCurrentTimerIndex((prevIndex) => prevIndex + 1);
      setKey((prevKey) => prevKey + 1); // Restart timer
    }
  };

  const handleComplete = () => {
    if (currentTimerIndex + 1 < session.timers.length) {
      setCurrentTimerIndex((prevIndex) => prevIndex + 1);
      setKey((prevKey) => prevKey + 1); // Restart timer
    } else {
      setIsSessionActive(false);
      navigate(`/sessions/${id}`); // Redirect to a completion page or some other page
    }
    return { shouldRepeat: false };
  };

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div className="session-countdown">
      <h2 className="text-4xl text-black font-semibold mb-4">{session.name}</h2>
      <div className="timer-display mt-4">
        <CountdownCircleTimer
          key={key}
          size={350}
          isPlaying={isSessionActive && !isPaused}
          duration={session.timers[currentTimerIndex].duration}
          colors={['#A99985']}
          onComplete={handleComplete}
        >
          {({ remainingTime }) => (
            <div className="timer text-black text-5xl">
              <p>{Math.floor(remainingTime / 60)}:{('0' + (remainingTime % 60)).slice(-2)}</p>
              <p className='text-2xl'>{session.timers[currentTimerIndex].title}</p>
            </div>
          )}
        </CountdownCircleTimer>
        <button onClick={handleSkip} className="bg-gold text-white p-2 rounded mt-4 w-full">
          Skip
        </button>
      </div>
      {/* Placeholder for countdown animation library */}

    </div>
  );
}

export default SessionCountdown;
