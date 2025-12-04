import React, { useState } from 'react';
import './Sport.css';
import data from '../../../server/db.json';


// Tes icônes mappées par id
const icons: { [key: number]: React.ReactNode } = {
  1: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="#000000" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">

  <circle cx="28" cy="16" r="5" fill="#000000"/>
  <path d="M28 21 L30 32"/>

  <path d="M28 26 L18 30"/>
  <path d="M28 26 L40 24"/>

  <path d="M30 32 L22 44 L18 52"/>
  <path d="M30 32 L40 40"/>
  

  <circle cx="46" cy="28" r="5" fill="#000000"/>
  <path d="M44 32 L38 44"/>

  <path d="M42 38 L32 34"/>
  <path d="M42 38 L52 36"/>

  <path d="M38 44 L32 54 L28 60"/>
  <path d="M38 44 L46 52 L52 58"/>
  

  <path d="M6 58 L58 58" stroke-width="2"/>
</svg>,
  2: <svg>{/* DIAULOS */}</svg>,
  // ... etc
};

function Sport () {
  const [activeId, setActiveId] = useState<number | null>(null);

  const epreuves = data.Epreuve;
  const topRow = epreuves.slice(0, 5);
  const bottomRow = epreuves.slice(5, 10);
  const activeEpreuve = epreuves.find(e => e.id === activeId);

  return (
    <div className="epreuves-container">

      {/* Rangée du haut */}
      <div className="epreuves-row">
        {topRow.map((epreuve) => (
          <button
            key={epreuve.id}
            className={`epreuve-circle ${activeId === epreuve.id ? 'active' : ''}`}
            onClick={() => setActiveId(activeId === epreuve.id ? null : epreuve.id)}
          >
            <span className="epreuve-icon">{icons[epreuve.id]}</span>
          </button>
        ))}
      </div>

      {/* Zone de détail */}
      <div className={`epreuve-detail ${activeEpreuve ? 'open' : ''}`}>
        {activeEpreuve && (
          <>
            <div className="detail-header">
              <div className="detail-icon">{icons[activeEpreuve.id]}</div>
              <div className="detail-titles">
                <h2>{activeEpreuve.nom}</h2>
                <span className="detail-subtitle">{activeEpreuve.description}</span>
              </div>
            </div>

            <div className="detail-tags">
              {activeEpreuve.distance && (
                <div className="tag">
                  <span className="tag-icon">📏</span>
                  <span className="tag-text">{activeEpreuve.distance}</span>
                </div>
              )}
              <div className="tag">
                <span className="tag-icon">📅</span>
                <span className="tag-text">{activeEpreuve.jour}</span>
              </div>
            </div>

            <div className="detail-section">
              <h3>⚔️ Règles</h3>
              <p>{activeEpreuve.regles}</p>
            </div>

            {activeEpreuve.prestige && (
              <div className="detail-section prestige">
                <h3>🏆 Prestige</h3>
                <p>{activeEpreuve.prestige}</p>
              </div>
            )}

            {activeEpreuve.anecdote && (
              <div className="detail-section anecdote">
                <h3>💡 Le savais-tu ?</h3>
                <p>{activeEpreuve.anecdote}</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Rangée du bas */}
      <div className="epreuves-row">
        {bottomRow.map((epreuve) => (
          <button
            key={epreuve.id}
            className={`epreuve-circle ${activeId === epreuve.id ? 'active' : ''}`}
            onClick={() => setActiveId(activeId === epreuve.id ? null : epreuve.id)}
          >
            <span className="epreuve-icon">{icons[epreuve.id]}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sport;