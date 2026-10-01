import { useEffect, useRef, useState } from "react";
import { Globe } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

// On touch screens there is no hover: tap the globe to reveal the toggle,
// which folds back by itself after a short idle time.
const AUTO_CLOSE_MS = 3500;

export default function LanguageSwitch() {
  const { lang, toggleLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
  };

  const armTimerIfTouch = (e: React.MouseEvent) => {
    const type = (e.nativeEvent as PointerEvent).pointerType;
    if (type === "touch" || type === "pen") {
      clearTimer();
      timerRef.current = setTimeout(() => setOpen(false), AUTO_CLOSE_MS);
    }
  };

  // tap / click outside closes it
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const isFr = lang === "fr";

  return (
    <div
      ref={rootRef}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") {
          clearTimer();
          setOpen(true);
        }
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") setOpen(false);
      }}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!rootRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
      className={`fixed right-0 top-24 z-40 flex items-center rounded-full border border-r-0 border-violet/30 bg-surface/90 pr-1.5 shadow-lg shadow-black/30 backdrop-blur-md transition-transform duration-300 ease-out sm:top-1/3 ${
        open ? "translate-x-0" : "translate-x-[calc(100%-2.25rem)] sm:translate-x-[calc(100%-2.75rem)]"
      }`}
    >
      <button
        type="button"
        aria-label="Language"
        aria-expanded={open}
        onClick={(e) => {
          setOpen(true);
          armTimerIfTouch(e);
        }}
        className="flex h-11 w-9 flex-shrink-0 items-center justify-center text-violet-light sm:w-11"
      >
        <Globe size={18} />
      </button>

      <button
        type="button"
        role="switch"
        aria-checked={isFr}
        aria-label={isFr ? "Passer en anglais" : "Switch to French"}
        onClick={(e) => {
          toggleLang();
          armTimerIfTouch(e);
        }}
        className="relative ml-1 grid h-8 w-[88px] flex-shrink-0 grid-cols-2 items-center rounded-full border border-white/10 bg-white/5 p-1"
      >
        <span
          aria-hidden="true"
          className={`absolute left-1 top-1 h-6 w-10 rounded-full bg-violet shadow-md shadow-violet/40 transition-transform duration-300 ease-out ${
            isFr ? "translate-x-10" : "translate-x-0"
          }`}
        />
        <span className={`relative z-10 text-center text-[11px] font-bold transition-colors ${!isFr ? "text-white" : "text-white/50"}`}>
          EN
        </span>
        <span className={`relative z-10 text-center text-[11px] font-bold transition-colors ${isFr ? "text-white" : "text-white/50"}`}>
          FR
        </span>
      </button>
    </div>
  );
}
