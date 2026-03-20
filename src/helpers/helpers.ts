export function formatRuntime(runtime?: number | null): string {
  if (!runtime) return 'N/A';

  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  if (hours && minutes) return `${hours}h ${minutes}m`;
  if (hours) return `${hours}h`;
  return `${minutes}m`;
}

// Rating stars
export function getStarRating(vote?: number | null) {
  if (!vote) return 0;

  return Math.round(vote / 2);
}
