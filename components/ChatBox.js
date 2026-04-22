'use client';
import { useState } from 'react';

export default function ChatBox({ onAnalyze, loading, disabled }) {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (!input.trim() || loading || disabled) return;
    onAnalyze(input);
  };

  return (
    <div className="glass p-1 border-white/10 overflow-hidden focus-within:ring-2 ring-purple-500/50 transition-all">
      <div className="flex flex-col md:flex-row bg-black/20 rounded-[14px]">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={disabled ? "Limit reached!" : "Koi bhi news daalo..."}
          disabled={disabled || loading}
          className="flex-1 bg-transparent px-6 py-4 text-white outline-none placeholder:text-gray-500"
        />
        <button
          onClick={handleSubmit}
          disabled={disabled || loading || !input.trim()}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:opacity-50 px-8 py-4 font-bold text-white transition-all flex items-center justify-center gap-2"
        >
          {loading ? 'Thinking...' : 'Sach Check karo 🔍'}
        </button>
      </div>
    </div>
  );
}
