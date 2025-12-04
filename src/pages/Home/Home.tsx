import "./home.css";
import NeoNav from "../../components/navbar/Navbar";
import { useRef, useEffect } from "react";
import Musique from "../../components/Mucic/Musique";
import Homes from "../../components/Homes/Homes";
import AffichageHub from "../../components/AffichageHUB/AffichageHub";
import HubClassement from "../../components/HubClassement/HubClassement";
import EpreuveHUB from "../../components/Epreuves/EpreuveHUB";

function Home() {
  const playMusicRef = useRef<(() => void) | null>(null);
  useEffect(() => {
    const playOnClick = () => {
      if (playMusicRef.current) {
        playMusicRef.current();
      }
      document.removeEventListener("click", playOnClick);
    };

    document.addEventListener("click", playOnClick);

    return () => document.removeEventListener("click", playOnClick);
  }, []);

  return (
    <div c>
      <NeoNav />
      <Musique registerPlayFn={(fn) => (playMusicRef.current = fn)} />
      <Homes />
      <div className="hub-grid">
        <AffichageHub header="Classement" content={<HubClassement />} />
        <AffichageHub header="Épreuves" content={<EpreuveHUB />} />
      </div>
    </div>
  );
}

export default Home;
