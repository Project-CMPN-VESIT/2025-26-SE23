export function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center space-y-4">
      <div className="text-6xl font-bold text-amber-400">404</div>
      <h1 className="text-2xl font-semibold">Page Not Found</h1>
      <p className="text-muted-foreground text-sm max-w-sm">
        The page you're looking for doesn't exist. It may have been moved or the URL is incorrect.
      </p>
      <a
        href="/"
        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-600 transition-colors"
      >
        ← Back to Dashboard
      </a>
    </div>
  )
}
