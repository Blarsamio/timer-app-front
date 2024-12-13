import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function AsanaShow() {
  const { id } = useParams();
  const [asana, setAsana] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/asanas/${id}`)
      .then((response) => response.json())
      .then((data) => setAsana(data));
  }, [id]);

  if (!asana) {
    return <div>Loading...</div>;
  }

  return (
    <div className="asana-show">
      <h2 className="text-5xl font-semibold text-black font-zen mb-4">
        {asana.title}
      </h2>
      <h3 className="text-2xl font-semibold text-black font-zen mb-2">Benefits:</h3>
      <p className="text-gray-700 mb-2 text-black font-ubuntu">
        {asana.benefits}
      </p>
      <h3 className="text-2xl font-semibold text-black font-zen mb-2">Contraindications:</h3>
      <p className="text-gray-700 mb-2 text-black font-ubuntu">
        {asana.contraindications}
      </p>
      <h3 className="text-2xl font-semibold text-black font-zen mb-2">Getting into the pose:</h3>
      <p className="text-gray-700 mb-2 text-black font-ubuntu">
        {asana.into_pose}
      </p>
      <h3 className="text-2xl font-semibold text-black font-zen mb-2">Alternatives & Options:</h3>
      <p className="text-gray-700 mb-2 text-black font-ubuntu">
        {asana.alternatives_and_options}
      </p>
      <h3 className="text-2xl font-semibold text-black font-zen mb-2">Getting out of the pose:</h3>
      <p className="text-gray-700 mb-2 text-black font-ubuntu">
        {asana.out_of_pose}
      </p>
      <h3 className="text-2xl font-semibold text-black font-zen mb-2">Counterposes:</h3>
      <p className="text-gray-700 mb-2 text-black font-ubuntu">
        {asana.counterposes}
      </p>
      <h3 className="text-2xl font-semibold text-black font-zen mb-2">Meridians & Organs:</h3>
      <p className="text-gray-700 mb-2 text-black font-ubuntu">
        {asana.meridians_and_organs}
      </p>
      <h3 className="text-2xl font-semibold text-black font-zen mb-2">Joints affected:</h3>
      <p className="text-gray-700 mb-2 text-black font-ubuntu">
        {asana.joints}
      </p>
      <h3 className="text-2xl font-semibold text-black font-zen mb-2">Recommended time:</h3>
      <p className="text-gray-700 mb-2 text-black font-ubuntu">
        {asana.recommended_time}
      </p>
      <h3 className="text-2xl font-semibold text-black font-zen mb-2">Other notes:</h3>
      <p className="text-gray-700 mb-2 text-black font-ubuntu">
        {asana.other_notes}
      </p>
    </div>
  );
}

export default AsanaShow;
