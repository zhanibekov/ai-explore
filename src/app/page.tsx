"use client";
import { useState } from "react";
import { parseJsonl } from "./utils/parseJsonl";
import { StreamEvent } from "./types/stream";
import { useStreamPlayer } from "./hooks/useStreamPlayer";
export default function Home() {
  const [events, setEvents] = useState<StreamEvent[]>([]);
  const [streamedText, setStreamedText] = useState("");
  const onEvent = (event: StreamEvent) => {
    if (event.event === "token") {
      setStreamedText((prev) => prev + event.data);
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
    <div className="">
      <input type="file" onChange={(f) => handleFileChange(f)} />
    </div>
  );
}
