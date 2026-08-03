import { AxiosError } from 'axios';

export function getErrorMessage(error: unknown, fallback = 'Une erreur est survenue.'): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data as { message?: string | string[] } | undefined;
    if (Array.isArray(data?.message)) return data!.message.join(' ');
    if (typeof data?.message === 'string') return data.message;
    if (error.message) return error.message;
  }
  return fallback;
}
