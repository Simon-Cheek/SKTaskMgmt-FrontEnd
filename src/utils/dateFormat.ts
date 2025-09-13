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

export function parseLocalDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day); // local midnight
}

export function getTodayLocal(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export function validateDueDate(
  due: Date,
  today: Date = getTodayLocal()
): string | null {
  if (isNaN(due.getTime())) return "Due Date is not valid!";
  if (due < today) return "Due Date cannot be in the past!";
  return null;
}
