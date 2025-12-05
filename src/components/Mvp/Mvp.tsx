import { useEffect, useState } from "react";
import Crotone from "../../assets/Crotone.jpg";
import "./Mvp.css";

type Athlete = {
  id: number;
  nom: string;
  nom_complet: string;
  cite: string;
  epreuves: string[];
  victoires_olympiques: number;
  surnom: string;
  histoire: string;
};

function Mvp() {
  const [mvp, setMvp] = useState<Athlete | null>(null);

  useEffect(() => {
    fetch("/api/athletes")
      .then((res) => res.json())
      .then((data) => {
        const milon = data.find((athlete: Athlete) => athlete.id === 2);
        setMvp(milon);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="mvp-container">
      <h2 className="mvp-title">MVP</h2>
      {mvp && (
        <div className="mvp-card">
          <img src={Crotone} alt={mvp.nom} className="mvp-image" />
          <div className="mvp-info">
            <p className="mvp-nom">{mvp.nom_complet}</p>
            <p className="mvp-surnom">{mvp.surnom}</p>
            <p className="mvp-detail">Cité : {mvp.cite}</p>
            <p className="mvp-detail">Victoires : {mvp.victoires_olympiques}</p>
            <p className="mvp-histoire">{mvp.histoire}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Mvp;
