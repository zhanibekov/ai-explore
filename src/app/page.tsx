"use client";
import { useState } from "react";
import { parseJsonl } from "./utils/parseJsonl";
import { StreamEvent } from "./types/stream";
import { useStreamPlayer } from "./hooks/useStreamPlayer";
import { STATUSES } from "./constants/statuses";
import { useVegaSpec } from "./hooks/useVegaSpec";
import { chartData } from "./constants/chartData";
import { VegaChart } from "./components/charts/VegaChart";
export default function Home() {
  const [events, setEvents] = useState<StreamEvent[]>([]);
  const [streamedText, setStreamedText] = useState("");
  const { spec, error } = useVegaSpec(streamedText);

  const finalSpec = spec
    ? JSON.parse(
        JSON.stringify({
          ...spec,
          data: { values: chartData },
        })
      )
    : null;

  const onEvent = (event: StreamEvent) => {
    if (event.event === "token") {
      setStreamedText((prev) => prev + event.data.delta);
    }
  };
  const { play, stop, status } = useStreamPlayer(events, onEvent);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const parsedJsonl = parseJsonl(e.target?.result as string);
        setEvents(parsedJsonl);
        setStreamedText("");
      };
      reader.readAsText(file);
    }
  };
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-3">
        <input type="file" onChange={handleFileChange} />
        <button
          onClick={play}
          disabled={status === STATUSES.STREAMING || events.length === 0}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          Play
        </button>
        <button
          onClick={stop}
          disabled={status !== STATUSES.STREAMING}
          className="px-4 py-2 bg-red-500 text-white rounded disabled:bg-gray-400"
        >
          Stop
        </button>
        <div className="text-sm">
          Status: <strong>{status}</strong>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <section className="border rounded p-3">
          <h2>Streaming output</h2>
          <pre className="whitespace-pre-wrap text-sm">{streamedText}</pre>
        </section>
        <section className="border rounded p-3">
          <h2>Vega chart preview</h2>
          {error ? (
            <div className="text-red-500">Error: {error}</div>
          ) : (
            <VegaChart spec={finalSpec} />
          )}
        </section>
      </div>
    </div>
  );
}
