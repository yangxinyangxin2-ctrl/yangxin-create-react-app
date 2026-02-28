// External API Integration Example
// Demonstrates: Fetch API, calling third-party APIs, error handling

export async function GET(request) {
  console.log("External API handler called");

  try {
    // Call a public API (JSONPlaceholder)
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_limit=5"
    );

    if (!response.ok) {
      return Response.json(
        { error: "Failed to fetch external data" },
        { status: response.status }
      );
    }

    const posts = await response.json();

    return Response.json({
      success: true,
      source: "jsonplaceholder.typicode.com",
      count: posts.length,
      data: posts.map((post) => ({
        id: post.id,
        title: post.title,
        excerpt: post.body.substring(0, 100) + "...",
      })),
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: "Failed to fetch data",
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  console.log("POST to external API");

  try {
    const body = await request.json();

    // Post to external API
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();

    return Response.json(
      {
        success: true,
        message: "Posted to external API",
        data: result,
      },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: "Failed to post data",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
