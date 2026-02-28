// HTTP Headers Example
// Demonstrates: Reading request headers, setting response headers, authorization

export async function GET(request) {
  // Read request headers
  const userAgent = request.headers.get("User-Agent");
  const apiKey = request.headers.get("X-API-Key");
  const accept = request.headers.get("Accept");

  // Custom response headers
  const headers = new Headers({
    "Content-Type": "application/json",
    "X-Custom-Header": "IGA-Pages",
    "X-Response-Time": String(Date.now()),
    "Cache-Control": "no-cache, no-store, must-revalidate",
  });

  return Response.json(
    {
      success: true,
      message: "Headers example",
      requestHeaders: {
        userAgent,
        apiKey: apiKey || "Not provided",
        accept,
      },
      allHeaders: Object.fromEntries(request.headers.entries()),
    },
    { headers }
  );
}

export async function POST(request) {
  const contentType = request.headers.get("Content-Type");
  const authorization = request.headers.get("Authorization");

  // Check authorization
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return Response.json(
      {
        success: false,
        error: "Unauthorized",
        message: "Bearer token required",
      },
      {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Bearer realm="api"',
        },
      }
    );
  }

  const token = authorization.slice(7);

  return Response.json({
    success: true,
    message: "Authorized request",
    token: token.slice(0, 10) + "...",
    contentType,
  });
}
