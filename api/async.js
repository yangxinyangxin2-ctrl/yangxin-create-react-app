// Async Operations Example
// Demonstrates: Async/await, Promise.all, error handling

// Simulate async database query
function simulateDbQuery(delay = 100) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: "First Post", author: "Alice" },
        { id: 2, title: "Second Post", author: "Bob" },
      ]);
    }, delay);
  });
}

// Simulate async external API call
async function fetchExternalData(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        source: url,
        data: { temperature: 22, humidity: 65 },
        timestamp: new Date().toISOString(),
      });
    }, 150);
  });
}

export async function GET(request) {
  const url = new URL(request.url);
  const action = url.searchParams.get("action") || "all";

  try {
    if (action === "db") {
      // Simulate database query
      const posts = await simulateDbQuery();

      return Response.json({
        success: true,
        source: "database",
        data: posts,
      });
    }

    if (action === "external") {
      // Simulate external API call
      const weather = await fetchExternalData("https://api.weather.com");

      return Response.json({
        success: true,
        source: "external-api",
        data: weather,
      });
    }

    if (action === "all") {
      // Parallel async operations
      const [posts, weather] = await Promise.all([
        simulateDbQuery(),
        fetchExternalData("https://api.weather.com"),
      ]);

      return Response.json({
        success: true,
        sources: ["database", "external-api"],
        data: {
          posts,
          weather,
        },
      });
    }

    return Response.json(
      {
        success: false,
        error: "Invalid action",
        validActions: ["db", "external", "all"],
      },
      { status: 400 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: "Internal server error",
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    // Simulate async save operation
    await new Promise((resolve) => setTimeout(resolve, 200));

    return Response.json(
      {
        success: true,
        message: "Data saved asynchronously",
        data: body,
        timestamp: new Date().toISOString(),
      },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: "Failed to save data",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
