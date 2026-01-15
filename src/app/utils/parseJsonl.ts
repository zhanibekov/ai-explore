import { StreamEvent } from "../types/stream";

export function parseJsonl(content: string): StreamEvent[] {
  const events: StreamEvent[] = [];
  const lines = content.split("\n").filter((line) => line.trim() !== "");

  for (const line of lines) {
    try {
      const parsed = JSON.parse(line);
      events.push(parsed);
    } catch (error) {
      console.error("Failed to parse line:", line, error);
    }
  }

  return events;
}
