"use client";

import { useEffect, useRef } from "react";

export const VegaChart = ({ spec }: { spec: unknown | null }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || !spec) return;

    let view: any;

    containerRef.current.innerHTML = "";

    import("vega-embed")
      .then(({ default: embed }) => {
        return embed(containerRef.current!, spec, { actions: false });
      })
      .then((res) => {
        view = res.view;
      })
      .catch((err) => {
        console.error("Vega embed error:", err);
      });

    return () => {
      if (view) {
        view.finalize();
      }
    };
  }, [spec]);

  return <div ref={containerRef} />;
};
