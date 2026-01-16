export function validateVegaSpec(spec: unknown): string | null {
  if (typeof spec !== "object" || spec === null) {
    return "Spec is not an object.";
  }
  const obj = spec as Record<string, unknown>;

  if (!obj["mark"]) {
    return 'Spec is missing required "mark" property.';
  }

  if (!obj["encoding"]) {
    return 'Spec is missing required "encoding" property.';
  }

  return null;
}
