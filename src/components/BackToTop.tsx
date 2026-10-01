import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById("apropos");
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // show once "À propos" starts entering the viewport (i.e. past the hero)
        setVisible(entry.boundingClientRect.top < window.innerHeight);
      },
      { threshold: 0, rootMargin: "0px" }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href="#accueil"
      aria-label="Retour en haut"
      className={`back-to-top fixed bottom-7 right-7 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-violet/30 bg-surface/80 text-violet shadow-lg shadow-violet/10 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-violet/60 hover:bg-violet/15 hover:shadow-violet/30 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-violet/20 to-transparent" />
      <ArrowUp size={18} className="relative" />
    </a>
  );
}
