export default function LoadingSpinner({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 mt-66">
      {/* Spinner */}
      <div className="w-10 h-10 border-4 border-[#73a5f5]/30
                      border-t-[#73a5f5]
                      rounded-full animate-spin" />

      {/* Text */}
      <p className="text-sm text-[#73a5f5] font-medium">
        {text}
      </p>
    </div>
  );
}
