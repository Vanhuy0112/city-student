import type { IconName } from "@/data/catalog";

const paths: Record<IconName, React.ReactNode> = {
  math: <><rect x="5" y="3" width="14" height="18" rx="3"/><path d="M8 7h8M8 11h2m4 0h2m-8 4h2m4 0h2m-8 3h2m4 0h2"/></>,
  vietnamese: <><path d="M12 5c-3-2-7-2-10-1v15c4-1 7-1 10 1 3-2 6-2 10-1V4c-3-1-7-1-10 1Zm0 0v15"/><path d="M5 8h4m6 0h4M5 12h4m6 0h4"/></>,
  english: <><path d="M3 4h18v13H9l-6 4V4Z"/><path d="m7 13 3-6 3 6m-5-2h4m4-4v6m2-6v6"/></>,
  science: <><path d="M9 3h6m-5 0v7l-6 9a1 1 0 0 0 1 2h14a1 1 0 0 0 1-2l-6-9V3M7 15h10"/><path d="M10 18h.1M14 13h.1"/></>,
  geography: <><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18M5 7h14M5 17h14"/></>,
  art: <><path d="M12 3a9 9 0 1 0 0 18h2a2 2 0 0 0 1-4 2 2 0 0 1 1-4h2a3 3 0 0 0 3-3c0-4-4-7-9-7Z"/><circle cx="7" cy="9" r="1"/><circle cx="12" cy="7" r="1"/><circle cx="17" cy="9" r="1"/><circle cx="6" cy="14" r="1"/></>,
  home: <><path d="m3 10 9-7 9 7v11H3V10Z"/><path d="M9 21v-8h6v8"/></>,
  game: <><path d="M7 7h10a4 4 0 0 1 4 3l1 7a3 3 0 0 1-5 2l-3-3h-4l-3 3a3 3 0 0 1-5-2l1-7a4 4 0 0 1 4-3Z"/><path d="M5 11h6m-3-3v6m8-3h.1m3 2h.1"/></>,
  star: <path d="m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6Z"/>,
  flag: <><path d="M5 22V3m0 0c5-4 9 4 15 0v11c-6 4-10-4-15 0"/></>,
  arrow: <path d="M4 12h16m-6-6 6 6-6 6"/>,
  menu: <path d="M4 6h16M4 12h16M4 18h16"/>,
  close: <path d="m6 6 12 12M6 18 18 6"/>,
  check: <path d="m5 12 5 5L20 7"/>,
  sound: <><path d="M4 9h4l5-5v16l-5-5H4V9Zm12-1a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/></>,
  mute: <><path d="M4 9h4l5-5v16l-5-5H4V9Zm12 0 5 6m-5 0 5-6"/></>,
  shield: <><path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6l9-4Z"/><path d="m8 11 3 3 5-5"/></>,
  book: <><path d="M4 3h13a3 3 0 0 1 3 3v15H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Zm0 13h16M8 7h8m-8 4h5"/></>,
  trophy: <><path d="M7 3h10v7a5 5 0 0 1-10 0V3Zm0 2H3v3a4 4 0 0 0 4 4m10-7h4v3a4 4 0 0 1-4 4m-5 3v6m-5 0h10"/></>,
};

export default function Icon({ name, size = 22, className = "" }: { name: IconName; size?: number; className?: string }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}
