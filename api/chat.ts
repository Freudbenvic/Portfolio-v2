import type { VercelRequest, VercelResponse } from "@vercel/node";
import { profile, projects, education, experience, services } from "../src/data/content";

export const config = {
  runtime: "nodejs",
};

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

async function notifyByEmail(userMessage: string, reply: string) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return; // notifications not configured — chat still works fine without it

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
    .map((e) => `- ${e.title.fr} — ${e.org} (${e.period})`)
    .join("\n");

  const experienceList = experience
    .map((e) => `- ${e.title.fr} — ${e.org} (${e.period})`)
    .join("\n");

  const servicesList = services.map((s) => `- ${s.title.fr} : ${s.description.fr}`).join("\n");

  return `Tu es l'assistant virtuel du portfolio de ${profile.name}, un développeur full-stack basé à ${profile.location}.
Tu réponds aux visiteurs du portfolio à sa place, de façon chaleureuse, concise et professionnelle, TOUJOURS en français sauf si le visiteur écrit en anglais (dans ce cas réponds en anglais).

Voici les informations factuelles à ta disposition sur ${profile.name} — ne réponds qu'avec ces informations, n'invente rien :

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
- Ne prétends jamais être ${profile.name} lui-même — tu es son assistant.
- Reste toujours poli et professionnel, même si le visiteur est familier ou taquin.`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "Chat is not configured (missing API key)." });
    return;
  }

  try {
    const { messages } = req.body as { messages: ChatMessage[] };

    if (!Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: "Missing messages." });
      return;
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 400,
        system: buildSystemPrompt(),
        messages: messages.slice(-10).map((m) => ({ role: m.role, content: m.content })),
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Anthropic API error:", errText);
      res.status(502).json({ error: "Upstream chat error." });
      return;
    }

    const data = (await response.json()) as {
      content?: { type: string; text?: string }[];
    };
    const reply =
      data.content?.find((block: { type: string }) => block.type === "text")?.text ??
      "Désolé, je n'ai pas pu générer de réponse.";

    const lastUserMessage = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";
    await notifyByEmail(lastUserMessage, reply);

    res.status(200).json({ reply });
  } catch (err) {
    console.error("Chat handler error:", err);
    res.status(500).json({ error: "Internal error." });
  }
}
