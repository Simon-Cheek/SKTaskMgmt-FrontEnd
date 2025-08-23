export function formatDate(d: Date) {
  try {
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  } catch {
    const parsed = new Date(d as unknown as string);
    return isNaN(parsed.getTime())
      ? "—"
      : parsed.toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "2-digit",
        });
  }
}
