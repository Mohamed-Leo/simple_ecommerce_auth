import { useRouter, useRouterState } from "@tanstack/react-router";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function RouteError({ error }: { error: Error }) {
  const router = useRouter();
  const isLoading = useRouterState({ select: (s) => s.isLoading });

  return (
    <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-500 dark:bg-red-900/30 dark:text-red-400">
        <AlertCircle size={32} />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Something went wrong
        </h2>
        <p className="max-w-100 text-gray-500 dark:text-gray-400">
          {error.message || "We encountered an error while loading this page."}
        </p>
      </div>
      <button
        disabled={isLoading}
        onClick={() => router.invalidate()}
        className="cursor-pointer group flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:opacity-70 dark:bg-gray-50 dark:hover:bg-gray-200 dark:text-gray-900"
      >
        <RefreshCw
          size={16}
          className={`transition-transform ${isLoading ? "animate-spin" : "group-hover:rotate-180"}`}
        />
        {isLoading ? "Retrying..." : "Try Again"}
      </button>
    </div>
  );
}
