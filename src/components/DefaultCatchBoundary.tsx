import { Link, useRouter } from "@tanstack/react-router";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  const router = useRouter();

  console.error("DefaultCatchBoundary Error:", error);

  return (
    <div className="flex min-h-dvh items-center justify-center px-6">
      <div className="max-w-md text-left">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50">
          <AlertTriangle className="h-6 w-6 text-brand-500" strokeWidth={2} />
        </div>
        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-6">
          Something went wrong
        </h2>
        <p className="mt-3 text-gray-600 leading-relaxed max-w-[50ch]">
          {error?.message ?? "An unexpected error occurred."}
        </p>
        <div className="mt-8 flex gap-3">
          <button
            onClick={() => router.invalidate()}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-600 active:scale-[0.98]"
          >
            Try again
          </button>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 active:scale-[0.98]"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
