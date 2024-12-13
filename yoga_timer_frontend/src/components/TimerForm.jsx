import { useState } from "react";
import PropTypes from "prop-types";
import FormModal from "./FormModal";

function TimerForm({ onAddTimer }) {
  const [duration, setDuration] = useState("");
  const [title, setTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTimer(parseInt(duration), title);
    setDuration("");
    setTitle("");
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
      <button onClick={openModal} className="bg-gold rounded text-white p-2 w-[50%] flex flex-col mx-auto items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <FormModal isOpen={isModalOpen} onClose={closeModal}>
        <form onSubmit={handleSubmit} className="py-4">
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Duration (seconds)"
            className="border p-2 mb-2 w-full bg-white text-black"
          />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="border p-2 mb-2 w-full bg-white text-black"
          />
          <button type="submit" className="bg-gold text-white p-2 mt-4">
            Add Timer
          </button>
        </form>
      </FormModal>
    </div>
  );
}

TimerForm.propTypes = {
  onAddTimer: PropTypes.func.isRequired,

};

export default TimerForm;
