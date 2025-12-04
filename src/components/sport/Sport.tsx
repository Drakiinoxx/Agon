import React, { useState } from 'react';
import './Sport.css';
import data from '../../../server/db.json';


const icons: { [key: number]: React.ReactNode } = {
  // 1 - Stadion (sprint)
  1: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="42" cy="12" r="6" fill="currentColor"/>
      <path d="M40 17 L28 32"/>
      <path d="M34 24 L22 16"/>
      <path d="M34 24 L44 34"/>
      <path d="M28 32 L16 40 L8 48"/>
      <path d="M28 32 L42 46 L54 54"/>
      <path d="M4 56 L60 56" strokeWidth="1.5"/>
    </svg>
  ),

  // 2 - Diaulos (aller-retour)
  2: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="32" cy="10" r="5" fill="currentColor"/>
      <path d="M32 15 L30 28"/>
      <path d="M30 20 L22 16"/>
      <path d="M30 20 L38 24"/>
      <path d="M30 28 L22 40 L18 50"/>
      <path d="M30 28 L38 38 L42 48"/>
      <path d="M8 56 L56 56" strokeWidth="2.5"/>
      <path d="M8 56 L16 50" strokeWidth="2.5"/>
      <path d="M8 56 L16 62" strokeWidth="2.5"/>
      <path d="M56 56 L48 50" strokeWidth="2.5"/>
      <path d="M56 56 L48 62" strokeWidth="2.5"/>
      <rect x="30" y="52" width="4" height="8" fill="currentColor"/>
    </svg>
  ),

  // 3 - Dolichos (fond)
  3: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="32" cy="10" r="6" fill="currentColor"/>
      <path d="M32 16 L32 34"/>
      <path d="M32 22 L22 20 L20 26"/>
      <circle cx="20" cy="28" r="4" fill="currentColor"/>
      <path d="M32 22 L48 16"/>
      <circle cx="50" cy="15" r="4" fill="currentColor"/>
      <path d="M32 34 L24 48 L20 58"/>
      <path d="M32 34 L40 48 L44 58"/>
      <path d="M56 12 L60 8" strokeWidth="2"/>
      <path d="M56 16 L62 16" strokeWidth="2"/>
      <path d="M56 20 L60 24" strokeWidth="2"/>
    </svg>
  ),

  // 4 - Hoplitodromos (course en armes)
  4: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="36" cy="10" r="5" fill="currentColor"/>
      <path d="M32 6 L40 6" strokeWidth="4"/>
      <path d="M36 6 L36 3"/>
      <path d="M36 15 L32 30"/>
      <path d="M34 22 L22 26"/>
      <circle cx="16" cy="28" r="10" strokeWidth="2.5"/>
      <circle cx="16" cy="28" r="4" fill="currentColor"/>
      <path d="M34 22 L44 20"/>
      <path d="M32 30 L24 44 L20 56"/>
      <path d="M32 30 L42 42 L50 54"/>
      <path d="M22 48 L22 56" strokeWidth="3"/>
      <path d="M46 50 L48 56" strokeWidth="3"/>
    </svg>
  ),

  // 5 - Lutte
  5: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="28" cy="16" r="5" fill="currentColor"/>
      <path d="M28 21 L30 32"/>
      <path d="M28 26 L18 30"/>
      <path d="M28 26 L40 24"/>
      <path d="M30 32 L22 44 L18 52"/>
      <path d="M30 32 L40 40"/>
      <circle cx="46" cy="28" r="5" fill="currentColor"/>
      <path d="M44 32 L38 44"/>
      <path d="M42 38 L32 34"/>
      <path d="M42 38 L52 36"/>
      <path d="M38 44 L32 54 L28 60"/>
      <path d="M38 44 L46 52 L52 58"/>
      <path d="M6 58 L58 58" strokeWidth="2"/>
    </svg>
  ),

  // 6 - Pugilat (boxe)
  6: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="20" cy="12" r="5" fill="currentColor"/>
      <path d="M20 17 L22 32"/>
      <path d="M20 22 L32 18"/>
      <path d="M20 26 L32 28"/>
      <path d="M22 32 L14 46 L10 56"/>
      <path d="M22 32 L28 44 L26 56"/>
      <circle cx="44" cy="12" r="5" fill="currentColor"/>
      <path d="M44 17 L42 32"/>
      <path d="M44 22 L32 18"/>
      <path d="M44 26 L32 28"/>
      <path d="M42 32 L36 44 L38 56"/>
      <path d="M42 32 L50 46 L54 56"/>
      <ellipse cx="32" cy="23" rx="6" ry="8" strokeWidth="1.5" strokeDasharray="3 2"/>
    </svg>
  ),

  // 7 - Pancrace (MMA) - À CRÉER ou utiliser celui-ci temporairement
  7: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="20" cy="14" r="5" fill="currentColor"/>
      <path d="M20 19 L24 32"/>
      <path d="M22 24 L14 20"/>
      <path d="M22 24 L32 28"/>
      <path d="M24 32 L18 44 L14 54"/>
      <path d="M24 32 L32 42"/>
      <circle cx="44" cy="20" r="5" fill="currentColor"/>
      <path d="M44 25 L40 38"/>
      <path d="M42 30 L50 26"/>
      <path d="M42 30 L32 28"/>
      <path d="M40 38 L46 50 L50 58"/>
      <path d="M40 38 L32 42"/>
      <path d="M6 58 L58 58" strokeWidth="2"/>
    </svg>
  ),

  // 8 - Pentathlon
  8: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="32" cy="18" r="5" fill="currentColor"/>
      <path d="M32 23 L28 36"/>
      <path d="M30 28 L16 24"/>
      <ellipse cx="12" cy="22" rx="6" ry="3" strokeWidth="2" fill="none"/>
      <path d="M30 28 L42 32"/>
      <path d="M28 36 L20 48 L18 56"/>
      <path d="M28 36 L36 46 L40 56"/>
      <path d="M6 6 L14 14" strokeWidth="2"/>
      <path d="M6 6 L8 10" strokeWidth="2"/>
      <circle cx="24" cy="4" r="3" strokeWidth="1.5"/>
      <path d="M38 4 L38 10 M36 7 L40 7" strokeWidth="1.5"/>
      <path d="M50 4 L54 8 L50 12" strokeWidth="1.5"/>
      <circle cx="60" cy="10" r="2" fill="currentColor"/>
      <circle cx="56" cy="10" r="2" fill="currentColor"/>
    </svg>
  ),

  // 9 - Course de chars
  9: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="52" cy="14" r="4" fill="currentColor"/>
      <path d="M52 18 L52 30"/>
      <path d="M52 22 L44 18"/>
      <path d="M52 22 L58 20"/>
      <path d="M46 28 L58 28 L60 38 L44 38 Z" strokeWidth="2"/>
      <circle cx="52" cy="44" r="7" strokeWidth="2"/>
      <circle cx="52" cy="44" r="2" fill="currentColor"/>
      <path d="M52 37 L52 51"/>
      <path d="M45 44 L59 44"/>
      <path d="M8 28 Q 4 20, 8 16" strokeWidth="2"/>
      <circle cx="6" cy="14" r="3" fill="currentColor"/>
      <ellipse cx="22" cy="30" rx="14" ry="6" strokeWidth="2"/>
      <path d="M12 36 L8 50"/>
      <path d="M18 36 L16 50"/>
      <path d="M28 36 L30 50"/>
      <path d="M34 36 L38 50"/>
      <path d="M10 18 L44 18" strokeWidth="1.5"/>
      <path d="M2 52 L62 52" strokeWidth="1.5"/>
    </svg>
  ),

  // 10 - Course de chevaux
  10: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="30" cy="8" r="5" fill="currentColor"/>
      <path d="M30 13 L30 24"/>
      <path d="M30 18 L22 14"/>
      <path d="M30 18 L38 16"/>
      <path d="M30 24 L24 32"/>
      <path d="M30 24 L36 32"/>
      <path d="M10 26 Q 4 22, 6 16"/>
      <circle cx="5" cy="14" r="4" fill="currentColor"/>
      <path d="M3 10 L2 6"/>
      <path d="M7 10 L8 6"/>
      <ellipse cx="28" cy="32" rx="18" ry="8" strokeWidth="2"/>
      <path d="M14 40 L4 44 L2 50"/>
      <path d="M20 40 L12 48 L10 54"/>
      <path d="M38 40 L46 48 L50 54"/>
      <path d="M44 40 L54 44 L60 48"/>
      <path d="M46 32 L56 28 Q 60 32, 56 36"/>
      <path d="M0 56 L64 56" strokeWidth="1.5"/>
    </svg>
  ),
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