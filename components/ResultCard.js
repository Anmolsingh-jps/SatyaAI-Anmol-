'use client';

export default function ResultCard({ data }) {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Caption copied!');
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Reality Check Header */}
      <div className={`glass p-6 border-l-4 ${data.realityCheck.status.includes('Real') ? 'border-green-500' : 'border-red-500'}`}>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl font-bold uppercase tracking-tighter italic">
            Status: {data.realityCheck.status}
          </span>
        </div>
        <p className="text-gray-300 text-lg">{data.realityCheck.reason}</p>
      </div>

      {/* Explanation */}
      <div className="glass p-6">
        <h3 className="text-purple-400 font-bold mb-2 flex items-center gap-2">✨ Simple Hindi</h3>
        <p className="text-white text-lg leading-relaxed font-light">{data.explanation}</p>
      </div>

      {/* Conversation */}
      <div className="glass p-6 bg-gradient-to-br from-purple-900/20 to-transparent">
        <h3 className="text-blue-400 font-bold mb-4 uppercase text-xs tracking-widest">The Funny Conversation</h3>
        <div className="whitespace-pre-wrap text-gray-200 italic font-medium leading-relaxed">
           "{data.conversation}"
        </div>
      </div>

      {/* Captions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.captions.map((cap, i) => (
          <div key={i} className="glass p-4 relative group hover:border-purple-500/50 transition-all">
            <p className="text-sm text-gray-300 mb-4">{cap}</p>
            <button 
              onClick={() => copyToClipboard(cap)}
              className="text-[10px] uppercase font-bold text-purple-400 hover:text-white"
            >
              Copy Caption
            </button>
          </div>
        ))}
      </div>

      <div className="text-center py-4 opacity-50 font-mono text-sm">
        {data.branding}
      </div>
    </div>
  );
}
