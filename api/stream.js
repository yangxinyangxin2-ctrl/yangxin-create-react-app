// Streaming Response Example
// Demonstrates: Server-Sent Events (SSE), streaming data chunks

export async function GET(request) {
  const url = new URL(request.url);
  const type = url.searchParams.get("type") || "counter";

  // Create a readable stream
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();

      if (type === "counter") {
        // Stream a simple counter
        for (let i = 1; i <= 5; i++) {
          const data = `data: Counter: ${i}/5\n\n`;
          controller.enqueue(encoder.encode(data));
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
        controller.enqueue(encoder.encode("data: Complete!\n\n"));
      } else if (type === "json") {
        // Stream JSON objects
        const items = [
          { id: 1, name: "Item 1", status: "processing" },
          { id: 2, name: "Item 2", status: "processing" },
          { id: 3, name: "Item 3", status: "processing" },
        ];

        for (const item of items) {
          const data = `data: ${JSON.stringify(item)}\n\n`;
          controller.enqueue(encoder.encode(data));
          await new Promise((resolve) => setTimeout(resolve, 800));
        }
      } else {
        // Stream simple text
        const messages = [
          "Connecting to server...",
          "Fetching data...",
          "Processing results...",
          "Done!",
        ];

        for (const message of messages) {
          const data = `data: ${message}\n\n`;
          controller.enqueue(encoder.encode(data));
          await new Promise((resolve) => setTimeout(resolve, 600));
        }
      }

      controller.close();
    },
  });

  // Return streaming response
  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
