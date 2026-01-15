"use client";
import { useState } from "react";
import { parseJsonl } from "./utils/parseJsonl";
import { STATUSES } from "./constants/statuses";
import { StreamEvent } from "./types/stream";

export default function Home() {
  const [status, setStatus] = useState(STATUSES.IDLE);
  const [events, setEvents] = useState<StreamEvent[]>([]);
  const [streamedText, setStreamedText] = useState("");
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // const content = e.target?.result;
        // console.log(content);
        const parsedJsonl = parseJsonl(e.target?.result as string);
        setEvents(parsedJsonl);
        setStreamedText("");
        setStatus(STATUSES.IDLE);
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
