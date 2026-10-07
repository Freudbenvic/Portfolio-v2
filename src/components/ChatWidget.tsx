import { useEffect, useRef, useState } from "react";
import { Mail, MessageCircle, Sparkles, X, Send } from "lucide-react";
import logo from "../assets/logo.webp";
import { useLanguage } from "../context/LanguageContext";
import { profile } from "../data/content";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  contact?: boolean; // notice with email / WhatsApp buttons
  help?: boolean; // the /aide answer (rendered from the current language)
  greeting?: boolean; // the welcome message, shown with a clickable /aide hint
  local?: boolean; // handled in the browser: never sent to the API, never counted as a question
}

const MAX_INPUT = 300; // characters per question
const MAX_QUESTIONS = 15; // questions per visit
const COOLDOWN_MS = 3000; // minimum delay between two messages
const HELP_COMMANDS = ["/aide", "/help", "/?"];

function ContactActions() {
  const whatsapp = profile.phone.replace(/[^\d]/g, "");
  const cls =
    "flex items-center gap-1.5 rounded-lg border border-violet/30 bg-violet/10 px-3 py-1.5 text-xs font-medium text-violet-light transition-colors hover:bg-violet/20";
  return (
    <div className="mt-2.5 flex flex-wrap gap-2">
      <a href={`mailto:${profile.email}`} className={cls}>
        <Mail size={13} />
        Email
      </a>
      <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer" className={cls}>
        <MessageCircle size={13} />
        WhatsApp
      </a>
    </div>
  );
}

export default function ChatWidget() {
  const { lang } = useLanguage();
  const fr = lang === "fr";
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const greeting = fr
    ? "👋 Salut ! Je suis l'assistant de Freud. Pose-moi une question sur son parcours, ses projets ou comment le contacter."
    : "👋 Hi! I'm Freud's assistant. Ask me about his background, projects, or how to reach him.";

  const suggestions = fr
    ? [
        "Qui est Freud ?",
        "Quel est son parcours ?",
        "Quelles compétences maîtrise-t-il ?",
        "Quels projets a-t-il réalisés ?",
        "Quels services propose-t-il ?",
        "Comment le contacter ?",
      ]
    : [
        "Who is Freud?",
        "What is his background?",
        "Which skills does he have?",
        "Which projects has he built?",
        "Which services does he offer?",
        "How can I contact him?",
      ];

  const questions = messages.filter((m) => m.role === "user" && !m.local).length;
  const limitReached = questions >= MAX_QUESTIONS;

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: "assistant", content: greeting, local: true, greeting: true }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // on phones the chat folds back as soon as the page behind it is scrolled
  // (not while typing: the on-screen keyboard can trigger scroll events)
  useEffect(() => {
    if (!open) return;
    const phone = window.matchMedia("(max-width: 767px)");
    const startY = window.scrollY;
    const onScroll = () => {
      if (!phone.matches) return;
      if (panelRef.current?.contains(document.activeElement)) return;
      if (Math.abs(window.scrollY - startY) > 8) setOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const notice = (frText: string, enText: string): ChatMessage => ({
    role: "assistant",
    content: fr ? frText : enText,
    contact: true,
  });

  // "/aide" and friends are answered here, instantly, without calling the API
  const runCommand = (text: string) => {
    const isHelp = HELP_COMMANDS.includes(text.toLowerCase());
    setInput("");
    setMessages((m) => [
      ...m,
      { role: "user", content: text, local: true },
      isHelp
        ? { role: "assistant", content: "", help: true, local: true }
        : {
            role: "assistant",
            local: true,
            content: fr
              ? "Je ne connais pas cette commande. Tape /aide pour voir ce que je peux faire."
              : "I don't know that command. Type /help to see what I can do.",
          },
    ]);
  };

  const submit = async (raw: string) => {
    const text = raw.trim();
    if (!text || loading) return;
    if (text.startsWith("/")) {
      runCommand(text);
      return;
    }
    if (cooldown || limitReached) return;

    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    setCooldown(true);
    setTimeout(() => setCooldown(false), COOLDOWN_MS);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.filter((m) => !m.contact && !m.local).map(({ role, content }) => ({ role, content })),
        }),
      });

      if (res.status === 429) {
        setMessages((m) => [
          ...m,
          notice(
            "Tu as envoyé beaucoup de messages en peu de temps. Pour continuer, contacte Freud directement :",
            "You've sent a lot of messages in a short time. To continue, reach out to Freud directly:",
          ),
        ]);
        return;
      }
      if (!res.ok) throw new Error("bad response");

      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        notice(
          "Oups, je n'arrive pas à répondre pour le moment. Contacte Freud directement :",
          "Oops, I can't answer right now. Reach out to Freud directly:",
        ),
      ]);
    } finally {
      setLoading(false);
    }
  };

  const chipsDisabled = loading || cooldown || limitReached;

  const helpContent = (
    <div>
      <p className="font-medium text-white">{fr ? "Voici ce que je peux faire pour toi :" : "Here is what I can do for you:"}</p>
      <ul className="mt-2 list-disc space-y-1 pl-4 text-white/75">
        {(fr
          ? [
              "Te présenter Freud et son parcours",
              "Détailler ses compétences et ses outils",
              "Te parler de ses projets",
              "Expliquer les services qu'il propose",
              "Te donner ses contacts",
            ]
          : [
              "Introduce Freud and his background",
              "Detail his skills and tools",
              "Tell you about his projects",
              "Explain the services he offers",
              "Give you his contact details",
            ]
        ).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="mt-2 text-xs text-white/50">
        {fr
          ? "Je réponds uniquement aux questions sur Freud et son portfolio. Choisis une suggestion ou écris la tienne :"
          : "I only answer questions about Freud and his portfolio. Pick a suggestion or write your own:"}
      </p>
      <div className="mt-2.5 flex flex-wrap gap-2">
        {suggestions.map((q) => (
          <button
            key={q}
            onClick={() => submit(q)}
            disabled={chipsDisabled}
            className="rounded-full border border-violet/30 bg-violet/10 px-3 py-1 text-left text-xs text-violet-light transition-colors hover:bg-violet/20 disabled:opacity-40"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Chat"
        className="fixed bottom-7 right-24 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-violet/30 bg-violet text-white shadow-lg shadow-violet/30 transition-transform hover:-translate-y-1 sm:right-24"
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
      </button>

      {open && (
        <div ref={panelRef} className="fixed bottom-24 right-6 z-40 flex h-[28rem] w-[calc(100%-3rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-2xl shadow-black/30 sm:right-24">
          <div className="flex items-center gap-3 border-b border-white/10 bg-violet/10 px-4 py-3">
            <img src={logo} alt="" className="h-8 w-8 object-contain" />
            <div>
              <p className="text-sm font-semibold text-white">{fr ? "Assistant Freud" : "Freud's Assistant"}</p>
              <p className="flex items-center gap-1 text-xs text-white/50">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {fr ? "En ligne" : "Online"}
              </p>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`rounded-xl px-3 py-2 text-sm leading-relaxed ${m.help ? "max-w-[92%]" : "max-w-[80%]"} ${
                    m.role === "user"
                      ? "bg-violet text-white"
                      : "border border-white/10 bg-bg text-white/85"
                  }`}
                >
                  {m.help ? helpContent : m.content}
                  {m.contact && <ContactActions />}
                  {m.greeting && (
                    <button
                      onClick={() => runCommand(fr ? "/aide" : "/help")}
                      className="mt-2.5 flex items-center gap-1.5 rounded-full border border-violet/40 bg-violet/15 px-3 py-1.5 text-left text-xs font-medium text-violet-light transition-colors hover:bg-violet/25"
                    >
                      <Sparkles size={13} className="flex-shrink-0" />
                      <span>
                        <span className="font-semibold">{fr ? "/aide" : "/help"}</span>
                        {fr ? " : voir ce que je peux faire" : ": see what I can do"}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            ))}
            {limitReached && !loading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-xl border border-white/10 bg-bg px-3 py-2 text-sm leading-relaxed text-white/85">
                  {fr
                    ? "On a bien discuté ! Pour aller plus loin, contacte Freud directement :"
                    : "We've had a good chat! To go further, reach out to Freud directly:"}
                  <ContactActions />
                </div>
              </div>
            )}
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-bg px-3 py-2">
                  <span className="h-1.5 w-1.5 animate-soft-pulse rounded-full bg-violet-light" />
                  <span className="h-1.5 w-1.5 animate-soft-pulse rounded-full bg-violet-light" style={{ animationDelay: "0.2s" }} />
                  <span className="h-1.5 w-1.5 animate-soft-pulse rounded-full bg-violet-light" style={{ animationDelay: "0.4s" }} />
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-white/10 p-3">
            {input.length >= MAX_INPUT - 60 && (
              <p className="mb-1 text-right text-[10px] text-white/40">
                {input.length}/{MAX_INPUT}
              </p>
            )}
            <div className="flex items-center gap-2">
              <input
                value={input}
                maxLength={MAX_INPUT}
                disabled={limitReached}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submit(input)}
                placeholder={
                  limitReached
                    ? fr
                      ? "Limite de la conversation atteinte"
                      : "Conversation limit reached"
                    : fr
                      ? "Écris ton message ou /aide..."
                      : "Type your message or /help..."
                }
                className="flex-1 rounded-lg border border-white/10 bg-bg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-violet/40 focus:outline-none disabled:opacity-50"
              />
              <button
                onClick={() => submit(input)}
                disabled={loading || limitReached || (cooldown && !input.trim().startsWith("/"))}
                aria-label="Envoyer"
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-violet text-white transition-colors hover:bg-violet-dark disabled:opacity-50"
              >
                <Send size={15} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
