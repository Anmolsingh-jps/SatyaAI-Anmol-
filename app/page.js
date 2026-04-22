"use client";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const askAI = async () => {
    if (!input) return;

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    setResponse(data.reply);
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
      <h1>🔥 Satya AI</h1>

      <textarea
        placeholder="News ya topic daalo..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "100%", height: 100 }}
      />

      <button onClick={askAI} style={{ marginTop: 10 }}>
        Generate
      </button>

      <div style={{ marginTop: 20 }}>
        <h3>Result:</h3>
        <p>{response}</p>
      </div>
    </div>
  );
}