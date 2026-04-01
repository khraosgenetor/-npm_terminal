"use client";

import React, { useRef, useEffect } from "react";
import { Line, Commands } from "./types";
import { useTerminal } from "./useTerminal";

interface TerminalProps {
  banner: Line[];
  commands: Commands;
  prompt?: string;
  className?: string;
}

export function Terminal({
  banner,
  commands,
  prompt = "$ ",
  className = "",
}: TerminalProps) {
  const { input, setInput, history, handleKey } = useTerminal(banner, commands);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const el = inputRef.current;
    if (el) el.setSelectionRange(el.value.length, el.value.length);
  }, [input]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  return (
    <div
      tabIndex={0}
      className={`min-h-[calc(100vh-57px)] bg-black text-white font-mono text-sm p-6 cursor-text ${className}`}
      onClick={() => inputRef.current?.focus()}
    >
      {history.map((entry, i) => (
        <div key={i} className="mb-1">
          {entry.cmd && (
            <p>
              <span className="text-green-400 whitespace-pre">{prompt}</span> {entry.cmd}
            </p>
          )}
          {entry.output.map((line, j) => (
            <pre key={j} className={`${line.color} font-mono leading-tight`}>
              {line.text}
            </pre>
          ))}
        </div>
      ))}
      <div className="flex items-center gap-2">
        <span className="text-green-400 whitespace-pre">{prompt}</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          className="bg-transparent border-none outline-none ring-0 focus:outline-none focus:ring-0 text-white font-mono text-sm flex-1 caret-white"
          style={{ outline: "none", boxShadow: "none" }}
        />
      </div>
      <div ref={bottomRef} />
    </div>
  );
}