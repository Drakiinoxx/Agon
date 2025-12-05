import { useEffect, useState } from "react";
import "./NextEpreuve.css";

type Epreuve = {
  id: number;
  nom: string;
  description: string;
  jour: string;
};

function AvenirHUB() {
  const [epreuves, setEpreuves] = useState<Epreuve[]>([]);

  useEffect(() => {
    fetch("/api/sport")
      .then((res) => res.json())
      .then((data) => {
        setEpreuves(data);
      })
      .catch((err) => console.error(err));
  }, []);

  // Grouper par jour
  const joursAffiches = ["Jour 3", "Jour 4", "Jour 5"];

  const epreuvesParJour = joursAffiches.map((jour) => ({
    jour,
    epreuves: epreuves.filter((e) => e.jour === jour),
  }));

  return (
    <div className="avenir-container">
      <h2 className="avenir-title">À VENIR</h2>
      <div className="avenir-grid">
        {epreuvesParJour.map((groupe) => (
          <div key={groupe.jour} className="avenir-jour">
            <h3 className="avenir-jour-title">{groupe.jour}</h3>
            <ul className="avenir-list">
              {groupe.epreuves.map((epreuve) => (
                <li key={epreuve.id} className="avenir-item">
                  <span className="avenir-nom">{epreuve.nom}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AvenirHUB;
