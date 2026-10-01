import { GraduationCap, Briefcase } from "lucide-react";
import { education, experience, type TimelineItem } from "../data/content";
import { useLanguage } from "../context/LanguageContext";
import type { Language } from "../i18n/translations";
import Reveal from "./Reveal";

function TimelineBlock({ items, lang }: { items: TimelineItem[]; lang: Language }) {
  return (
    <div className="relative pl-6">
      <div className="absolute left-[3px] top-1 bottom-1 w-px bg-gradient-to-b from-violet/50 via-violet/20 to-transparent" />
      <div className="flex flex-col gap-8">
        {items.map((item, i) => (
          <Reveal key={i} delay={i * 100}>
            <div className="relative">
              <span className="absolute -left-[27px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-violet bg-bg" />
              <p className="text-xs font-medium uppercase tracking-wide text-violet-light">{item.period}</p>
              <h4 className="mt-1 text-base font-semibold text-white">{item.title[lang]}</h4>
              <p className="text-sm text-white/50">{item.org}</p>
              {item.bullets && (
                <ul className="mt-2 flex flex-col gap-1.5">
                  {item.bullets.map((b, bi) => (
                    <li key={bi} className="flex gap-2 text-sm leading-relaxed text-white/60">
                      <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-violet-light/70" />
                      {b[lang]}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export default function Parcours() {
  const { t, lang } = useLanguage();

  return (
    <section id="parcours" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="section-eyebrow">{t.parcours.eyebrow}</p>
          <h2 className="relative mt-2 inline-block text-3xl font-bold text-white sm:text-4xl">
            {t.parcours.title}
            <span className="absolute -bottom-2 left-0 h-0.5 w-10 bg-gradient-to-r from-violet to-transparent" />
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-14 md:grid-cols-2">
          <div>
            <Reveal delay={80}>
              <div className="mb-6 flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet/15 text-violet-light">
                  <GraduationCap size={17} />
                </div>
                <h3 className="text-lg font-semibold text-white">{t.parcours.education}</h3>
              </div>
            </Reveal>
            <TimelineBlock items={education} lang={lang} />
          </div>

          <div>
            <Reveal delay={80}>
              <div className="mb-6 flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet/15 text-violet-light">
                  <Briefcase size={17} />
                </div>
                <h3 className="text-lg font-semibold text-white">{t.parcours.experience}</h3>
              </div>
            </Reveal>
            <TimelineBlock items={experience} lang={lang} />
          </div>
        </div>
      </div>
    </section>
  );
}
