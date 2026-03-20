"use client";

import { useState, useEffect } from "react";
import styles from "./Hero.module.css";

interface TypingAnimationProps {
  text: string;
  delay?: number;
  className?: string;
}

export default function TypingAnimation({
  text,
  delay = 0,
  className,
}: TypingAnimationProps) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) {
      setDone(true);
      return;
    }
    const timeout = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, 60);
    return () => clearTimeout(timeout);
  }, [started, displayed, text]);

  if (!started) return null;

  return (
    <span className={className}>
      {displayed}
      <span className={`${styles.typingCursor} ${done ? styles.typingCursorBlink : ""}`}>
        |
      </span>
    </span>
  );
}
