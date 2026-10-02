import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import logo from "../assets/logo.png";
import { useLanguage } from "../context/LanguageContext";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function ChatWidget() {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const greeting =
    lang === "fr"
      ? "👋 Salut ! Je suis l'assistant de Freud. Pose-moi une question sur son parcours, ses projets ou comment le contacter."
      : "👋 Hi! I'm Freud's assistant. Ask me about his background, projects, or how to reach him.";

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: "assistant", content: greeting }]);
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

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      if (!res.ok) throw new Error("bad response");
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            lang === "fr"
              ? "Oups, je n'arrive pas à répondre pour le moment. Contacte Freud directement par email ou WhatsApp en attendant !"
              : "Oops, I can't answer right now. Reach out to Freud directly by email or WhatsApp in the meantime!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

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
              <p className="text-sm font-semibold text-white">
                {lang === "fr" ? "Assistant Freud" : "Freud's Assistant"}
              </p>
              <p className="flex items-center gap-1 text-xs text-white/50">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {lang === "fr" ? "En ligne" : "Online"}
              </p>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-violet text-white"
                      : "border border-white/10 bg-bg text-white/85"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
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

          <div className="flex items-center gap-2 border-t border-white/10 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder={lang === "fr" ? "Écris ton message..." : "Type your message..."}
              className="flex-1 rounded-lg border border-white/10 bg-bg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-violet/40 focus:outline-none"
            />
            <button
              onClick={send}
              disabled={loading}
              aria-label="Envoyer"
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-violet text-white transition-colors hover:bg-violet-dark disabled:opacity-50"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
