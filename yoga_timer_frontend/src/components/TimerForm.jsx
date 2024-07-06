import { useState } from 'react';
import PropTypes from 'prop-types';


function TimerForm({ onAddTimer }) {
  const [duration, setDuration] = useState('');
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTimer(parseInt(duration), title);
    setDuration('');
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-2">
      <input
        type="number"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        placeholder="Timer Duration (seconds)"
        className="border p-2"
      />
      <input
        type="string"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='Name of Asana'
        className='border p-2'
      />
      <button type="submit" className="bg-green-500 text-white p-2">Add Timer</button>
    </form>
  );
}

TimerForm.propTypes = {
  onAddTimer: PropTypes.func.isRequired,
};

export default TimerForm;
