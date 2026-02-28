// Nested Dynamic Route Example - Multiple Parameters
// Matches: /api/posts/:postId/comments/:commentId
// Examples:
//   /api/posts/1/comments/99 -> postId = "1", commentId = "99"
//   /api/posts/42/comments/100 -> postId = "42", commentId = "100"

const comments = {
  "42-99": {
    postId: 42,
    commentId: 99,
    author: "Alice",
    text: "Great post!",
    likes: 15,
  },
  "42-100": {
    postId: 42,
    commentId: 100,
    author: "Bob",
    text: "Thanks for sharing!",
    likes: 8,
  },
};

export async function GET(request) {
  const { postId, commentId } = request.params;

  console.log(`GET /api/posts/${postId}/comments/${commentId}`);

  const key = `${postId}-${commentId}`;
  const comment = comments[key];

  if (!comment) {
    return Response.json(
      {
        success: false,
        error: "Comment not found",
        postId,
        commentId,
      },
      { status: 404 }
    );
  }

  return Response.json({
    success: true,
    data: comment,
  });
}

export async function PUT(request) {
  const { postId, commentId } = request.params;
  const body = await request.json();

  console.log(`PUT /api/posts/${postId}/comments/${commentId}`);

  const key = `${postId}-${commentId}`;
  const comment = comments[key];

  if (!comment) {
    return Response.json(
      { success: false, error: "Comment not found" },
      { status: 404 }
    );
  }

  // Update comment
  comments[key] = {
    ...comment,
    ...body,
    postId: parseInt(postId),
    commentId: parseInt(commentId),
  };

  return Response.json({
    success: true,
    message: "Comment updated",
    data: comments[key],
  });
}

export async function DELETE(request) {
  const { postId, commentId } = request.params;

  console.log(`DELETE /api/posts/${postId}/comments/${commentId}`);

  const key = `${postId}-${commentId}`;
  const comment = comments[key];

  if (!comment) {
    return Response.json(
      { success: false, error: "Comment not found" },
      { status: 404 }
    );
  }

  delete comments[key];

  return Response.json({
    success: true,
    message: "Comment deleted",
    data: comment,
  });
}
