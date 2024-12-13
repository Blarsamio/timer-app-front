import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import FormModal from "./FormModal";

function TimerForm({ onAddTimer }) {
  const [duration, setDuration] = useState("");
  const [title, setTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [asanas, setAsanas] = useState([]);
  const [filteredAsanas, setFilteredAsanas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/asanas")
      .then((response) => response.json())
      .then((data) => setAsanas(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);

    const filtered = asanas.filter(asana =>
      asana.title.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredAsanas(filtered);
  };

  const handleSelectAsana = (asanaName) => {
    setTitle(asanaName);
    setFilteredAsanas([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const durationInSeconds = parseInt(duration) * 60;

    onAddTimer(durationInSeconds, title);
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
      <button onClick={openModal} className="bg-gold rounded text-white p-2 w-full flex flex-col mx-auto items-center">
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
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Asana"
            className="border p-2 mb-2 w-full bg-white text-black"
          />
          {filteredAsanas.length > 0 && (
            <ul className="border p-2 bg-white text-black max-h-36 overflow-scroll">
              {filteredAsanas.map((asana) => (
                <li
                  key={asana.id}
                  onClick={() => handleSelectAsana(asana.title)}
                  className="cursor-pointer hover:bg-gray-200 p-2 flex flex-col"
                >
                  {asana.title}
                  <span className="font-ubuntu text-xs">{asana.recommended_time}</span>
                </li>
              ))}
            </ul>
          )
          }
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Set duration in minutes"
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
