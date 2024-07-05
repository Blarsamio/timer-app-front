import { useState } from 'react';
import PropTypes from 'prop-types';


function TimerForm({ onAddTimer }) {
  const [duration, setDuration] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTimer(parseInt(duration));
    setDuration('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input
        type="number"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        placeholder="Timer Duration (seconds)"
        className="border p-2"
      />
      <button type="submit" className="bg-green-500 text-white p-2 ml-2">Add Timer</button>
    </form>
  );
}

TimerForm.propTypes = {
  onAddTimer: PropTypes.func.isRequired,
};

export default TimerForm;
