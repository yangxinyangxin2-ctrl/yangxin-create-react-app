// Express Framework Integration Example
// Demonstrates: Integrating Express.js with IGA Pages API routes
// File: api/express/[[default]].js matches /api/express/*
// The [[default]] is an optional catch-all that allows Express to handle all sub-routes
//
// ✨ NEW: Auto-prefix Feature
// IGA Pages CLI automatically strips the route prefix (/api/express) from the request URL
// before passing it to Express. This means you can use relative paths in your Express routes!
//
// Instead of writing:     app.get("/api/express/users", ...)
// You can now write:      app.get("/users", ...)
//
// The CLI handles the prefix mapping automatically based on the file location.

import express from "express";

const app = express();

// Middleware
app.use(express.json());

// Express routes using RELATIVE paths (no /api/express prefix needed!)
// File location: api/express/[[default]].js
// Route prefix: /api/express (auto-stripped by IGA Pages CLI)
//
// ✨ The CLI automatically removes /api/express from the URL before passing to Express
// So you write:     app.get("/users", ...)
// And it matches:   /api/express/users

// Root route - matches /api/express
app.get("/", (req, res) => {
  res.json({
    message: "Hello from Express!",
    framework: "express",
    route: "/api/express (handled by Express /)",
    timestamp: new Date().toISOString(),
  });
});

// Users list - matches /api/express/users
app.get("/users", (req, res) => {
  res.json({
    route: "/api/express/users (handled by Express /users)",
    users: [
      { id: 1, name: "Alice", role: "admin" },
      { id: 2, name: "Bob", role: "user" },
      { id: 3, name: "Charlie", role: "user" },
    ],
  });
});

// Dynamic route - matches /api/express/users/:id
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  res.json({
    route: `/api/express/users/${id} (handled by Express /users/:id)`,
    user: { id, name: `User ${id}`, role: "user" },
  });
});

// POST endpoint - matches /api/express/data
app.post("/data", (req, res) => {
  const body = req.body;
  res.status(201).json({
    message: "Data received",
    route: "/api/express/data (handled by Express /data)",
    data: body,
    timestamp: new Date().toISOString(),
  });
});

// GET endpoint for /api/express/data
app.get("/data", (req, res) => {
  res.json({
    message: "Data endpoint",
    route: "/api/express/data (handled by Express /data)",
    method: "GET",
    timestamp: new Date().toISOString(),
  });
});

// Nested route - matches /api/express/posts/:postId
app.get("/posts/:postId", (req, res) => {
  const { postId } = req.params;
  res.json({
    route: `/api/express/posts/${postId}`,
    post: {
      id: postId,
      title: `Post ${postId}`,
      content: "Sample post content",
    },
  });
});

// Catch all other routes
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Not Found",
    path: req.originalUrl,
    message: "This route is not defined in Express",
    availableRoutes: [
      "GET /api/express/",
      "GET /api/express/users",
      "GET /api/express/users/:id",
      "GET /api/express/data",
      "POST /api/express/data",
      "GET /api/express/posts/:postId",
    ],
  });
});

// Export the app instance (DO NOT call app.listen())
export default app;
