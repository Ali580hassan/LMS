import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const MIN_VISIBLE_MS = 400; // loader kam se kam itni der dikhega

export default function TopLoader() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const shownAt = Date.now();

    const raf1 = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const elapsed = Date.now() - shownAt;
        const remaining = Math.max(MIN_VISIBLE_MS - elapsed, 0);
        setTimeout(() => setLoading(false), remaining);
      });
    });

    return () => cancelAnimationFrame(raf1);
  }, [location.pathname]);

  if (!loading) return null;

  return (
    <div className="fixed left-0 top-0 z-50 h-0.5 w-full overflow-hidden bg-transparent">
      <div className="h-full w-1/3 animate-[loader_0.8s_ease-in-out_infinite] bg-brand-500" />
      <style>{`
        @keyframes loader {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
}