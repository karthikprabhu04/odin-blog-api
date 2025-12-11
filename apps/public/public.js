// Example: GET all posts
if (location.pathname.endsWith("index.html") || location.pathname === "/") {
  fetch("http://localhost:3000/posts")
    .then(res => res.json())
    .then(posts => {
      const div = document.getElementById("posts");
      div.innerHTML = posts.map(p => `<a href="post.html?id=${p.id}">${p.title} </a> <br> Created: ${p.createdAt}`).join("<br><br>");
    });
}

// Example: GET single post
if (location.pathname.endsWith("post.html")) {
  const id = new URLSearchParams(location.search).get("id");

  fetch(`http://localhost:3000/posts/${id}`)
    .then(res => res.json())
    .then(async post => {
      document.getElementById("post").innerHTML = `
              <h1>${post.title}</h1>
              <p>${post.content}</p>

              <h3>Comments</h3>
              <div id="comments"></div>

              <h3>Add a Comment</h3>
              <form id="commentForm">
                <input type="text" id="name" placeholder="Your name" required /><br><br>
                <textarea id="content" placeholder="Write your comment..." required></textarea><br><br>
                <button type="submit">Submit Comment</button>
              </form>
            `;
    
     renderComments(post.comments);

     document.getElementById("commentForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const content = document.getElementById("content").value.trim();

        const response = await fetch(`http://localhost:3000/comments`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, content, postId: id  })
        });

        const newComment = await response.json();

        // Add instantly to UI
        post.comments.push(newComment);
        renderComments(post.comments);

        // Reset the form
        e.target.reset();
      });
    });
}

function renderComments(comments = []) {
  const container = document.getElementById("comments");

  if (!comments.length) {
    container.innerHTML = "<p>No comments yet — be the first!</p>";
    return;
  }

  container.innerHTML = comments
    .map(
      c => `
        <div style="border:1px solid #ddd; padding:10px; margin-bottom:10px;">
          <strong>${c.name || "Anonymous"}</strong>
          <p>${c.content}</p>
          <p>${c.createdAt}</p>
        </div>
      `
    )
    .join("");
}