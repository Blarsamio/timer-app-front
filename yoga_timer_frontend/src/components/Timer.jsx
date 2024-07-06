import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function Timer({ duration, title }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      clearInterval(interval);
      if (audioRef.current) {
        audioRef.current.play();
      }
      setIsActive(false); // Ensure timer stops after reaching zero
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);


  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(duration);
  };

  return (
    <div className="timer p-4 border rounded-lg mb-4">
      <div className="time text-2xl font-mono">
        {Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)}
        <p className='text-gray-500 font-semibold'>{title}</p>
      </div>
      <div className="buttons mt-2">
        <button onClick={handleReset} className="bg-red-500 text-white p-2 rounded">
          Reset
        </button>
      </div>
      <audio ref={audioRef} src="/src/assets/bowl.wav" />
    </div>
  );
}

Timer.propTypes = {
  duration: PropTypes.number.isRequired,
  title: PropTypes.string,
};

export default Timer;
