// Example: GET all posts
if (location.pathname.endsWith("index.html") || location.pathname === "/") {
  fetch("http://localhost:3000/posts")
    .then(res => res.json())
    .then(posts => {
      const div = document.getElementById("posts");
      div.innerHTML = posts.map(p => `<a href="post.html?id=${p.id}">${p.title}</a>`).join("<br>");
    });
}

// Example: GET single post
if (location.pathname.endsWith("post.html")) {
  const id = new URLSearchParams(location.search).get("id");

  fetch(`http://localhost:3000/posts/${id}`)
    .then(res => res.json())
    .then(post => {
      document.getElementById("post").innerHTML = `
        <h1>${post.title}</h1>
        <p>${post.content}</p>
      `;
    });
}
