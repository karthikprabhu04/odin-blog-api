function headers() {
  return {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + localStorage.getItem("token")
  };
}

async function loadPosts() {
  const res = await fetch("http://localhost:3000/posts", {
    headers: headers()
  });

  const posts = await res.json();
  const container = document.getElementById("posts");

  container.innerHTML = "";
  posts.forEach(p => {
    const el = document.createElement("div");
    el.innerHTML = `<h3>${p.title}</h3><p>${p.content}</p>`;
    container.appendChild(el);
  });
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

function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

loadPosts();
