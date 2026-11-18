import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

// Shows the site's total visitors and page views (from Vercel Web Analytics,
// via the /api/visits serverless function). If the numbers can't be loaded –
// e.g. during local development, where /api doesn't run – it shows nothing.
export default function VisitCounter() {
  const [counts, setCounts] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/visits")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (
          !cancelled &&
          data &&
          Number.isFinite(data.visitors) &&
          Number.isFinite(data.pageviews)
        ) {
          setCounts(data);
        }
      })
      .catch(() => {
        // Not available (local dev, network error...) – just stay hidden
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!counts) return null;

  return (
    <p className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 text-slate-600 dark:text-gray-400">
      <Eye size={14} className="text-blue-600 dark:text-blue-400" />
      <span>
        <strong className="text-slate-900 dark:text-white">{counts.visitors.toLocaleString()}</strong> visitors
      </span>
      <span aria-hidden="true">·</span>
      <span>
        <strong className="text-slate-900 dark:text-white">{counts.pageviews.toLocaleString()}</strong> page views
      </span>
    </p>
  );
}
