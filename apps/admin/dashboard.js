// Create post
function headers() {
  return {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + localStorage.getItem("token")
  };
}

async function createPost() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  const res = await fetch("http://localhost:3000/posts", {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ title, content })
  });

  await loadPosts(); // reload posts
}


// Log out
function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}


// Public files here
// Example: GET all posts
if (location.pathname.endsWith("dashboard.html")) {
  fetch("http://localhost:3000/posts")
    .then(res => res.json())
    .then(posts => {
      const div = document.getElementById("posts");
      div.innerHTML = posts.map(p => `
        <a href="dashboardpost.html?id=${p.id}">${p.title} </a>
        Created: ${p.createdAt}
        `).join("<br><br>");
    });
}

// Example: GET single post
if (location.pathname.endsWith("dashboardpost.html")) {
  const id = new URLSearchParams(location.search).get("id");

  fetch(`http://localhost:3000/posts/${id}`)
    .then(res => res.json())
    .then(async post => {
      document.getElementById("post").innerHTML = `
              <h1>${post.title}</h1>
              <p>${post.content}</p>

              <p>Status: <strong>${post.published ? "Published" : "Unpublished"}</strong></p>

              <button class="toggle-publish" data-id="${post.id}">
                ${post.published ? "Unpublish" : "Publish"}
              </button>

              <button class="delete-btn" data-id="${post.id}">Delete</button>
              <button class="edit-btn" data-id="${post.id}">Edit</button>

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
     
    //  Delete post
     document.querySelector(".delete-btn").addEventListener("click", async () => {
        await fetch(`http://localhost:3000/posts/${post.id}`, {
          method: "DELETE",
          headers: headers(),
        });

        alert("Post deleted");
        window.location.href = "dashboard.html";
      });

      // Edit post
      document.querySelector(".edit-btn").addEventListener("click", async () => {
        const newTitle = prompt("New title:", post.title);
        const newContent = prompt("New content:", post.content);

        if (!newTitle || !newContent) return;

        await fetch(`http://localhost:3000/posts/${post.id}`, {
          method: "PUT",
          headers: headers(),
          body: JSON.stringify({ title: newTitle, content: newContent })
        });

        // Reload page after update
        location.reload();
      });

      // Toggle publish
      document.querySelector(".toggle-publish").addEventListener("click", async () => {
      await fetch(`http://localhost:3000/posts/${post.id}/toggle`, {
        method: "PATCH",
        headers: headers(),
      });

      alert("Publish status changed");
      location.reload();
      })


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
          <button class="delete-comment" data-id="${c.id}">Delete</button>
        </div>
      `
    )
    .join("");

    document.querySelectorAll(".delete-comment").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;

      await fetch(`http://localhost:3000/comments/${id}`, {
        method: "DELETE"
      });

      // Remove from UI immediately
      const index = comments.findIndex(c => c.id == id);
      comments.splice(index, 1);

      renderComments(comments); // re-render
    });
  });
}
