export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#111111]">
      <div className="relative flex flex-col items-center">
        {/* Animated Æ Logo */}
        <div className="relative">
          {/* Pulse ring */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-24 w-24 animate-ping rounded-full border border-white/20" />
          </div>
          {/* Rotating ring */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-20 w-20 animate-spin rounded-full border-t border-white/40" style={{ animationDuration: '2s' }} />
          </div>
          {/* Logo */}
          <span className="relative text-6xl font-light text-white animate-pulse" style={{ animationDuration: '2s' }}>
            Æ
          </span>
        </div>
        {/* Loading text */}
        <div className="mt-8 flex items-center gap-1">
          <span className="text-xs tracking-[0.3em] text-white/50">LOADING</span>
          <span className="flex gap-1">
            <span className="h-1 w-1 animate-bounce rounded-full bg-white/50" style={{ animationDelay: '0ms' }} />
            <span className="h-1 w-1 animate-bounce rounded-full bg-white/50" style={{ animationDelay: '150ms' }} />
            <span className="h-1 w-1 animate-bounce rounded-full bg-white/50" style={{ animationDelay: '300ms' }} />
          </span>
        </div>
      </div>
    </div>
  )
}
