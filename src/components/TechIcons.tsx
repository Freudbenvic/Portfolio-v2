import type { ReactElement } from "react";

// Simplified brand mark SVGs (lucide-react dropped brand icons in recent versions)
// Each icon is 24x24 viewBox, single/multi path recognizable marks.

export function HtmlIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M3 2l1.6 18L12 22l7.4-2L21 2H3z" fill="#E44D26" />
      <path d="M12 4v16.4l6-1.65L19.3 4H12z" fill="#F16529" />
      <path d="M12 9H8.4l.2 2.5H12V14H8.9l.3 3 2.8.8V15H12V9z" fill="#FFFFFF" />
      <path d="M12 9h3.6l-.2 2.5H12V14h3.2l-.35 3.9L12 18.7V21.5l4.8-1.35.65-7.3.15-1.35H12V9z" fill="#EBEBEB" />
    </svg>
  );
}

export function CssIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M3 2l1.6 18L12 22l7.4-2L21 2H3z" fill="#1572B6" />
      <path d="M12 4v16.4l6-1.65L19.3 4H12z" fill="#33A9DC" />
      <path d="M12 9H8.35l.2 2.3H12v2.3H8.75l.3 3.4L12 17.9v-2.4l-2.5-.7-.15-1.7H12V9z" fill="#FFFFFF" />
      <path d="M12 9h3.65l-.2 2.3H12v2.3h3.25l-.35 3.6L12 17.9v2.4l4.75-1.3.75-8.4H12V9z" fill="#EBEBEB" />
    </svg>
  );
}

export function JsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="2" fill="#F7DF1E" />
      <path
        d="M12.3 17.1c.35.6.8 1.05 1.65 1.05.7 0 1.15-.35 1.15-.83 0-.58-.46-.78-1.24-1.12l-.42-.18c-1.23-.52-2.04-1.18-2.04-2.56 0-1.27.97-2.24 2.48-2.24 1.08 0 1.85.38 2.41 1.36l-1.32.85c-.29-.52-.6-.72-1.09-.72-.5 0-.81.31-.81.72 0 .5.31.7 1.04 1.02l.42.18c1.45.62 2.26 1.26 2.26 2.68 0 1.53-1.2 2.37-2.81 2.37-1.57 0-2.58-.75-3.08-1.73l1.4-.85zM6.5 17.2c.27.48.51.88 1.1.88.56 0 .91-.22.91-1.07v-5.51h1.7v5.54c0 1.76-1.03 2.56-2.53 2.56-1.36 0-2.14-.7-2.54-1.55l1.36-.85z"
        fill="#000000"
      />
    </svg>
  );
}

export function ReactIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="2.2" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1.3" fill="none">
        <ellipse cx="12" cy="12" rx="10" ry="4.2" />
        <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
      </g>
    </svg>
  );
}

export function TypescriptIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="2" fill="#3178C6" />
      <path
        d="M12.9 12.6H10v1.4h1.5v5.6H13v-5.6h1.5v-1.4h-1.6zM9.2 12.9c-.4-.25-.95-.4-1.6-.4-1.35 0-2.2.68-2.2 1.77 0 .87.53 1.32 1.53 1.7l.4.15c.6.23.85.4.85.75 0 .32-.28.53-.75.53-.5 0-.9-.2-1.2-.6l-1 .6c.42.75 1.15 1.1 2.15 1.1 1.35 0 2.28-.68 2.28-1.83 0-.87-.5-1.28-1.5-1.68l-.4-.16c-.55-.22-.78-.37-.78-.7 0-.28.25-.48.65-.48.4 0 .68.16.9.48l.97-.63a1.9 1.9 0 00-.7-.6z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function TailwindIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.75 1.9 1.36.98 1 2.1 2.14 4.6 2.14 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.75-1.9-1.36C15.62 7.14 14.5 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.75 1.9 1.36.98 1 2.1 2.14 4.6 2.14 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.75-1.9-1.36C10.62 13.14 9.5 12 7 12z"
        fill="#38BDF8"
      />
    </svg>
  );
}

export function FlutterIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M14.3 2L3 13.3l3.6 3.6L21.5 2h-7.2z" fill="#42A5F5" />
      <path d="M14.3 22l7.2-8H14l-4.2 4.2 4.5 4.5z" fill="#0D47A1" />
      <path d="M9.8 13.9l-3.2 3.2 3.6 3.6 3.2-3.2-3.6-3.6z" fill="#42A5F5" />
    </svg>
  );
}

export function PythonIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M11.9 2c-4 0-3.75 1.73-3.75 1.73v1.8h3.85v.55H6.4S4 5.8 4 9.9c0 4.1 2.1 3.96 2.1 3.96h1.25v-1.87s-.07-2.1 2.06-2.1h3.8s2 .03 2-1.93V4.2S15.5 2 11.9 2zM9.8 3.3a.7.7 0 110 1.4.7.7 0 010-1.4z"
        fill="#3776AB"
      />
      <path
        d="M12.1 22c4 0 3.75-1.73 3.75-1.73v-1.8h-3.85v-.55h5.6S20 18.2 20 14.1c0-4.1-2.1-3.96-2.1-3.96h-1.25v1.87s.07 2.1-2.06 2.1h-3.8s-2-.03-2 1.93v3.76S8.5 22 12.1 22zm2.1-1.3a.7.7 0 110-1.4.7.7 0 010 1.4z"
        fill="#FFD43B"
      />
    </svg>
  );
}

export function JavaIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M8.5 17.8s-1.1.65.8.86c2.3.27 3.47.23 6-.26 0 0 .67.42 1.6.78-5.7 2.44-12.9-.14-8.4-1.38zm-.68-3.1s-1.2.9.7 1.08c2.46.25 4.4.27 7.75-.37 0 0 .47.47 1.2.73-6.9 2.02-14.6.16-9.65-1.44z"
        fill="#5382A1"
      />
      <path
        d="M13.9 9.1c1.4 1.6-.37 3.05-.37 3.05s3.55-1.83 1.92-4.12c-1.52-2.13-2.7-3.2 3.65-6.83 0 0-9.98 2.5-5.2 7.9z"
        fill="#5382A1"
      />
      <path
        d="M17.7 19.6s.8.66-.87 1.17c-3.16.96-13.16 1.25-15.95.04-1-.43.87-1.03 1.46-1.16.6-.14.95-.11.95-.11-1.1-.77-7.1 1.52-3.05 2.18 11.05 1.8 20.15-.8 17.46-2.12zM9.2 11.4s-5.02 1.2-1.78 1.63c1.37.18 4.1.14 6.63-.06 2.07-.17 4.15-.53 4.15-.53s-.73.3-1.26.66c-5.1 1.34-14.94.72-12.1-.66 2.4-1.16 4.36-1.04 4.36-1.04z"
        fill="#5382A1"
      />
    </svg>
  );
}

export function SqlIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="5" rx="8" ry="3" fill="#4479A1" />
      <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" stroke="#4479A1" strokeWidth="1.6" fill="none" />
      <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" stroke="#4479A1" strokeWidth="1.6" fill="none" />
    </svg>
  );
}

export function GitIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M21.6 10.9L13.1 2.4a1.4 1.4 0 00-2 0l-1.7 1.7 2.15 2.15a1.66 1.66 0 012.1 2.1l2.07 2.07a1.66 1.66 0 111 .96L14 8.75v6.15a1.66 1.66 0 11-1.36 0V8.75a1.66 1.66 0 01-.9-2.18L9.6 4.43l-7.2 7.2a1.4 1.4 0 000 2l8.5 8.5a1.4 1.4 0 002 0l8.7-8.7a1.4 1.4 0 000-2.53z"
        fill="#F05032"
      />
    </svg>
  );
}

export function VercelIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 3l10 18H2L12 3z" fill="currentColor" />
    </svg>
  );
}

export function VscodeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M16.5 2.5L7 10.7 3.2 7.8 1.5 8.7v6.6l1.7.9L7 13.3l9.5 8.2 4-2V4.5l-4-2zM16.5 8.1v7.8L10.9 12l5.6-3.9zM3.2 12l1.6-1.2v2.4L3.2 12z"
        fill="#007ACC"
      />
    </svg>
  );
}

export function FigmaIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M9 2h4v5H9a2.5 2.5 0 010-5z" fill="#F24E1E" />
      <path d="M13 2h2.5a2.5 2.5 0 010 5H13V2z" fill="#FF7262" />
      <path d="M13 9.5h2.5a2.5 2.5 0 110 5H13v-5z" fill="#A259FF" />
      <path d="M9 9.5h4v5H9a2.5 2.5 0 010-5z" fill="#1ABCFE" />
      <path d="M9 17a2.5 2.5 0 105 0v-2.5H9V17z" fill="#0ACF83" />
    </svg>
  );
}

export function StarumlIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 2l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 16.7 6.1 20.1l1.3-6.6L2.5 8.9l6.6-.8L12 2z" fill="#F59E0B" />
      <path d="M12 2l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 16.7V2z" fill="#EA580C" />
    </svg>
  );
}

export const skillIconMap: Record<string, () => ReactElement> = {
  "React": ReactIcon,
  "TypeScript": TypescriptIcon,
  "Tailwind CSS": TailwindIcon,
  "JavaScript": JsIcon,
  "HTML / CSS": HtmlIcon,
  "Flutter / Dart": FlutterIcon,
  "Python / Django": PythonIcon,
  "Java": JavaIcon,
  "SQL": SqlIcon,
  "Git / GitHub": GitIcon,
  "Vercel": VercelIcon,
  "VS Code": VscodeIcon,
  "Figma": FigmaIcon,
  "StarUML": StarumlIcon,
};
