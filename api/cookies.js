// Cookie Handling Example
// Demonstrates: Reading cookies, setting cookies, deleting cookies

// Simple cookie parser
function parseCookies(cookieHeader) {
  if (!cookieHeader) return {};

  return cookieHeader.split(";").reduce((cookies, cookie) => {
    const [name, value] = cookie.trim().split("=");
    cookies[name] = value;
    return cookies;
  }, {});
}

export async function GET(request) {
  const cookieHeader = request.headers.get("Cookie");
  const cookies = parseCookies(cookieHeader);

  // Set cookies in response
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  // Set a simple cookie
  headers.append(
    "Set-Cookie",
    `visitor=true; Path=/; Max-Age=3600; SameSite=Lax`
  );

  // Set a session cookie
  const sessionId = Math.random().toString(36).substring(7);
  headers.append(
    "Set-Cookie",
    `session=${sessionId}; Path=/; HttpOnly; Secure; SameSite=Strict`
  );

  return Response.json(
    {
      success: true,
      message: "Cookies example",
      receivedCookies: cookies,
      setCookies: {
        visitor: "true",
        session: sessionId,
      },
    },
    { headers }
  );
}

export async function DELETE(request) {
  // Delete cookies by setting Max-Age=0
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  headers.append("Set-Cookie", `visitor=; Path=/; Max-Age=0`);
  headers.append("Set-Cookie", `session=; Path=/; Max-Age=0`);

  return Response.json(
    {
      success: true,
      message: "Cookies cleared",
    },
    { headers }
  );
}
