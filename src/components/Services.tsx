import { Code2, Smartphone, PenTool, Bot } from "lucide-react";
import { services } from "../data/content";
import { useLanguage } from "../context/LanguageContext";
import Reveal from "./Reveal";

const iconMap = {
  web: Code2,
  mobile: Smartphone,
  design: PenTool,
  automation: Bot,
};

export default function Services() {
  const { t, lang } = useLanguage();

  return (
    <section id="services" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="section-eyebrow">{t.services.eyebrow}</p>
          <h2 className="relative mt-2 inline-block text-3xl font-bold text-white sm:text-4xl">
            {t.services.title}
            <span className="absolute -bottom-2 left-0 h-0.5 w-10 bg-gradient-to-r from-violet to-transparent" />
          </h2>
          <p className="mt-4 max-w-lg text-white/60">{t.services.subtitle}</p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon];
            return (
              <Reveal key={service.icon} delay={i * 90} className="h-full">
                <div className="group flex h-full flex-col rounded-2xl border border-white/10 bg-surface p-6 transition-all hover:-translate-y-1 hover:border-violet/30 hover:shadow-xl hover:shadow-violet/10">
                  <div className="flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet/30 bg-violet/10 text-violet-light transition-colors group-hover:bg-violet/20">
                      <Icon size={20} />
                    </span>
                    <span className="font-display text-sm font-bold text-violet-light">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-6 text-center font-display text-lg font-bold text-white">{service.title[lang]}</h3>
                  <p className="mb-5 mt-3 text-center text-sm leading-relaxed text-white/55">{service.description[lang]}</p>

                  <p className="mt-auto border-t border-white/10 pt-4 text-center text-xs font-medium text-white/40">
                    {service.tags.map((tag) => `• ${tag}`).join(" ")}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
