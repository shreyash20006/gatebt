"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, CheckCircle2, CircleAlert, Loader2 } from "lucide-react";

type State = "idle" | "loading" | "success" | "error";

export default function AnimatedDownloadButton({
  url,
  label = "Download PDF",
  onTrack,
}: {
  url: string | null;
  label?: string;
  onTrack?: () => void;
}) {
  const [state, setState] = useState<State>("idle");

  const handle = async () => {
    if (state !== "idle") return;
    if (!url) {
      setState("error");
      setTimeout(() => setState("idle"), 2000);
      return;
    }
    setState("loading");
    try {
      onTrack?.();
      await new Promise((r) => setTimeout(r, 700)); // brief UI transition
      setState("success");
      window.open(url, "_blank", "noopener,noreferrer");
      setTimeout(() => setState("idle"), 1200);
    } catch {
      setState("error");
      setTimeout(() => setState("idle"), 2000);
    }
  };

  const cfg = {
    idle: { bg: "#0B2A63", text: label, Icon: Download },
    loading: { bg: "#0B2A63", text: "Opening…", Icon: Loader2 },
    success: { bg: "#16a34a", text: "Ready!", Icon: CheckCircle2 },
    error: { bg: "#dc2626", text: "Try Again", Icon: CircleAlert },
  }[state];
  const Icon = cfg.Icon;

  return (
    <motion.button
      onClick={handle}
      disabled={state !== "idle"}
      whileTap={{ scale: 0.96 }}
      aria-live="polite"
      style={{ background: cfg.bg }}
      className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white font-semibold text-sm transition-colors disabled:cursor-default cursor-pointer"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={state}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="inline-flex items-center gap-2"
        >
          <Icon size={16} className={state === "loading" ? "animate-spin" : ""} />
          {cfg.text}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
