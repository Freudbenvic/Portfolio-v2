interface TranslationShape {
  nav: {
    accueil: string;
    apropos: string;
    competences: string;
    parcours: string;
    services: string;
    projets: string;
    contact: string;
    downloadCV: string;
    install: string;
  };
  hero: {
    title1: string;
    titleHighlight: string;
    roleTagPrefix: string;
    roles: string[];
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    followMe: string;
    pillCode: string;
    pillMobile: string;
    pillAutomation: string;
  };
  about: {
    eyebrow: string;
    title: string;
    readMore: string;
    name: string;
    age: string;
    location: string;
    speciality: string;
  };
  skills: {
    eyebrow: string;
    title: string;
    all: string;
    frontend: string;
    backend: string;
    database: string;
    devops: string;
    design: string;
    modeling: string;
  };
  parcours: {
    eyebrow: string;
    title: string;
    education: string;
    experience: string;
  };
  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  projects: {
    eyebrow: string;
    title: string;
    viewAll: string;
    confidential: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    email: string;
    phone: string;
    location: string;
  };
  footer: {
    rights: string;
  };
}

export const translations: Record<"fr" | "en", TranslationShape> = {
  fr: {
    nav: {
      accueil: "Accueil",
      apropos: "À propos",
      competences: "Compétences",
      parcours: "Parcours",
      services: "Services",
      projets: "Projets",
      contact: "Contact",
      downloadCV: "Télécharger CV",
      install: "Installer l'application",
    },
    hero: {
      title1: "Freud",
      titleHighlight: "Joslin Bossou",
      roleTagPrefix: "Je suis",
      roles: ["développeur Full-Stack", "développeur Web", "développeur Mobile", "passionné d'IA", "créateur de bots"],
      subtitle: "Je conçois des solutions numériques modernes, performantes et adaptées aux besoins d'aujourd'hui.",
      ctaPrimary: "Découvrir mon travail",
      ctaSecondary: "Me contacter",
      followMe: "SUIVEZ-MOI",
      pillCode: "Code",
      pillMobile: "Mobile",
      pillAutomation: "Automatisation",
    },
    about: {
      eyebrow: "À propos",
      title: "Qui suis-je ?",
      readMore: "En savoir plus",
      name: "Nom",
      age: "Âge",
      location: "Localisation",
      speciality: "Spécialité",
    },
    skills: {
      eyebrow: "Compétences",
      title: "Mon stack technique",
      all: "Tout",
      frontend: "Frontend",
      backend: "Backend",
      database: "Bases de données",
      devops: "DevOps",
      design: "Design",
      modeling: "Modélisation",
    },
    parcours: {
      eyebrow: "Parcours",
      title: "Études & Expérience",
      education: "Formation",
      experience: "Expérience professionnelle",
    },
    services: {
      eyebrow: "Services",
      title: "Ce que je peux faire pour vous",
      subtitle: "Quelques domaines où je peux vous accompagner, de l'idée au produit fini.",
    },
    projects: {
      eyebrow: "Projets",
      title: "Mes réalisations",
      viewAll: "Voir tous les projets",
      confidential: "Projet confidentiel",
    },
    contact: {
      eyebrow: "Contact",
      title: "Parlons de votre projet",
      subtitle: "Vous avez un projet en tête ou une opportunité ? N'hésitez pas à me contacter.",
      email: "Email",
      phone: "Téléphone",
      location: "Localisation",
    },
    footer: {
      rights: "Tous droits réservés.",
    },
  },
  en: {
    nav: {
      accueil: "Home",
      apropos: "About",
      competences: "Skills",
      parcours: "Journey",
      services: "Services",
      projets: "Projects",
      contact: "Contact",
      downloadCV: "Download CV",
      install: "Install the app",
    },
    hero: {
      title1: "Freud",
      titleHighlight: "Joslin Bossou",
      roleTagPrefix: "I am",
      roles: ["a Full-Stack Developer", "a Web Developer", "a Mobile Developer", "an AI Enthusiast", "a Bot Builder"],
      subtitle: "I design modern, high-performing digital solutions tailored to today's needs.",
      ctaPrimary: "See my work",
      ctaSecondary: "Get in touch",
      followMe: "FOLLOW ME",
      pillCode: "Code",
      pillMobile: "Mobile",
      pillAutomation: "Automation",
    },
    about: {
      eyebrow: "About",
      title: "Who am I?",
      readMore: "Learn more",
      name: "Name",
      age: "Age",
      location: "Location",
      speciality: "Speciality",
    },
    skills: {
      eyebrow: "Skills",
      title: "My tech stack",
      all: "All",
      frontend: "Frontend",
      backend: "Backend",
      database: "Databases",
      devops: "DevOps",
      design: "Design",
      modeling: "Modeling",
    },
    parcours: {
      eyebrow: "Journey",
      title: "Education & Experience",
      education: "Education",
      experience: "Professional Experience",
    },
    services: {
      eyebrow: "Services",
      title: "What I can do for you",
      subtitle: "A few areas where I can help, from idea to finished product.",
    },
    projects: {
      eyebrow: "Projects",
      title: "My work",
      viewAll: "See all projects",
      confidential: "Confidential project",
    },
    contact: {
      eyebrow: "Contact",
      title: "Let's talk about your project",
      subtitle: "Have a project in mind or an opportunity? Feel free to reach out.",
      email: "Email",
      phone: "Phone",
      location: "Location",
    },
    footer: {
      rights: "All rights reserved.",
    },
  },
};

export type Language = "fr" | "en";
