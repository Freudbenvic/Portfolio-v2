import { Mail, MapPin } from "lucide-react";
import { profile } from "../data/content";
import { useLanguage } from "../context/LanguageContext";
import Reveal from "./Reveal";

function WhatsappIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.47 14.38c-.29-.15-1.7-.84-1.97-.93-.26-.1-.46-.15-.65.15-.2.29-.75.93-.92 1.12-.17.2-.34.22-.63.08-.29-.15-1.22-.45-2.32-1.43-.86-.76-1.44-1.7-1.6-1.99-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.48.1-.2.05-.37-.02-.51-.08-.15-.65-1.56-.89-2.14-.23-.56-.47-.48-.65-.49h-.56c-.2 0-.51.07-.78.37-.26.29-1.02 1-1.02 2.43s1.05 2.82 1.19 3.01c.15.2 2.06 3.15 5 4.42.7.3 1.24.48 1.67.61.7.22 1.34.19 1.84.12.56-.08 1.7-.7 1.95-1.37.24-.68.24-1.26.17-1.38-.07-.12-.26-.2-.55-.34z" />
      <path d="M12.04 2C6.58 2 2.13 6.42 2.13 11.87c0 1.77.47 3.42 1.29 4.85L2 22l5.42-1.4a9.9 9.9 0 004.62 1.16h.01c5.46 0 9.9-4.42 9.9-9.87C21.96 6.44 17.51 2 12.04 2zm0 18.06h-.01a8.2 8.2 0 01-4.19-1.14l-.3-.18-3.11.8.83-3.02-.2-.31a8.16 8.16 0 01-1.25-4.34c0-4.51 3.68-8.19 8.24-8.19a8.2 8.2 0 015.83 2.42 8.13 8.13 0 012.4 5.78c0 4.52-3.68 8.19-8.24 8.19z" />
    </svg>
  );
}

export default function Contact() {
  const { t } = useLanguage();

  const whatsappNumber = profile.phone.replace(/[^\d]/g, "");

  const items = [
    { icon: Mail, label: t.contact.email, value: profile.email, href: `mailto:${profile.email}` },
    {
      icon: WhatsappIcon,
      label: "WhatsApp",
      value: profile.phone,
      href: `https://wa.me/${whatsappNumber}`,
      external: true,
    },
    { icon: MapPin, label: t.contact.location, value: profile.location },
  ];

  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="section-eyebrow">{t.contact.eyebrow}</p>
          <h2 className="relative mt-2 inline-block text-3xl font-bold text-white sm:text-4xl">
            {t.contact.title}
            <span className="absolute -bottom-2 left-0 h-0.5 w-10 bg-gradient-to-r from-violet to-transparent" />
          </h2>
          <p className="mt-4 max-w-lg text-white/60">{t.contact.subtitle}</p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {items.map(({ icon: Icon, label, value, href, external }, i) => {
            const Wrapper = href ? "a" : "div";
            return (
              <Reveal key={label} delay={i * 90}>
                <Wrapper
                  {...(href ? { href, ...(external ? { target: "_blank", rel: "noreferrer" } : {}) } : {})}
                  className="flex items-center gap-4 rounded-xl border border-white/10 bg-surface p-5 transition-colors hover:border-violet/30"
                >
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-violet/15 text-violet-light">
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-white/40">{label}</p>
                    <p className="mt-0.5 text-sm font-medium text-white">{value}</p>
                  </div>
                </Wrapper>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
