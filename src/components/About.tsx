import { ArrowRight } from "lucide-react";
import { profile } from "../data/content";
import { useLanguage } from "../context/LanguageContext";
import Reveal from "./Reveal";
import editorialPhoto from "../assets/about/freud-editorial.jpg";

export default function About() {
  const { t } = useLanguage();
  const paragraphs = profile.bio.split("\n\n");

  return (
    <section id="apropos" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="section-eyebrow">{t.about.eyebrow}</p>
          <h2 className="relative mt-2 inline-block text-3xl font-bold text-white sm:text-4xl">
            {t.about.title}
            <span className="absolute -bottom-2 left-0 h-0.5 w-10 bg-gradient-to-r from-violet to-transparent" />
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_280px]">
          <Reveal delay={100} className="order-2 lg:order-1">
            <div className="flex max-w-2xl flex-col gap-4">
              {paragraphs.map((p, i) => (
                <p key={i} className="leading-relaxed text-white/60">
                  {p}
                </p>
              ))}
            </div>
            <a
              href="#projets"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-violet-light hover:text-white"
            >
              {t.about.readMore}
              <ArrowRight size={14} />
            </a>
          </Reveal>

          <Reveal delay={150} className="order-1 lg:order-2">
            <div className="mx-auto h-64 w-52 overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-xl shadow-violet/10 sm:h-72 sm:w-60 lg:mx-0 lg:h-full lg:w-full">
              <img
                src={editorialPhoto}
                alt={profile.name}
                className="h-full w-full object-cover grayscale"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
