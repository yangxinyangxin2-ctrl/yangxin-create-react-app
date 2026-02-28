// CORS (Cross-Origin Resource Sharing) Example
// Demonstrates: Preflight OPTIONS, CORS headers, cross-origin requests

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Max-Age": "86400",
};

export async function OPTIONS(request) {
  console.log("CORS preflight request");

  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function GET(request) {
  console.log("GET with CORS enabled");

  const data = {
    message: "CORS is enabled for this endpoint",
    timestamp: new Date().toISOString(),
    allowedOrigins: "*",
    allowedMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  };

  return Response.json(data, {
    headers: corsHeaders,
  });
}

export async function POST(request) {
  console.log("POST with CORS enabled");

  const body = await request.json();

  return Response.json(
    {
      success: true,
      message: "Data received with CORS",
      received: body,
    },
    {
      status: 201,
      headers: corsHeaders,
    }
  );
}
