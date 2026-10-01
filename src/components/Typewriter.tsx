import { useEffect, useState } from "react";

interface TypewriterProps {
  words: readonly string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseMs?: number;
}

export default function Typewriter({
  words,
  typingSpeed = 100,
  deletingSpeed = 70,
  pauseMs = 2000,
}: TypewriterProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");

  useEffect(() => {
    const current = words[wordIndex % words.length];

    if (phase === "typing") {
      if (text.length < current.length) {
        const t = setTimeout(() => setText(current.slice(0, text.length + 1)), typingSpeed);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("pausing"), pauseMs);
      return () => clearTimeout(t);
    }

    if (phase === "pausing") {
      const t = setTimeout(() => setPhase("deleting"), pauseMs);
      return () => clearTimeout(t);
    }

    // deleting
    if (text.length > 0) {
      const t = setTimeout(() => setText(current.slice(0, text.length - 1)), deletingSpeed);
      return () => clearTimeout(t);
    }
    setPhase("typing");
    setWordIndex((i) => (i + 1) % words.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, phase, wordIndex, words]);

  return (
    <span className="bg-gradient-to-r from-violet-light to-violet bg-clip-text text-transparent">
      {text}
      <span className="typewriter-cursor text-violet-light">|</span>
    </span>
  );
}
