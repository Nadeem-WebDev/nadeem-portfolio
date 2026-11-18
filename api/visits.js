// Vercel serverless function: GET /api/visits
//
// Returns the site's total page views and unique visitors from Vercel Web
// Analytics, e.g. { "pageviews": 2345, "visitors": 1234 }.
//
// The Vercel access token is secret (it works like a password for the Vercel
// account), so it stays here on the server and is never sent to the browser.
//
// Environment variables (Vercel → Project → Settings → Environment Variables):
//   ANALYTICS_TOKEN       a Vercel access token (Account Settings → Tokens)
//   ANALYTICS_PROJECT_ID  this project's ID (Project → Settings → General)
//   ANALYTICS_TEAM_ID     optional: only if the project belongs to a team
//
// API docs: https://vercel.com/docs/analytics/web-analytics-api

const API_URL = "https://api.vercel.com/v1/query/web-analytics/visits/count";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { ANALYTICS_TOKEN, ANALYTICS_PROJECT_ID, ANALYTICS_TEAM_ID } = process.env;
  if (!ANALYTICS_TOKEN || !ANALYTICS_PROJECT_ID) {
    res.setHeader("Cache-Control", "no-store");
    return res.status(500).json({ error: "Analytics is not configured" });
  }

  const params = new URLSearchParams({ projectId: ANALYTICS_PROJECT_ID });
  if (ANALYTICS_TEAM_ID) params.set("teamId", ANALYTICS_TEAM_ID);

  try {
    const response = await fetch(`${API_URL}?${params}`, {
      headers: { Authorization: `Bearer ${ANALYTICS_TOKEN}` },
    });

    if (!response.ok) {
      // Log the details for debugging in the Vercel logs, but don't send them to visitors
      console.error("Vercel Analytics API error:", response.status, await response.text());
      res.setHeader("Cache-Control", "no-store");
      return res.status(502).json({ error: "Could not load visit counts" });
    }

    const body = await response.json();
    const pageviews = Number(body?.data?.pageviews);
    const visitors = Number(body?.data?.visitors);

    if (!Number.isFinite(pageviews) || !Number.isFinite(visitors)) {
      console.error("Unexpected Vercel Analytics response:", JSON.stringify(body));
      res.setHeader("Cache-Control", "no-store");
      return res.status(502).json({ error: "Could not load visit counts" });
    }

    // Cache at Vercel's edge for 5 minutes (and serve the old value for up to
    // 10 more while refreshing), so the analytics API isn't called on every visit
    res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");
    return res.status(200).json({ pageviews, visitors });
  } catch (error) {
    console.error("Failed to reach Vercel Analytics API:", error);
    res.setHeader("Cache-Control", "no-store");
    return res.status(502).json({ error: "Could not load visit counts" });
  }
}
