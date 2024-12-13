import { useState } from 'react';
import PropTypes from 'prop-types';
import FormModal from './FormModal';

function SessionForm({ onCreate }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(name, description);
    setName('');
    setDescription('');
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={openModal} className="bg-gold text-white p-2 w-full">Create Session</button>

      <FormModal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-4xl text-black font-semibold mb-4 font-zen">Your new session</h2>
        <form onSubmit={handleSubmit} className="py-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Session Name"
            className="border p-2 mb-2 w-full bg-white text-black"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Session Description"
            className="border p-2 mb-2 w-full bg-white text-black"
          />
          <button type="submit" className="bg-gold text-white p-2 w-full">Create</button>
        </form>
      </FormModal>
    </div>
  );
}

SessionForm.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

export default SessionForm;
