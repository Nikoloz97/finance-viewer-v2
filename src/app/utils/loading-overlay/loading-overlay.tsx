export default function LoadingOverlay() {
  return (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-md z-10">
      <div className="flex flex-col items-center gap-2">
        <div className="h-6 w-6 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
        <p className="text-white text-sm font-medium">Loading...</p>
      </div>
    </div>
  );
}
