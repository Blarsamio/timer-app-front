import PropTypes  from 'prop-types';
import { Link } from 'react-router-dom';

function AsanaList({ asanas }) {
  return (
    <div className="asana-list">
      <h2 className='text-black font-zen text-5xl mb-8'>Asana List</h2>
      {asanas.map(asana => (
        <div key={asana.id} className="asana p-4 border border-gold rounded-lg mb-4 flex flex-row justify-between">
          <div className="self-center">
            <Link to={`/asanas/${asana.id}`} className="text-xl font-zen text-black self-start">
              {asana.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

AsanaList.propTypes = {
  asanas: PropTypes.array.isRequired,
};

export default AsanaList;
