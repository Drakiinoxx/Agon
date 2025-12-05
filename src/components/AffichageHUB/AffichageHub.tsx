import { useEffect, useState } from "react";
import "./AffichageHub.css";

type Props = {
  header: React.ReactNode;
  content: React.ReactNode;
};

function AffichageHub({ content }: Props) {
  const [showHub, setShowHub] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHub(true);
      // Petit délai pour déclencher l'animation après le rendu
      setTimeout(() => setIsVisible(true), 50);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!showHub) return null;

  return (
    <div className={`hub-wrapper ${isVisible ? "hub-visible" : ""}`}>
      <div className="content">{content}</div>
    </div>
  );
}

export default AffichageHub;
