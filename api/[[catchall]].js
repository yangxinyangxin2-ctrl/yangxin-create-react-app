// Optional Catch-all Route Example
// Matches: /api/* (zero or more segments)
// Examples:
//   /api/ -> catchall = undefined or []
//   /api/anything -> catchall = ["anything"]
//   /api/any/nested/path -> catchall = ["any", "nested", "path"]

export async function GET(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Extract the catch-all segments
  const segments = pathname
    .replace(/^\/api\/?/, "")
    .split("/")
    .filter(Boolean);

  return Response.json({
    message: "Optional catch-all route",
    route: "/api/[[catchall]]",
    routeType: "optional-catchall",
    pathname,
    segments: segments.length > 0 ? segments : [],
    note: "This route matches /api and all /api/* paths not matched by other routes",
    timestamp: new Date().toISOString(),
  });
}
