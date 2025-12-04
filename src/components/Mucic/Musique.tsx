import { useRef, useEffect } from "react";
import "./Musique.css";

function Musique({ registerPlayFn }) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (registerPlayFn) {
      registerPlayFn(() => {
        if (audioRef.current) {
          audioRef.current.play();
        }
      });
    }
  }, [registerPlayFn]);

  return (
    <figure className="hidden">
      <figcaption>🎵 Écouter la musique</figcaption>

      <audio
        ref={audioRef}
        controls
        src="src/audio/Epic_musique_romain.mp4"
        onLoadedMetadata={() => {
          if (audioRef.current) {
            audioRef.current.currentTime = 52;
            audioRef.current.volume = 0.1;
          }
        }}
      ></audio>
    </figure>
  );
}

export default Musique;
