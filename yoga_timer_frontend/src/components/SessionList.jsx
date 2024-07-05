import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function SessionList({ sessions, onDelete }) {
  return (
    <div className="session-list">
      {sessions.map(session => (
        <div key={session.id} className="session p-4 border rounded-lg mb-4 flex flex-row justify-between">
          <div className="flex flex-col justify-between items-center">
            <Link to={`/sessions/${session.id}`} className="text-xl font-semibold text-white self-start">
              {session.name}
            </Link>
            <p className="text-gray-500 self-start">{session.description}</p>

          </div>
          <button
            onClick={() => onDelete(session.id)}
            className="bg-red-500 text-white p-2 rounded"
          >
            Delete
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
