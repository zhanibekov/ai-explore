import { useRef, useState } from "react";
import { StreamEvent } from "../types/stream";
import { STATUSES } from "../constants/statuses";

export const useStreamPlayer = (
  events: StreamEvent[],
  onEvent: (event: StreamEvent) => void
) => {
  const [status, setStatus] = useState(STATUSES.IDLE);
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);
  const timer = useRef(0);

  const delay = () => {
    return Math.floor(Math.random() * 100) + 50;
  };

  const play = () => {
    console.log("PLAY");
    if (events.length === 0) {
      return;
    }
    if (status == STATUSES.STREAMING) {
      return;
    }
    setIndex(0);
    setStatus(STATUSES.STREAMING);
    indexRef.current = 0;
    timer.current = setTimeout(tick, delay()) as any;
  };

  const tick = () => {
    const i = indexRef.current;
    const ev = events[i];

    if (!ev) {
      stop();
      setStatus(STATUSES.DONE);
      return;
    }

    onEvent(ev);

    if (ev.event === "done") {
      stop();
      setStatus(STATUSES.DONE);
      return;
    }

    if (ev.event === "error") {
      stop();
      setStatus(STATUSES.ERROR);
      return;
    }

    indexRef.current = i + 1;
    timer.current = setTimeout(tick, delay()) as any;
  };

  const stop = () => {
    clearTimeout(timer.current);
    timer.current = 0;
    indexRef.current = 0;
    setIndex(0);
    setStatus(STATUSES.IDLE);
  };

  return { status, play, stop };
};
