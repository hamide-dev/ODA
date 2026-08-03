const STYLES: Record<string, string> = {
  ADMIN: 'bg-ink text-white border-ink',
  APPRENANT: 'bg-brand-100 text-brand-700 border-brand-100',
  // Statuts de formation
  OUVERTE: 'bg-brand-100 text-brand-700 border-brand-100',
  EN_COURS: 'bg-ink text-white border-ink',
  TERMINEE: 'bg-white text-ink/60 border-ink/20',
  BROUILLON: 'bg-white text-ink/40 border-ink/10',
  ARCHIVEE: 'bg-white text-ink/40 border-ink/10',
};

const LABELS: Record<string, string> = {
  OUVERTE: 'Ouverte',
  EN_COURS: 'En cours',
  TERMINEE: 'Terminée',
  BROUILLON: 'Brouillon',
  ARCHIVEE: 'Archivée',
};

export function Badge({ value }: { value: string }) {
  const style = STYLES[value] ?? 'bg-white text-ink/70 border-ink/15';
  const label = LABELS[value] ?? value;
  return (
    <span className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-semibold ${style}`}>
      {label}
    </span>
  );
}
