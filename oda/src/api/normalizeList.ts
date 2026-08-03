// Le back-end NestJS renvoie parfois un tableau brut, parfois un objet
// enveloppant (pagination, { data: [...] }, { items: [...] }, etc.).
// On normalise systématiquement ici pour que le reste du front n'ait
// jamais à gérer cette incertitude, et pour éviter les crashs
// "data.map is not a function" dans les tableaux.
export function normalizeList<T>(payload: unknown, context: string): T[] {
  if (Array.isArray(payload)) return payload as T[];
  if (payload && typeof payload === 'object') {
    const obj = payload as Record<string, unknown>;
    for (const key of ['data', 'items', 'results', 'users', 'apprenants', 'cohortes', 'formations']) {
      if (Array.isArray(obj[key])) return obj[key] as T[];
    }
  }
  console.warn(`[${context}] Réponse inattendue (tableau attendu) :`, payload);
  return [];
}
