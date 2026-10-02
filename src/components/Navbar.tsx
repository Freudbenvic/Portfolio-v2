import { useState, useEffect } from "react";
import { Download, Menu, Smartphone, X } from "lucide-react";
import logo from "../assets/logo.png";
import { useLanguage } from "../context/LanguageContext";
import { useInstallPrompt } from "../hooks/useInstallPrompt";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("accueil");
  const [scrolled, setScrolled] = useState(false);
  const { lang, t } = useLanguage();
  const { canInstall, install } = useInstallPrompt();

  const links = [
    { key: "accueil", label: t.nav.accueil, href: "#accueil" },
    { key: "apropos", label: t.nav.apropos, href: "#apropos" },
    { key: "competences", label: t.nav.competences, href: "#competences" },
    { key: "parcours", label: t.nav.parcours, href: "#parcours" },
    { key: "services", label: t.nav.services, href: "#services" },
    { key: "projets", label: t.nav.projets, href: "#projets" },
    { key: "contact", label: t.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // mobile menu folds back as soon as the page is scrolled
  useEffect(() => {
    if (!open) return;
    const startY = window.scrollY;
    const onScroll = () => {
      if (Math.abs(window.scrollY - startY) > 8) setOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.key))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const top = visible.reduce((a, b) => (a.intersectionRatio > b.intersectionRatio ? a : b));
          setActive(top.target.id);
        }
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center">
      <nav
        className={`transition-all duration-200 ease-out ${
          scrolled
            ? "mt-3 w-[96%] max-w-5xl rounded-full border border-white/10 bg-surface/90 px-5 py-2.5 shadow-xl shadow-black/20 backdrop-blur-lg"
            : "mt-0 w-full rounded-none border-b border-white/5 bg-bg/80 backdrop-blur-md"
        }`}
      >
        <div
          className={`mx-auto flex items-center justify-between whitespace-nowrap transition-all duration-200 ${
            scrolled ? "w-full gap-4" : "w-full max-w-6xl gap-4 px-6 py-4"
          }`}
        >
        <a href="#accueil" className="flex items-center gap-2.5">
          <img
            src={logo}
            alt="Freud Bossou"
            className={`object-contain transition-all duration-200 ${scrolled ? "h-7 w-7" : "h-9 w-9"}`}
          />
          <span className="hidden font-display font-extrabold uppercase tracking-tight sm:inline">
            <span
              className="bg-gradient-to-r from-white to-violet-light bg-clip-text text-transparent"
            >
              FREUD
            </span>{" "}
            <span className="text-violet">BENVIC</span>
          </span>
        </a>

        <ul className={`hidden items-center lg:flex ${scrolled ? "gap-4" : "gap-6"} transition-all duration-200`}>
          {links.map((link) => (
            <li key={link.key}>
              <a
                href={link.href}
                onClick={() => setActive(link.key)}
                className={`nav-link text-sm transition-colors ${
                  active === link.key ? "text-white" : "text-white/60 hover:text-white"
                }`}
              >
                {link.label}
                {active === link.key && (
                  <span className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-violet transition-all duration-300" />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">

          <a
            href="/cv-freud-benvic.pdf"
            download
            className={`flex items-center gap-2 rounded-full border border-violet/40 bg-violet/10 text-sm font-medium text-violet-light transition-all duration-200 hover:bg-violet/20 ${
              scrolled ? "px-3 py-1.5" : "px-4 py-2"
            }`}
          >
            {t.nav.downloadCV}
            <Download size={15} />
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href="/cv-freud-benvic.pdf"
            download
            className="flex items-center gap-1.5 rounded-full border border-violet/40 bg-violet/10 px-3 py-1.5 text-xs font-medium text-violet-light"
          >
            {t.nav.downloadCV}
            <Download size={14} />
          </a>
          <button className="text-white" onClick={() => setOpen((o) => !o)} aria-label="Menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        </div>
      </nav>

      {open && (
        <div className="absolute inset-x-0 top-full mx-auto mt-2 w-[94%] max-w-4xl rounded-2xl border border-white/10 bg-bg px-6 py-4 shadow-xl lg:hidden">
          <ul className="flex flex-col gap-4">
            {links.map((link) => (
              <li key={link.key}>
                <a
                  href={link.href}
                  onClick={() => {
                    setActive(link.key);
                    setOpen(false);
                  }}
                  className="text-white/80"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/cv-freud-benvic.pdf"
                download
                onClick={() => setOpen(false)}
                className="mt-1 flex items-center gap-2 text-violet-light"
              >
                {t.nav.downloadCV}
                <Download size={15} />
              </a>
            </li>
            {canInstall && (
              <li>
                <button
                  onClick={() => {
                    setOpen(false);
                    install();
                  }}
                  className="flex items-center gap-2 text-white/80"
                >
                  {t.nav.install}
                  <Smartphone size={15} />
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
