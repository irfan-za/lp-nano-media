import { Link } from "@tanstack/react-router";

export function NotFound({ children }: { children?: any }) {
  return (
    <div className="flex min-h-dvh items-center justify-center px-6">
      <div className="max-w-md text-left">
        <p className="font-heading text-[10rem] leading-none font-bold text-brand-500">
          404
        </p>
        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-4">
          Halaman tidak ditemukan
        </h2>
        <p className="mt-3 text-gray-600 leading-relaxed max-w-[50ch]">
          {children ??
            "The page you are looking for does not exist or has been moved."}
        </p>
        <div className="mt-8 flex gap-3">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 active:scale-[0.98]"
          >
            Go back
          </button>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-600 active:scale-[0.98]"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
