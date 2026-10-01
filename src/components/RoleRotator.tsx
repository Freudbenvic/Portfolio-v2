import { useEffect, useRef, useState } from "react";

interface RoleRotatorProps {
  words: readonly string[];
  letterDelayMs?: number;
  holdMs?: number;
}

export default function RoleRotator({ words, letterDelayMs = 45, holdMs = 1600 }: RoleRotatorProps) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const word = words[index];
    // total time for the word to finish cascading in, then hold, then swap
    const revealDuration = word.length * letterDelayMs + 400;
    const swapAt = revealDuration + holdMs;

    const hideTimer = setTimeout(() => setVisible(false), swapAt);
    const nextTimer = setTimeout(() => {
      setIndex((i) => (i + 1) % words.length);
      setVisible(true);
    }, swapAt + 200);

    timers.current.push(hideTimer, nextTimer);
    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, words]);

  const word = words[index];

  return (
    <span className="inline-block min-h-[1.2em] text-violet-light">
      {visible &&
        word.split("").map((ch, i) => (
          <span
            key={`${index}-${i}`}
            className="letter-in inline-block"
            style={{ animationDelay: `${i * letterDelayMs}ms` }}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
    </span>
  );
}
