export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-purple-500/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-t-purple-500 border-r-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
      </div>
      <p className="text-purple-400 font-medium animate-pulse text-sm uppercase tracking-widest">Verifying Satya...</p>
    </div>
  );
}
