import { useEffect, useState } from "react";

type Props = {
  header: React.ReactNode;
  content: React.ReactNode;
};

function AffichageHub({ content }: Props) {
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
      <div className="content">{content}</div>
    </div>
  );
}

export default AffichageHub;
