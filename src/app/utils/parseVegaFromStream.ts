export function parseVegaFromStream(streamedText: string): unknown | null {
  if (!streamedText?.trim()) return null;

  let searchFrom = streamedText.length;

  while (searchFrom > 0) {
    const startJson = streamedText.lastIndexOf("```json", searchFrom);
    const startAny = streamedText.lastIndexOf("```", searchFrom);
    const start = Math.max(startJson, startAny);

    if (start === -1) return null;

    const isJsonFence = streamedText.startsWith("```json", start);
    const shift = isJsonFence ? 7 : 3;
    const contentStart = start + shift;

    const end = streamedText.indexOf("```", contentStart);
    if (end === -1) {
      searchFrom = start - 1;
      continue;
    }

    const blockText = streamedText.slice(contentStart, end).trimStart();
    const firstChar = blockText[0];
    const looksLikeJson = firstChar === "{" || firstChar === "[";
    if (!looksLikeJson) {
      searchFrom = start - 1;
      continue;
    }

    try {
      return JSON.parse(blockText.trim());
    } catch {
      searchFrom = start - 1;
      continue;
    }
  }

  return null;
}
