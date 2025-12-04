import NeoNav from "../components/navbar/Navbar"
import { useRef, useEffect } from "react";
import Musique from "../components/Mucic/Musique";
import Homes from "../components/Homes/Homes";
import AffichageHub from "../components/AffichageHUB/AffichageHub";

function Home() {
  const playMusicRef = useRef(null);
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
    <div>
      <NeoNav/>
      <Musique registerPlayFn={(fn) => (playMusicRef.current = fn)} />
      <Homes />
      <AffichageHub />
    </div>
  )
}


export default Home;
