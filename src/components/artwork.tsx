export function Artwork({ name, className = "" }: { name: string; className?: string }) {
  return <svg viewBox="0 0 200 180" aria-hidden="true" className={className}><use href={`/illustrations.svg#${name}`} /></svg>;
}
