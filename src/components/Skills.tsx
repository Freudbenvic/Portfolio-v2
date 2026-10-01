import { useState } from "react";
import { skills, type Skill } from "../data/content";
import { useLanguage } from "../context/LanguageContext";
import { VscodeIcon, StarumlIcon } from "./TechIcons";
import Reveal from "./Reveal";

import reactIcon from "../assets/icons/react.svg";
import typescriptIcon from "../assets/icons/typescript.svg";
import tailwindIcon from "../assets/icons/tailwindcss.svg";
import javascriptIcon from "../assets/icons/javascript.svg";
import html5Icon from "../assets/icons/html5.svg";
import cssIcon from "../assets/icons/css.svg";
import flutterIcon from "../assets/icons/flutter.svg";
import dartIcon from "../assets/icons/dart.svg";
import pythonIcon from "../assets/icons/python.svg";
import djangoIcon from "../assets/icons/django.svg";
import postgresqlIcon from "../assets/icons/postgresql.svg";
import gitIcon from "../assets/icons/git.svg";
import githubIcon from "../assets/icons/github-dark.svg";
import figmaIcon from "../assets/icons/figma.svg";
import vercelIcon from "../assets/icons/vercel-dark.svg";

// each skill maps to one or more real brand icon files (shown side by side for combined skills)
const iconMap: Record<string, string[]> = {
  "React": [reactIcon],
  "TypeScript": [typescriptIcon],
  "Tailwind CSS": [tailwindIcon],
  "JavaScript": [javascriptIcon],
  "HTML / CSS": [html5Icon, cssIcon],
  "Flutter / Dart": [flutterIcon, dartIcon],
  "Python / Django": [pythonIcon, djangoIcon],
  "SQL / PostgreSQL": [postgresqlIcon],
  "Git / GitHub": [gitIcon, githubIcon],
  "Vercel": [vercelIcon],
  "Figma": [figmaIcon],
};

const categoryOrder: Skill["category"][] = ["frontend", "backend", "database", "devops", "design", "modeling"];

function SkillIcon({ name }: { name: string }) {
  const icons = iconMap[name];
  if (icons) {
    return (
      <>
        {icons.map((src, idx) => (
          <img key={idx} src={src} alt="" className="h-10 w-10 object-contain" />
        ))}
      </>
    );
  }
  if (name === "VS Code") return <VscodeIcon />;
  if (name === "StarUML") return <StarumlIcon />;
  return <span className="h-3 w-3 rounded-full bg-violet-light" />;
}

export default function Skills() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<"all" | Skill["category"]>("all");

  const categoryLabels: Record<Skill["category"], string> = {
    frontend: t.skills.frontend,
    backend: t.skills.backend,
    database: t.skills.database,
    devops: t.skills.devops,
    design: t.skills.design,
    modeling: t.skills.modeling,
  };

  // keep the category order when showing everything
  const visible = [...skills]
    .filter((s) => filter === "all" || s.category === filter)
    .sort((a, b) => categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category));

  const pillClass = (active: boolean) =>
    `flex-shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 ${
      active
        ? "border-violet bg-violet text-white shadow-lg shadow-violet/30"
        : "border-white/10 bg-white/5 text-white/60 hover:border-violet/40 hover:text-white"
    }`;

  return (
    <section id="competences" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="section-eyebrow">{t.skills.eyebrow}</p>
          <h2 className="relative mt-2 inline-block text-3xl font-bold text-white sm:text-4xl">
            {t.skills.title}
            <span className="absolute -bottom-2 left-0 h-0.5 w-10 bg-gradient-to-r from-violet to-transparent" />
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <div
            className="-mx-6 mt-10 flex gap-2.5 overflow-x-auto px-6 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
            role="group"
            aria-label={t.skills.title}
          >
            <button onClick={() => setFilter("all")} aria-pressed={filter === "all"} className={pillClass(filter === "all")}>
              {t.skills.all}
            </button>
            {categoryOrder.map((cat, i) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                aria-pressed={filter === cat}
                className={pillClass(filter === cat)}
              >
                {String(i + 1).padStart(2, "0")} — {categoryLabels[cat]}
              </button>
            ))}
          </div>
        </Reveal>

        <div key={filter} className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {visible.map((skill, i) => (
            <div
              key={skill.name}
              className="animate-fade-up flex flex-col items-center rounded-2xl border border-white/10 bg-surface px-4 py-7 text-center transition-all hover:-translate-y-1 hover:border-violet/30 hover:shadow-lg hover:shadow-violet/10"
              style={{ animationDelay: `${i * 45}ms`, animationFillMode: "both" }}
            >
              <div className="flex h-12 items-center justify-center gap-2 [&_svg]:h-10 [&_svg]:w-10">
                <SkillIcon name={skill.name} />
              </div>
              <p className="mt-4 text-sm font-semibold text-white">{skill.name}</p>
              <p className="mt-1 text-xs text-white/40">{categoryLabels[skill.category]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
