import { useEffect, useState } from "react";
import "./EpreuveHUB.css";

type Epreuve = {
  id: number;
  nom: string;
  description: string;
  jour: string;
};

type Athlete = {
  id: number;
  nom: string;
  cite: string;
  epreuves: string[];
};

function EpreuveHUB() {
  const [epreuves, setEpreuves] = useState<Epreuve[]>([]);
  const [athletes, setAthletes] = useState<Athlete[]>([]);

  useEffect(() => {
    fetch("/api/sport")
      .then((res) => res.json())
      .then((data) => setEpreuves(data))
      .catch((err) => console.error(err));

    fetch("/api/athletes")
      .then((res) => res.json())
      .then((data) => setAthletes(data))
      .catch((err) => console.error(err));
  }, []);

  const getAthletesForEpreuve = (nomEpreuve: string) => {
    const found = athletes.filter((athlete) =>
      athlete.epreuves.some((e) => e.toLowerCase() === nomEpreuve.toLowerCase())
    );

    if (found.length === 0) {
      return [
        { id: -1, nom: "Phidippidès ", cite: "Athènes", epreuves: [] },
        { id: -2, nom: "Orsippos ", cite: "Sparte", epreuves: [] },
        { id: -3, nom: "Timasitheos ", cite: "Rhodes", epreuves: [] },
      ];
    }

    return found;
  };

  const epreuvesEnCours = epreuves.slice(0, 3);

  return (
    <div className="epreuve-container">
      <h2 className="epreuve-title">ÉPREUVE EN COURS</h2>
      <ul className="epreuve-list">
        {epreuvesEnCours.map((epreuve) => (
          <li key={epreuve.id} className="epreuve-item">
            <span className="epreuve-nom">{epreuve.nom}</span>
            <div className="epreuve-participants">
              {getAthletesForEpreuve(epreuve.nom)
                .slice(0, 3)
                .map((athlete, index) => (
                  <p key={athlete.id} className="epreuve-participant">
                    {index + 1}. {athlete.cite}
                  </p>
                ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EpreuveHUB;
