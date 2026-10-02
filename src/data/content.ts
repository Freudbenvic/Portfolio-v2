export interface Project {
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  link?: string;
  github?: string;
  image?: string;
}

export const projects: Project[] = [
  {
    title: "Easy Work",
    description:
      "Plateforme SaaS d'édition et de transformation d'images par IA : suppression d'arrière-plan, amélioration de photo, restauration, génération d'images - le tout en quelques clics. Projet en cours de développement.",
    tags: ["React", "Django REST", "PostgreSQL", "IA"],
    gradient: "from-blue-600/30 via-slate-900/20 to-black",
    image: "easywork",
    github: "https://github.com/Freudbenvic/Easy-Work",
  },
  {
    title: "GERAC",
    description:
      "Plateforme web de gestion des recrutements et concours : gestion des offres et candidatures, des dossiers et du processus de recrutement, ainsi que des jurys, résultats et paiements.",
    tags: ["React", "Django", "PostgreSQL"],
    gradient: "from-violet-600/30 via-violet-900/20 to-black",
    image: "gerac",
    github: "https://github.com/Freudbenvic/GERAC-Frontend",
  },
  {
    title: "Dax - Bot Telegram Intelligent",
    description:
      "Bot d'automatisation et de recherche de contenu via l'API Telegram.",
    tags: ["Python", "Telegram API"],
    gradient: "from-purple-600/20 via-slate-900/40 to-black",
    image: "dax",
    github: "https://github.com/Freudbenvic/Dax",
  },
  {
    title: "Application Guest Houses",
    description:
      "Plateforme mobile de mise en relation entre propriétaires et locataires, avec gestion fluide des annonces.",
    tags: ["Flutter", "Dart"],
    gradient: "from-indigo-600/20 via-slate-900/40 to-black",
  },
  {
    title: "Portfolio professionnel",
    description:
      "Interface responsive mettant en avant compétences et projets, déployée en production.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vercel"],
    gradient: "from-fuchsia-600/20 via-slate-900/40 to-black",
    link: "https://freud-joslin-bossou-porfolio.vercel.app",
    github: "https://github.com/Freudbenvic/Portfolio-v2",
  },
  {
    title: "Portfolio (v1)",
    description:
      "Première version de mon portfolio personnel - l'ancêtre de la version actuelle.",
    tags: ["HTML", "CSS", "JavaScript", "React"],
    gradient: "from-cyan-600/20 via-slate-900/40 to-black",
    image: "portfolio-v1",
    link: "https://portfolio-sv6g.vercel.app",
    github: "https://github.com/Freudbenvic/Portfolio",
  },
];

export interface Skill {
  name: string;
  color: string;
  category: "frontend" | "backend" | "database" | "devops" | "design" | "modeling";
}

export const skills: Skill[] = [
  { name: "React", color: "#61DAFB", category: "frontend" },
  { name: "TypeScript", color: "#3178C6", category: "frontend" },
  { name: "Tailwind CSS", color: "#38BDF8", category: "frontend" },
  { name: "JavaScript", color: "#F7DF1E", category: "frontend" },
  { name: "HTML / CSS", color: "#E34F26", category: "frontend" },
  { name: "Flutter / Dart", color: "#02569B", category: "frontend" },
  { name: "Python / Django", color: "#0C4B33", category: "backend" },
  { name: "SQL / PostgreSQL", color: "#4479A1", category: "database" },
  { name: "Git / GitHub", color: "#F05032", category: "devops" },
  { name: "Vercel", color: "#ffffff", category: "devops" },
  { name: "VS Code", color: "#007ACC", category: "devops" },
  { name: "Figma", color: "#A259FF", category: "design" },
  { name: "StarUML", color: "#F59E0B", category: "modeling" },
];

export const profile = {
  name: "Freud Joslin Bossou",
  age: 19,
  location: "Cotonou, Bénin",
  speciality: "Développement Web & Mobile",
  email: "freudbenvic@gmail.com",
  phone: "+229 01 40 12 23 00",
  linkedin: "linkedin.com/in/freud-joslin-bossou",
  github: "github.com/Freudbenvic",
  facebook: "https://www.facebook.com/share/1HHNHH1Mc6/",
  bio: "Jeune diplômé en Informatique de Gestion, je me suis découvert une vraie passion pour le développement dès mes premiers cours d'algorithmique. Durant mes trois années de formation à l'IUT de Parakou, j'ai eu l'occasion de parcourir plusieurs technologies et langages : Java, Python, C++, le développement web, les bases de données, la modélisation UML... un vrai terrain de jeu pour comprendre ce qui me plaisait vraiment.\n\nEntre toutes ces découvertes, je me suis particulièrement familiarisé avec l'écosystème JavaScript et React côté frontend, ainsi qu'avec Django côté backend. D'où ma spécialisation aujourd'hui en développement web et mobile, avec une attention particulière portée à la qualité du code et à l'expérience utilisateur.\n\nMon stage à la Direction Générale du Budget m'a permis de mettre ces compétences à l'épreuve sur un vrai projet d'envergure, GERAC, en apprenant à travailler en équipe sur une plateforme utilisée en conditions réelles. Aujourd'hui, je continue à explorer de nouvelles technologies - Flutter pour le mobile, l'automatisation avec Python - toujours avec la même curiosité qui m'a lancé dans ce domaine.",
  status: "Stagiaire en Génie Logiciel et Développement - DGB",
};

export interface TimelineItem {
  title: { fr: string; en: string };
  org: string;
  period: string;
  bullets?: { fr: string; en: string }[];
}

export const education: TimelineItem[] = [
  {
    title: { fr: "Licence Informatique de Gestion", en: "Bachelor's in Business Computing" },
    org: "IUT - Université de Parakou",
    period: "Sept. 2023 - Juillet 2026",
    bullets: [
      { fr: "Algorithmique, Java, Python, C++, SQL, Réseaux", en: "Algorithms, Java, Python, C++, SQL, Networks" },
    ],
  },
  {
    title: { fr: "Baccalauréat série D", en: "High School Diploma (Science track)" },
    org: "CEG2 Glazoué",
    period: "Juillet 2023",
  },
];

export const experience: TimelineItem[] = [
  {
    title: { fr: "Stagiaire en Génie Logiciel et Développement", en: "Software Engineering & Development Intern" },
    org: "Direction de l'Informatique - Direction Générale du Budget (DGB), Ministère de l'Économie et des Finances, Cotonou",
    period: "Juin 2026 - Août 2026",
    bullets: [
      {
        fr: "Développement de GERAC, plateforme de gestion des recrutements et concours pour le secteur de la santé publique.",
        en: "Development of GERAC, a recruitment and competitive exam management platform for the public healthcare sector.",
      },
      {
        fr: "Gestion des offres et candidatures, des dossiers et du processus de recrutement, des jurys, résultats et paiements.",
        en: "Managed job postings and applications, candidate files and recruitment workflow, juries, results and payments.",
      },
      {
        fr: "Frontend React, backend Django REST Framework, base de données PostgreSQL.",
        en: "React frontend, Django REST Framework backend, PostgreSQL database.",
      },
    ],
  },
];

export interface Service {
  title: { fr: string; en: string };
  description: { fr: string; en: string };
  tags: string[];
  icon: "web" | "mobile" | "design" | "automation";
}

export const services: Service[] = [
  {
    title: { fr: "Développement Web", en: "Web Development" },
    description: {
      fr: "Sites et applications web sur-mesure, du frontend au backend - rapides, propres et faciles à maintenir.",
      en: "Custom websites and web apps, from frontend to backend - fast, clean and easy to maintain.",
    },
    tags: ["React", "TypeScript", "Django REST"],
    icon: "web",
  },
  {
    title: { fr: "Développement Mobile", en: "Mobile Development" },
    description: {
      fr: "Applications mobiles cross-platform avec Flutter, pour Android et iOS à partir d'une seule base de code.",
      en: "Cross-platform mobile apps with Flutter, for Android and iOS from a single codebase.",
    },
    tags: ["Flutter", "Dart"],
    icon: "mobile",
  },
  {
    title: { fr: "UI/UX Design", en: "UI/UX Design" },
    description: {
      fr: "Maquettes et prototypes d'interfaces claires, cohérentes et pensées pour l'utilisateur.",
      en: "Mockups and prototypes for clear, consistent, user-centered interfaces.",
    },
    tags: ["Figma"],
    icon: "design",
  },
  {
    title: { fr: "Automatisation & Bots", en: "Automation & Bots" },
    description: {
      fr: "Bots et scripts pour automatiser les tâches répétitives et gagner du temps au quotidien.",
      en: "Bots and scripts to automate repetitive tasks and save time day to day.",
    },
    tags: ["Python"],
    icon: "automation",
  },
];
