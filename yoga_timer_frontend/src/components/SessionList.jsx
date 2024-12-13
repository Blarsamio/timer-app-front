import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MdClose } from "react-icons/md";
function SessionList({ sessions, onDelete }) {
  return (
    <div className="session-list">
      <h2 className='text-black font-zen text-5xl mb-8'>Your Sessions</h2>
      {sessions.map(session => (
        <div key={session.id} className="session p-4 border border-gold rounded-lg mb-4 flex flex-row justify-between">
          <div className="self-center">
            <Link to={`/sessions/${session.id}`} className="text-xl font-zen text-black">
              {session.name}
            </Link>
          </div>
          <button
            onClick={() => onDelete(session.id)}
            className="bg-gold text-white p-2 rounded"
          >
            <MdClose className='w-4 h-4' />
          </button>
        </div>
      ))}
    </div>
  );
}

SessionList.propTypes = {
  sessions: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default SessionList;
