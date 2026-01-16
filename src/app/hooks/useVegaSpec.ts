import { useEffect, useState } from "react";
import { parseVegaFromStream } from "../utils/parseVegaFromStream";

const useVegaSpec = (streamedText: string) => {
  const [spec, setSpec] = useState<unknown | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!streamedText) {
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
  }, [streamedText]);
};
