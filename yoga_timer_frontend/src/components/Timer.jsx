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

  return (
    <div className="timer py-2 border border-gold rounded-lg mb-4">
      <div className="font-ubuntu text-lg text-black">
        <p className='text-gray-500 text-xl font-zen'>{title}</p>
        {Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)}
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
