import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-4 text-center">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-4">
        <h2 className="text-2xl font-bold text-navy-admin">Page Not Found</h2>
        <p className="text-sm text-slate-600">
          The requested page could not be found. Return home to browse our courses.
        </p>
        <Link
          href="/"
          className="inline-block bg-navy-admin text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow hover:bg-navy-admin-hover transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

