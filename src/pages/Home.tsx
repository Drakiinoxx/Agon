import NeoNav from "../components/navbar/Navbar"
import { useRef, useEffect } from "react";
import Musique from "../components/Mucic/Musique";
import Homes from "../components/Homes/Homes";

function home() {
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


function Home() {
  return (
    <div>
      <NeoNav/>
      <Musique registerPlayFn={(fn) => (playMusicRef.current = fn)} />
      <Homes />
    </div>
  )
}


export default home;
