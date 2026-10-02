import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowLeft, ExternalLink } from "lucide-react";
import { projects } from "../data/content";
import { useLanguage } from "../context/LanguageContext";
import Reveal from "./Reveal";

import easyworkImg from "../assets/projects/easywork.jpg";
import geracImg from "../assets/projects/gerac.jpg";
import daxImg from "../assets/projects/dax.jpg";
import portfolioV1Img from "../assets/projects/portfolio-v1.jpg";

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.75 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.8 1.18 1.83 1.18 3.09 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.67.8.56C20.71 21.38 24 17.07 24 12 24 5.65 18.85.5 12 .5z" />
    </svg>
  );
}

const imageMap: Record<string, string> = {
  easywork: easyworkImg,
  gerac: geracImg,
  dax: daxImg,
  "portfolio-v1": portfolioV1Img,
};

export default function Projects() {
  const { t } = useLanguage();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });
  const [active, setActive] = useState(0);
  const total = projects.length;

  const step = () => {
    const [a, b] = cardRefs.current;
    return a && b ? b.offsetLeft - a.offsetLeft : 1;
  };

  // coverflow look driven by the scroll position: the closer a card is to the center, the bigger and brighter it gets
  const update = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    const s = step();
    let nearest = 0;
    let best = Infinity;

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const d = (card.offsetLeft + card.offsetWidth / 2 - center) / s;
      const abs = Math.min(Math.abs(d), 2);
      const rotate = Math.max(-34, Math.min(34, -d * 22));
      card.style.transform = `perspective(1000px) rotateY(${rotate}deg) scale(${1 - abs * 0.1})`;
      card.style.opacity = String(Math.max(0.35, 1 - abs * 0.3));
      card.style.zIndex = String(10 - Math.round(abs));
      card.dataset.active = abs < 0.5 ? "1" : "0";
      if (Math.abs(d) < best) {
        best = Math.abs(d);
        nearest = i;
      }
    });
    setActive((prev) => (prev === nearest ? prev : nearest));
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [update]);

  const goTo = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(total - 1, i));
    el.scrollTo({ left: clamped * step(), behavior: "smooth" });
  };

  // mouse drag (touch and trackpads already scroll natively)
  const onPointerDown = (e: React.PointerEvent) => {
    const el = scrollerRef.current;
    if (!el || e.pointerType !== "mouse" || e.button !== 0) return;
    drag.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft, moved: false };

    const onMove = (ev: PointerEvent) => {
      const dx = ev.clientX - drag.current.startX;
      if (Math.abs(dx) > 5) {
        if (!drag.current.moved) {
          drag.current.moved = true;
          el.style.scrollSnapType = "none";
          el.style.cursor = "grabbing";
        }
        el.scrollLeft = drag.current.startScroll - dx;
      }
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      drag.current.active = false;
      el.style.cursor = "";
      if (drag.current.moved) {
        const target = Math.round(el.scrollLeft / step());
        el.scrollTo({ left: Math.max(0, Math.min(total - 1, target)) * step(), behavior: "smooth" });
        setTimeout(() => (el.style.scrollSnapType = ""), 450);
        setTimeout(() => (drag.current.moved = false), 0);
      }
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  return (
    <section id="projets" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="section-eyebrow">{t.projects.eyebrow}</p>
              <h2 className="relative mt-2 inline-block text-3xl font-bold text-white sm:text-4xl">
                {t.projects.title}
                <span className="absolute -bottom-2 left-0 h-0.5 w-10 bg-gradient-to-r from-violet to-transparent" />
              </h2>
            </div>
            <a
              href="https://github.com/Freudbenvic"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-white/70 hover:border-violet/30 hover:text-white"
            >
              {t.projects.viewAll}
              <ArrowRight size={14} />
            </a>
          </div>
        </Reveal>
      </div>

      <Reveal delay={100}>
        <div
          ref={scrollerRef}
          role="region"
          aria-label={t.projects.title}
          tabIndex={0}
          onPointerDown={onPointerDown}
          onDragStart={(e) => e.preventDefault()}
          onClickCapture={(e) => {
            if (drag.current.moved) {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") goTo(active + 1);
            if (e.key === "ArrowLeft") goTo(active - 1);
          }}
          className="relative mt-8 flex cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto px-[calc(50%-min(39vw,170px))] py-8 outline-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {projects.map((project, i) => {
            const img = project.image ? imageMap[project.image] : undefined;
            const isActive = i === active;

            return (
              <article
                key={project.title}
                ref={(node) => {
                  cardRefs.current[i] = node;
                }}
                data-active={i === 0 ? "1" : "0"}
                onClick={() => !isActive && goTo(i)}
                className="flex h-[440px] w-[min(78vw,340px)] flex-shrink-0 snap-center select-none flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-xl shadow-black/30 will-change-transform data-[active=1]:border-violet/40 data-[active=1]:shadow-2xl data-[active=1]:shadow-violet/20"
              >
                <div className="relative h-44 flex-shrink-0 overflow-hidden">
                  {img ? (
                    <img src={img} alt={project.title} draggable={false} className="h-full w-full object-cover" />
                  ) : (
                    <div className={`flex h-full items-center justify-center bg-gradient-to-br ${project.gradient}`}>
                      <span className="px-4 text-center text-xl font-bold text-white/25">{project.title}</span>
                    </div>
                  )}
                  <span className="absolute left-3 top-3 rounded-full border border-violet/30 bg-bg/70 px-2.5 py-0.5 font-display text-xs font-bold text-violet-light backdrop-blur-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-semibold leading-snug text-white">{project.title}</h3>
                    <div className="flex flex-shrink-0 items-center gap-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Voir le code sur GitHub"
                          tabIndex={isActive ? 0 : -1}
                          onClick={(e) => e.stopPropagation()}
                          className="mt-0.5 text-white/40 transition-colors hover:text-violet-light"
                        >
                          <GithubIcon />
                        </a>
                      )}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Voir le projet"
                          tabIndex={isActive ? 0 : -1}
                          onClick={(e) => e.stopPropagation()}
                          className="mt-0.5 text-white/40 transition-colors hover:text-violet-light"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="mt-2.5 line-clamp-4 text-sm leading-relaxed text-white/55">{project.description}</p>
                  <div className="mt-auto flex flex-wrap gap-1.5 border-t border-white/10 pt-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-white/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-2 flex items-center justify-center gap-5">
          <button
            onClick={() => goTo(active - 1)}
            aria-label="Projet précédent"
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all hover:border-violet/40 hover:text-violet-light sm:flex"
          >
            <ArrowLeft size={15} />
          </button>
          <div className="flex items-center gap-2">
            {projects.map((p, i) => (
              <button
                key={p.title}
                onClick={() => goTo(i)}
                aria-label={`Aller au projet ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === active ? "w-6 bg-violet-light" : "w-1.5 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => goTo(active + 1)}
            aria-label="Projet suivant"
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all hover:border-violet/40 hover:text-violet-light sm:flex"
          >
            <ArrowRight size={15} />
          </button>
        </div>
      </Reveal>
    </section>
  );
}
