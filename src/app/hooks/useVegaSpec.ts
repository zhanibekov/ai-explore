"use client";
import { useEffect, useState } from "react";
import { parseVegaFromStream } from "../utils/parseVegaFromStream";
import { validateVegaSpec } from "../utils/validateVegaSpec";

export const useVegaSpec = (streamedText: string) => {
  const [spec, setSpec] = useState<unknown | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!streamedText.trim()) {
      setSpec(null);
      setError(null);
      return;
    }

    const candidateSpec = parseVegaFromStream(streamedText);
    if (candidateSpec === null) {
      setSpec(null);
      setError(null);
      return;
    }

    const validationError = validateVegaSpec(candidateSpec);
    if (validationError) {
      setSpec(null);
      setError(validationError);
      return;
    }
    setSpec(candidateSpec);
    setError(null);
  }, [streamedText]);

  return { spec, error };
};
