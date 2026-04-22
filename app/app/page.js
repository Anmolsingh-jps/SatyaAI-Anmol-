'use client';
import { useState, useEffect } from 'react';
import ChatBox from '@/components/ChatBox';
import ResultCard from '@/components/ResultCard';
import Loader from '@/components/Loader';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    checkLimits();
  }, []);

  const checkLimits = () => {
    const stored = localStorage.getItem('satya_usage');
    const now = Date.now();
    const FIVE_HOURS = 5 * 60 * 60 * 1000;

    if (stored) {
      const { lastSearch, searches } = JSON.parse(stored);
      if (now - lastSearch > FIVE_HOURS) {
        localStorage.removeItem('satya_usage');
        setCount(0);
        setIsLocked(false);
      } else {
        setCount(searches);
        if (searches >= 5) setIsLocked(true);
      }
    }
  };

  const handleAnalyze = async (topic) => {
    if (isLocked) return;
    setLoading(true);
    setData(null);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ topic }),
      });
      const result = await res.json();
      setData(result);

      // Update Limits
      const newCount = count + 1;
      setCount(newCount);
      localStorage.setItem('satya_usage', JSON.stringify({
        lastSearch: Date.now(),
        searches: newCount
      }));
      if (newCount >= 5) setIsLocked(true);

    } catch (e) {
      alert("Error: Check API connection");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-6xl font-black italic tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500 mb-2">
          SATYA AI
        </h1>
        <p className="text-gray-400 uppercase tracking-widest text-xs font-bold">Verify. Explain. Viral.</p>
      </div>

      {/* Main UI */}
      <div className="space-y-8">
        <ChatBox onAnalyze={handleAnalyze} loading={loading} disabled={isLocked} />

        {isLocked && (
          <div className="glass p-8 border-yellow-500/50 bg-yellow-500/10 text-center animate-bounce">
            <h2 className="text-xl font-bold text-yellow-500 mb-2">Free Limit Reached! 🛑</h2>
            <p className="text-gray-300 mb-4">Come back in 5 hours or upgrade now.</p>
            <button className="bg-yellow-500 text-black px-8 py-3 rounded-full font-black hover:scale-105 transition-transform">
              UPGRADE ₹99
            </button>
          </div>
        )}

        {loading && <Loader />}
        {data && <ResultCard data={data} />}
      </div>

      <div className="fixed bottom-4 right-4 text-[10px] text-white/20 font-mono">
        USAGE: {count}/5
      </div>
    </main>
  );
}
