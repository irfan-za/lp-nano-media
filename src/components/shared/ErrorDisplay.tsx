import type { ErrorComponentProps } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";

export function ErrorDisplay({
  error,
  reset,
}: {
  error: ErrorComponentProps["error"];
  reset?: () => void;
}) {
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
          {error?.message ??
            "An unexpected error occurred. Please try again later."}
        </p>
        {reset && (
          <button
            onClick={reset}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-600 active:scale-[0.98]"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}
