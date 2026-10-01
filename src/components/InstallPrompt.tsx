import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";
import logo from "../assets/logo.png";
import { useLanguage } from "../context/LanguageContext";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPrompt() {
  const { lang } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("pwa-install-dismissed");
    if (stored === "1") setDismissed(true);

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setTimeout(() => setVisible(true), 2500);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!deferredPrompt || dismissed || !visible) return null;

  const handleInstall = async () => {
    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setVisible(false);
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
    window.localStorage.setItem("pwa-install-dismissed", "1");
  };

  return (
    <div className="fixed bottom-24 left-1/2 z-40 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 animate-fade-up rounded-2xl border border-white/10 bg-surface/95 p-4 shadow-2xl shadow-violet/20 backdrop-blur-md sm:bottom-7 sm:left-7 sm:translate-x-0">
      <button
        onClick={handleDismiss}
        aria-label="Fermer"
        className="absolute right-3 top-3 text-white/40 transition-colors hover:text-white"
      >
        <X size={15} />
      </button>
      <div className="flex items-start gap-3 pr-5">
        <img src={logo} alt="" className="h-10 w-10 flex-shrink-0 object-contain" />
        <div>
          <p className="text-sm font-semibold text-white">
            {lang === "fr" ? "Installer le portfolio" : "Install the portfolio"}
          </p>
          <p className="mt-0.5 text-xs text-white/50">
            {lang === "fr"
              ? "Accède-y direct depuis ton écran d'accueil, comme une app."
              : "Access it right from your home screen, like an app."}
          </p>
        </div>
      </div>
      <button
        onClick={handleInstall}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-violet px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-violet-dark"
      >
        {lang === "fr" ? "Installer" : "Install"}
        <Download size={15} />
      </button>
    </div>
  );
}
