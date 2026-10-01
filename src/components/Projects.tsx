import { useEffect, useRef, useState } from "react";
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

const AUTOPLAY_MS = 6000;
const SWIPE_THRESHOLD = 40;

// circular offset of card i relative to the active one, e.g. -2 -1 0 1 2
function getOffset(i: number, active: number, total: number) {
  let d = (((i - active) % total) + total) % total;
  if (d > total / 2) d -= total;
  return d;
}

export default function Projects() {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const total = projects.length;
  const goTo = (i: number) => setIndex(((i % total) + total) % total);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % total), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [total, index, paused]);

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) > SWIPE_THRESHOLD) goTo(delta < 0 ? index + 1 : index - 1);
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

        <Reveal delay={100}>
          <div
            className="relative mt-10 h-[480px] overflow-hidden"
            style={{ perspective: "1200px" }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
            onTouchEnd={onTouchEnd}
          >
            {projects.map((project, i) => {
              const d = getOffset(i, index, total);
              const abs = Math.abs(d);
              const isCenter = d === 0;
              const visible = abs <= 2;
              const sign = Math.sign(d);
              const shift = abs === 0 ? 0 : abs === 1 ? 68 : 118;
              const scale = abs === 0 ? 1 : abs === 1 ? 0.86 : 0.74;
              const opacity = abs === 0 ? 1 : abs === 1 ? 0.6 : 0.3;
              const img = project.image ? imageMap[project.image] : undefined;

              return (
                <article
                  key={project.title}
                  onClick={() => !isCenter && visible && goTo(i)}
                  aria-hidden={!isCenter}
                  className={`absolute left-1/2 top-1/2 flex h-[440px] w-[78%] max-w-[340px] flex-col overflow-hidden rounded-2xl border bg-surface transition-all duration-500 ease-out ${
                    isCenter
                      ? "border-violet/40 shadow-2xl shadow-violet/20"
                      : "cursor-pointer border-white/10 shadow-xl shadow-black/30"
                  }`}
                  style={{
                    transform: `translate(${-50 + sign * shift}%, -50%) rotateY(${-sign * 22}deg) scale(${scale})`,
                    opacity: visible ? opacity : 0,
                    zIndex: 10 - abs,
                    pointerEvents: visible ? "auto" : "none",
                  }}
                >
                  <div className="relative h-44 flex-shrink-0 overflow-hidden">
                    {img ? (
                      <img src={img} alt={project.title} className="h-full w-full object-cover" />
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
                            tabIndex={isCenter ? 0 : -1}
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
                            tabIndex={isCenter ? 0 : -1}
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

          <div className="mt-6 flex items-center justify-center gap-5">
            <button
              onClick={() => goTo(index - 1)}
              aria-label="Projet précédent"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all hover:border-violet/40 hover:text-violet-light"
            >
              <ArrowLeft size={16} />
            </button>
            <div className="flex items-center gap-2">
              {projects.map((p, i) => (
                <button
                  key={p.title}
                  onClick={() => goTo(i)}
                  aria-label={`Aller au projet ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-6 bg-violet-light" : "w-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => goTo(index + 1)}
              aria-label="Projet suivant"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all hover:border-violet/40 hover:text-violet-light"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
