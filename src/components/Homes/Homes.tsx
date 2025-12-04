import { useEffect, useState } from "react";
import "./Homes.css";

function Homes() {
  const [show, setShow] = useState(true);


  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="Background">
      <h1 className="Title_JO">Bienvenue au Jeux Olympiques</h1>
    </div>
  );
}

export default Homes;