import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#111111] flex flex-col items-center justify-center px-6 text-center">
      {/* Large 404 */}
      <div className="relative mb-8">
        <span className="text-[12rem] md:text-[20rem] font-extralight text-white/5 leading-none select-none">
          404
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl md:text-8xl font-light text-white">Æ</span>
        </div>
      </div>

      {/* Message */}
      <h1 className="text-2xl md:text-3xl font-light text-white mb-4 tracking-wide">
        Page Not Found
      </h1>
      <p className="text-white/50 max-w-md mb-10 text-sm md:text-base">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      {/* Back button */}
      <Link
        href="/"
        className="group relative inline-flex items-center gap-3 text-sm border border-white/30 px-8 py-3 rounded-full text-white hover:bg-white hover:text-[#111111] transition-all duration-300"
      >
        <svg
          className="w-4 h-4 transition-transform group-hover:-translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </Link>

      {/* Decorative elements */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
        <span className="w-1 h-1 rounded-full bg-white/20" />
        <span className="w-1 h-1 rounded-full bg-white/30" />
        <span className="w-1 h-1 rounded-full bg-white/20" />
      </div>
    </div>
  )
}
