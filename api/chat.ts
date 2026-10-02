import type { VercelRequest, VercelResponse } from "@vercel/node";
import { profile, projects, education, experience, services } from "../src/data/content.js";

export const config = {
  runtime: "nodejs",
  maxDuration: 60,
};

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

async function notifyByEmail(userMessage: string, reply: string) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return; // notifications not configured - chat still works fine without it

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: "Portfolio Chat <onboarding@resend.dev>",
        to: [profile.email],
        subject: "Nouveau message sur le chat de ton portfolio",
        html: `
          <div style="font-family: sans-serif; max-width: 480px;">
            <p><strong>Un visiteur a écrit :</strong></p>
            <p style="background:#f4f4f6;padding:12px;border-radius:8px;">${escapeHtml(userMessage)}</p>
            <p><strong>Réponse envoyée par l'assistant :</strong></p>
            <p style="background:#efeaff;padding:12px;border-radius:8px;">${escapeHtml(reply)}</p>
          </div>
        `,
      }),
    });
  } catch (err) {
    console.error("Email notification failed:", err);
    // never let a notification failure break the chat response
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildSystemPrompt(): string {
  const projectsList = projects
    .map((p) => `- ${p.title} (${p.tags.join(", ")}) : ${p.description}`)
    .join("\n");

  const educationList = education
    .map((e) => `- ${e.title.fr} - ${e.org} (${e.period})`)
    .join("\n");

  const experienceList = experience
    .map((e) => `- ${e.title.fr} - ${e.org} (${e.period})`)
    .join("\n");

  const servicesList = services.map((s) => `- ${s.title.fr} : ${s.description.fr}`).join("\n");

  return `Tu es l'assistant virtuel du portfolio de ${profile.name}, un développeur full-stack basé à ${profile.location}.
Tu réponds aux visiteurs du portfolio à sa place, de façon chaleureuse, concise et professionnelle, TOUJOURS en français sauf si le visiteur écrit en anglais (dans ce cas réponds en anglais).

Voici les informations factuelles à ta disposition sur ${profile.name} - ne réponds qu'avec ces informations, n'invente rien :

BIO : ${profile.bio}

FORMATION :
${educationList}

EXPÉRIENCE :
${experienceList}

PROJETS :
${projectsList}

SERVICES PROPOSÉS :
${servicesList}

CONTACT : email ${profile.email}, WhatsApp ${profile.phone}, GitHub ${profile.github}, LinkedIn ${profile.linkedin}

Règles :
- Reste bref (2-4 phrases sauf si on te demande un détail précis).
- Si on te demande quelque chose que tu ne sais pas (ex: disponibilités précises, tarifs exacts), invite la personne à contacter ${profile.name.split(" ")[0]} directement par email ou WhatsApp.
- Ne prétends jamais être ${profile.name} lui-même - tu es son assistant.
- Reste toujours poli et professionnel, même si le visiteur est familier ou taquin.
- N'utilise jamais de tiret cadratin (le long tiret) dans tes réponses : préfère une virgule, deux-points ou un tiret simple.`;
}

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
// "openrouter/free" picks an available free model on each request; override with OPENROUTER_MODEL if needed
const DEFAULT_MODEL = "openrouter/free";
const MAX_ATTEMPTS = 3;
const REQUEST_TIMEOUT_MS = 20_000;

// the chat shows plain text: drop markdown markers and long dashes the models like to add
function cleanReply(text: string): string {
  return text
    .replace(/```\w*\n?/g, "")
    .replace(/\*\*(.+?)\*\*/gs, "$1")
    .replace(/__(.+?)__/gs, "$1")
    .replace(/(^|[\s(])\*(?!\s)([^*\n]+?)\*(?=[\s).,!?:;]|$)/g, "$1$2")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*[-*]\s+/gm, "- ")
    .replace(/\[([^\]]+)\]\((https?:[^)]+)\)/g, "$1 ($2)")
    .replace(/\s*\u2014\s*/g, " - ")
    .trim();
}

// the random free router sometimes lands on a moderation model that answers "safe" / "unsafe S1"
function looksLikeModerationOutput(text: string): boolean {
  const t = text.trim().toLowerCase();
  if (!t) return true;
  if (t.length <= 80 && /^(safe|unsafe)\b/.test(t)) return true;
  if (t.length <= 200 && /\bunsafe\b/.test(t) && /\bs\d{1,2}\b/.test(t)) return true;
  if (t.startsWith("{") && /(safety|unsafe|violation|category)/.test(t)) return true;
  return false;
}

async function askAI(
  apiKey: string,
  system: string,
  messages: ChatMessage[],
): Promise<string | null> {
  const model = process.env.OPENROUTER_MODEL || DEFAULT_MODEL;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
      const response = await fetch(OPENROUTER_URL, {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "HTTP-Referer": "https://freud-joslin-bossou-porfolio.vercel.app",
          "X-Title": "Portfolio Freud Bossou",
        },
        body: JSON.stringify({
          model,
          max_tokens: 400,
          messages: [{ role: "system", content: system }, ...messages],
        }),
      });

      if (!response.ok) {
        console.error(`OpenRouter error (attempt ${attempt}):`, response.status, await response.text());
        continue; // the router may pick another model next time
      }

      const data = (await response.json()) as {
        choices?: { message?: { content?: string | null } }[];
      };
      const content = data.choices?.[0]?.message?.content;
      const reply = typeof content === "string" ? cleanReply(content) : "";

      if (!looksLikeModerationOutput(reply)) return reply;
      console.error(`Discarded unusable model output (attempt ${attempt}):`, reply.slice(0, 80));
    } catch (err) {
      console.error(`OpenRouter request failed (attempt ${attempt}):`, err);
    } finally {
      clearTimeout(timer);
    }
  }
  return null;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "Chat is not configured (missing API key)." });
    return;
  }

  try {
    const body = req.body as { messages?: ChatMessage[] };
    const messages = (Array.isArray(body?.messages) ? body.messages : [])
      .filter((m) => (m?.role === "user" || m?.role === "assistant") && typeof m.content === "string")
      .slice(-10)
      .map((m) => ({ role: m.role, content: m.content.slice(0, 1000) }));

    if (messages.length === 0) {
      res.status(400).json({ error: "Missing messages." });
      return;
    }

    const reply = await askAI(apiKey, buildSystemPrompt(), messages);
    if (!reply) {
      res.status(502).json({ error: "Upstream chat error." });
      return;
    }

    const lastUserMessage = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";
    await notifyByEmail(lastUserMessage, reply);

    res.status(200).json({ reply });
  } catch (err) {
    console.error("Chat handler error:", err);
    res.status(500).json({ error: "Internal error." });
  }
}
