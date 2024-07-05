import { useState } from 'react';
import PropTypes from 'prop-types';

function SessionForm({ onCreate }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(name, description);
    setName('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="py-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Session Name"
        className="border p-2 mb-2 w-full"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Session Description"
        className="border p-2 mb-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 w-full">Add Session</button>
    </form>
  );
}

SessionForm.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

export default SessionForm;
