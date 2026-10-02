import { ArrowRight, MessageCircle } from "lucide-react";
import { profile } from "../data/content";
import portrait from "../assets/portrait-full.png";
import { useLanguage } from "../context/LanguageContext";
import RoleRotator from "./RoleRotator";

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94z" />
    </svg>
  );
}
function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.75 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.8 1.18 1.83 1.18 3.09 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.67.8.56C20.71 21.38 24 17.07 24 12 24 5.65 18.85.5 12 .5z"/>
    </svg>
  );
}
function LinkedinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/>
    </svg>
  );
}
function WhatsappIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.47 14.38c-.29-.15-1.7-.84-1.97-.93-.26-.1-.46-.15-.65.15-.2.29-.75.93-.92 1.12-.17.2-.34.22-.63.08-.29-.15-1.22-.45-2.32-1.43-.86-.76-1.44-1.7-1.6-1.99-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.48.1-.2.05-.37-.02-.51-.08-.15-.65-1.56-.89-2.14-.23-.56-.47-.48-.65-.49h-.56c-.2 0-.51.07-.78.37-.26.29-1.02 1-1.02 2.43s1.05 2.82 1.19 3.01c.15.2 2.06 3.15 5 4.42.7.3 1.24.48 1.67.61.7.22 1.34.19 1.84.12.56-.08 1.7-.7 1.95-1.37.24-.68.24-1.26.17-1.38-.07-.12-.26-.2-.55-.34z" />
      <path d="M12.04 2C6.58 2 2.13 6.42 2.13 11.87c0 1.77.47 3.42 1.29 4.85L2 22l5.42-1.4a9.9 9.9 0 004.62 1.16h.01c5.46 0 9.9-4.42 9.9-9.87C21.96 6.44 17.51 2 12.04 2zm0 18.06h-.01a8.2 8.2 0 01-4.19-1.14l-.3-.18-3.11.8.83-3.02-.2-.31a8.16 8.16 0 01-1.25-4.34c0-4.51 3.68-8.19 8.24-8.19a8.2 8.2 0 015.83 2.42 8.13 8.13 0 012.4 5.78c0 4.52-3.68 8.19-8.24 8.19z" />
    </svg>
  );
}

const whatsappNumber = profile.phone.replace(/[^\d]/g, "");

const socialLinks = [
  { Icon: FacebookIcon, href: profile.facebook, label: "Facebook", color: "#1877F2" },
  { Icon: GithubIcon, href: `https://${profile.github}`, label: "GitHub", color: "#181717" },
  { Icon: LinkedinIcon, href: `https://${profile.linkedin}`, label: "LinkedIn", color: "#0A66C2" },
  { Icon: WhatsappIcon, href: `https://wa.me/${whatsappNumber}`, label: "WhatsApp", color: "#25D366" },
];

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="accueil" className="relative overflow-hidden pt-40 pb-24">
      {/* ambient glow */}
      <div className="pointer-events-none absolute right-0 top-10 h-[600px] w-[600px] animate-glow-pulse rounded-full bg-violet/25 blur-[130px]" />
      <div className="pointer-events-none absolute right-40 top-60 h-[300px] w-[300px] rounded-full bg-fuchsia-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-10 top-0 hidden h-full w-64 sm:block">
        <div className="absolute right-24 top-6 h-52 w-3 rotate-[24deg] rounded-full bg-gradient-to-b from-violet-light/70 via-violet/40 to-transparent blur-[1px]" />
        <div className="absolute right-4 top-52 h-40 w-3 rotate-[24deg] rounded-full bg-gradient-to-b from-violet/60 via-violet/30 to-transparent blur-[1px]" />
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-2">
        <div className="order-2 animate-fade-up md:order-1" style={{ animationDelay: "0ms" }}>
          <p className="mb-4 flex items-center gap-2 text-sm font-medium text-violet-light">
            <span className="h-px w-6 bg-violet-light" />
            {t.hero.badge}
          </p>

          <h1 className="font-display text-5xl font-bold leading-[1.1] text-white sm:text-6xl">
            {t.hero.title1}
            <br />
            <span className="bg-gradient-to-r from-violet-light to-violet bg-clip-text text-transparent">
              {t.hero.titleHighlight}
            </span>
          </h1>

          <p className="mt-4 flex flex-wrap items-center gap-x-2 font-display text-xl font-medium text-white/70 sm:text-2xl">
            {t.hero.roleTagPrefix} <RoleRotator words={t.hero.roles} />
          </p>

          <p className="mt-6 max-w-md text-white/60">{t.hero.subtitle}</p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#projets"
              className="flex items-center gap-2 rounded-lg bg-violet px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-violet-dark"
            >
              {t.hero.ctaPrimary}
              <ArrowRight size={16} />
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 rounded-lg border border-white/15 px-5 py-3 text-sm font-medium text-white/80 transition-colors hover:border-white/30 hover:text-white"
            >
              {t.hero.ctaSecondary}
              <MessageCircle size={15} />
            </a>
          </div>

          <div className="mt-10 flex items-center gap-3">
            {socialLinks.map(({ Icon, href, label, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-xl text-white transition-transform hover:-translate-y-1"
                style={{ backgroundColor: color }}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div className="relative order-1 flex justify-center animate-fade-in md:order-2" style={{ animationDelay: "200ms" }}>
          <div className="pointer-events-none absolute inset-0 rounded-full bg-violet/25 blur-[100px]" />
          <img
            src={portrait}
            alt={profile.name}
            className="relative z-10 h-[440px] w-auto object-contain object-bottom sm:h-[520px]"
          />
        </div>
      </div>
    </section>
  );
}
