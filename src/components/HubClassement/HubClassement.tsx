import { useEffect, useState } from "react";
import "./HubClassement.css";

type Cities = {
  id: number;
  nom: string;
  points: number;
};

function HubClassement() {
  const [cities, setCities] = useState<Cities[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch("/api/cities")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a: Cities, b: Cities) => b.points - a.points);
        setCities(sorted);
      })
      .catch((err) => console.error(err));
  }, []);

  // Affiche 3 ou tous selon l'état
  const displayedCities = showAll ? cities : cities.slice(0, 3);

  return (
    <div className="classement-container">
      <h2 className="classement-title">Classement Général</h2>
      <ul className="classement-list">
        {displayedCities.map((city, index) => (
          <li key={city.id} className="classement-item">
            <div className="classement-left">
              <span className="classement-rank">{index + 1}</span>
              <span className="classement-city">{city.nom}</span>
            </div>
            <span className="classement-points">{city.points} pts</span>
          </li>
        ))}
      </ul>

      {cities.length > 3 && (
        <button
          className="classement-toggle"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "−" : "+"}
        </button>
      )}
    </div>
  );
}

export default HubClassement;
