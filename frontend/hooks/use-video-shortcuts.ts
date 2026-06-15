"use client";

import { useEffect } from "react";

interface VideoShortcutsOptions {
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onMarkComplete: () => void;
  enabled?: boolean;
}

export function useVideoShortcuts({
  onPlayPause,
  onNext,
  onPrevious,
  onMarkComplete,
  enabled = true,
}: VideoShortcutsOptions) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) return;

      switch (e.key) {
        case " ":
          e.preventDefault();
          onPlayPause();
          break;
        case "ArrowRight":
          e.preventDefault();
          onNext();
          break;
        case "ArrowLeft":
          e.preventDefault();
          onPrevious();
          break;
        case "Enter":
          if (e.shiftKey) {
            e.preventDefault();
            onMarkComplete();
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enabled, onPlayPause, onNext, onPrevious, onMarkComplete]);
}
