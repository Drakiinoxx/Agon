import { useEffect, useState } from "react";

function AffichageHub() {
  const [showHub, setShowHub] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHub(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!showHub) return null;

  return (
    <div>
      <h1>Les composants du HUB</h1>
    </div>
  );
}

export default AffichageHub;